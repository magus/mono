import * as React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styled from 'styled-components';

import { useModal } from './useModal';

export function ModalPortal() {
  const modal = useModal();

  return (
    <AnimatePresence>
      {!modal.isOpen ? null : (
        <ModalContainer initial={{ opacity: 0.0 }} animate={{ opacity: 1.0 }} exit={{ opacity: 0.0 }}>
          <ModalBackground onClick={modal.config.disableBackgroundDismiss ? undefined : modal.close} />

          <ModalContent
            initial={{ opacity: 0.0, scale: 0.7 }}
            animate={{ opacity: 1.0, scale: 1.0 }}
            exit={{ opacity: 0.0, scale: 0.7 }}
          >
            {!modal.config.component ? null : <modal.config.component {...modal.config.props} dismiss={modal.close} />}
          </ModalContent>
        </ModalContainer>
      )}
    </AnimatePresence>
  );
}

const ModalContainer = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const ModalBackground = styled.div`
  width: 100%;
  height: 100%;
  background: rgba(var(--black), 0.3);
  cursor: pointer;
`;

const ModalContent = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
