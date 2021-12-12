export { useModal } from './useModal';
import { ModalContextProvider } from './ModalContextProvider';
import { ModalPortal } from './ModalPortal';
import { CheckEmailModal } from './CheckEmailModal';

export const Modals = { CheckEmailModal };
export const Portal = ModalPortal;
export const Provider = ModalContextProvider;
