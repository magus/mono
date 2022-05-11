import * as React from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import { AnimatePresence, motion } from 'framer-motion';
import Image from 'next/image';
// import { Spacer } from '@magusn/react';

export function getStaticProps() {
  const title = 'mac dock';
  const description = 'a mac dock because we can';
  const keywords = ['mac', 'dock', 'demo', 'zoom'];
  const url = 'https://misc.vercel.app/mac-dock';
  const favicon = '/mac-dock/favicon.png';
  const image = 'https://misc.vercel.app/mac-dock/desktop-demo.cd064188c3fcc1e7c9d41bd1307f1111.png';

  const seo = { title, description, keywords, url, favicon, image };

  return { props: { seo } };
}

export function MacDock() {
  // SSR
  if (typeof window === 'undefined') {
    return null;
  }

  // Client
  return <MacDockInternal />;
}

function MacDockInternal() {
  const windowWidth = window.innerWidth;
  const dockWidth = windowWidth - SIZES.bottomMarginHorizontal - SIZES.dockPadding;
  const pxPerIcon = Math.min(Math.floor(dockWidth / ICONS.length), SIZES.iconMax);

  const isTouchDevice = React.useRef(true);
  const isTouching = React.useRef(false);
  const iconRefs = React.useRef(new Array(ICONS.length));
  const [active, set_active] = React.useState(null);
  const [selected, set_selected] = React.useState(null);
  const isActive = typeof active === 'number';

  function hitTest(clientX) {
    for (let i = 0; i < iconRefs.current.length; i++) {
      const icon = iconRefs.current[i];
      const iconRect = icon.getBoundingClientRect();
      const iconStart = iconRect.x;
      const iconEnd = iconRect.x + iconRect.width;
      if (clientX >= iconStart && clientX <= iconEnd) {
        set_active(i);
      }
    }
  }

  function getSize(i) {
    if (!isActive) {
      return null;
    }

    const delta = Math.abs(active - i);
    switch (delta) {
      case 0:
        return pxPerIcon * 3;
      case 1:
        return pxPerIcon * 2;
      case 2:
        return pxPerIcon;
      default:
        return null;
    }
  }

  const sizes = [];
  let usedIconWidth = 0;
  let otherCount = 0;
  for (let i = 0; i < ICONS.length; i++) {
    const size = getSize(i);
    sizes.push(size);
    if (!size) {
      otherCount += 1;
    } else {
      usedIconWidth += size;
    }
  }

  const remainderDockWidth = dockWidth - usedIconWidth;
  const pxOtherIcon = Math.min(Math.floor(remainderDockWidth / otherCount), SIZES.iconMax);

  return (
    <React.Fragment>
      <NoScrollBody />

      <SelectedIconContainer style={{ height: `calc(100vh - ${pxPerIcon}px)` }}>
        <AnimatePresence>
          {!ICONS[selected] ? null : (
            <SelectedIcon
              key={selected}
              initial={{ opacity: 0, y: 100 }}
              animate={{ transition: { duration: 0.4 }, opacity: 1, y: 0 }}
              exit={{ transition: { duration: 0.8 }, opacity: 0, y: -50 }}
            >
              <Image
                src={getImageUrl(ICONS[selected].src)}
                alt={ICONS[selected]}
                width={SIZES.selected}
                height={SIZES.selected}
              />
            </SelectedIcon>
          )}
        </AnimatePresence>
      </SelectedIconContainer>

      <Bottom style={{ bottom: pxPerIcon }}>
        <Dock
          style={{ maxHeight: pxPerIcon + SIZES.dockPadding, width: ICONS.length * pxPerIcon }}
          onMouseLeave={() => set_active(null)}
          onTouchEnd={() => {
            if (isTouching.current) {
              set_selected(active);
              set_active(null);
            }
            isTouching.current = false;
          }}
          onMouseMove={(e) => {
            isTouchDevice.current = false;
            hitTest(e.nativeEvent.clientX);
          }}
          onTouchMove={(e) => {
            isTouchDevice.current = true;
            isTouching.current = true;
            const [touchEvent] = e.nativeEvent.touches;
            hitTest(touchEvent.clientX);
          }}
        >
          {ICONS.map((icon, i) => {
            const width = sizes[i] || pxOtherIcon;
            const zoomed = Boolean(sizes[i]);
            const zoomFactor = isTouchDevice.current ? -3 : -6;
            const iconBaseY = isActive && isTouchDevice.current ? pxPerIcon * 3 : 0;
            const activeIconY = zoomed ? width / zoomFactor : 0;

            return (
              <Icon
                key={icon.alt}
                ref={(ref) => (iconRefs.current[i] = ref)}
                onClick={() => {
                  set_selected(i);
                }}
                animate={{ width, y: activeIconY, paddingBottom: iconBaseY }}
                transition={MOTION.icon}
                whileTap={{
                  scale: 0.9,
                }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={getImageUrl(icon.src)} alt={icon.alt} />
              </Icon>
            );
          })}
        </Dock>
      </Bottom>
    </React.Fragment>
  );
}

const getImageUrl = (src) => ['/mac-dock', 'icons', src].join('/');

const ICONS = [];
ICONS.push({ alt: 'app-store', src: 'app-store.png' });
ICONS.push({ alt: 'calculator', src: 'calculator.png' });
ICONS.push({ alt: 'dcss', src: 'dcss.png' });
ICONS.push({ alt: 'facetime', src: 'facetime.png' });
ICONS.push({ alt: 'figma', src: 'figma.png' });
ICONS.push({ alt: 'finder', src: 'finder.png' });
ICONS.push({ alt: 'mail', src: 'mail.png' });
ICONS.push({ alt: 'maps', src: 'maps.png' });
ICONS.push({ alt: 'messages', src: 'messages.png' });
ICONS.push({ alt: 'music', src: 'music.png' });
ICONS.push({ alt: 'notes', src: 'notes.png' });
ICONS.push({ alt: 'notion', src: 'notion.png' });
ICONS.push({ alt: 'photos', src: 'photos.png' });
ICONS.push({ alt: 'safari', src: 'safari.png' });
ICONS.push({ alt: 'trashfull', src: 'trashfull.png' });

const SIZES = {
  iconMax: 64,
  selected: 128,
  iconGap: 4,
  bottomMarginHorizontal: 2 * 2 * 8, // calc(2 * var(--spacer-2))
  dockPadding: 2 * 8, // var(--spacer-2)
};

const MOTION = {
  icon: { type: 'spring', damping: 10, mass: 0.5, stiffness: 200 },
};

const Icon = styled(motion.div)`
  display: flex;
  align-items: center;
  justify-content: center;

  img {
    max-width: unset;
    width: 100%;
    height: 100%;
    /* disable selecting image on mobile which opens popup preview for image url */
    pointer-events: none;
  }
`;

const Dock = styled(motion.div)`
  flex: 1;
  padding: ${SIZES.dockPadding}px;
  max-width: calc(100% - ${SIZES.bottomMarginHorizontal}px);
  width: 100%;
  background-color: rgba(255, 255, 255, 0.2);
  border-radius: var(--spacer-2);
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

const Bottom = styled.div`
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  max-width: calc(100% - ${SIZES.bottomMarginHorizontal}px);
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

const SelectedIcon = styled(motion.div)`
  position: absolute;
`;

const SelectedIconContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const NoScrollBody = createGlobalStyle`
html {
  /* disable text selection after long press on mobile */
  user-select: none;
  /* prevent pull to refresh and page momentum scroll on drag even when no scroll content */
  overflow: hidden;

}
`;
