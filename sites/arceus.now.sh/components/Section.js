import * as React from 'react';
import styled from 'styled-components';
import { AnimatePresence, motion } from 'framer-motion';
import { Spacer } from './Spacer';

export function Section(props) {
  const [isOpen, set_isOpen] = React.useState(false);

  return (
    <SectionContainer>
      <button className="header-toggle" onClick={() => set_isOpen((o) => !o)}>
        <OpenIcon initial={{ rotate: -45 }} animate={{ rotate: isOpen ? 0 : -45 }}>
          &#9698;
        </OpenIcon>
        <Spacer size="2" />
        {props.name}
      </button>
      <div className="content">
        <AnimatePresence>
          {!isOpen ? null : (
            <motion.div
              // force line break
              initial={{ y: -300, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -300, opacity: 0 }}
            >
              {props.children}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </SectionContainer>
  );
}

const SectionContainer = styled.div`
  .content {
    overflow: hidden;
  }

  .header-toggle {
    border-top: 1px solid rgba(var(--font-color), 0.2);
    border-bottom: 1px solid rgba(var(--font-color), 0.2);
    width: 100%;
    text-align: left;
    margin: var(--spacer-2) 0 0 0;
    padding: var(--spacer) 0;
    font-size: 24px;
    font-weight: 800;
    display: flex;
    flex-direction: row;
    align-items: center;
  }
`;

const OpenIcon = styled(motion.div)`
  font-size: 16px;
`;
