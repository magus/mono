import * as React from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import styled from 'styled-components';
import { Spacer } from '@magusn/react';

import Page from 'src/components/Page';

LoginConfirm.disableAuth = true;
LoginConfirm.title = 'Login confirmed';

export default function LoginConfirm() {
  const pageRef = React.useRef(null);
  const router = useRouter();
  const { email } = router.query;

  // Chrome iOS cannot vertically center properly
  // The first load has the wrong inner height

  // React.useEffect(() => {
  //   requestAnimationFrame(() => {
  //     requestAnimationFrame(() => {
  //       // force page height to match window.innerHeight
  //       document.documentElement.style.height = `${window.innerHeight}px`;
  //     });
  //   });
  // }, []);

  return (
    <PageContainer innerRef={pageRef}>
      <Header>You are now logged in on the original tab.</Header>

      <Instructions>This window can now be closed.</Instructions>

      <Spacer vertical size={2} />

      {!email ? null : (
        <Link href={`/?email=${email}`}>
          <a>
            Login as <Email>{email}</Email> in this tab.
          </a>
        </Link>
      )}
    </PageContainer>
  );
}

const PageContainer = styled(Page)`
  height: 100%;
  max-height: 100%;
  justify-content: flex-start;
  align-items: flex-start;
`;

const Header = styled.div`
  font-size: var(--font-jumbo);
  font-weight: 600;
  margin: 0 0 var(--spacer-3) 0;
`;

const Instructions = styled.div`
  font-size: var(--font-large);
  font-weight: 200;
`;

const Email = styled.span`
  font-weight: 200;
  text-transform: initial;
`;
