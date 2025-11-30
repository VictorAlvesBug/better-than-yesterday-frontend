import { Modal } from './Modal';

type ModalConfirmProps = {
  isOpen: boolean;
  onConfirm: () => Promise<void>;
  onClose: () => void;
  title?: string;
  message: string | React.ReactNode;
};

export const ModalConfirm = ({
  isOpen,
  onConfirm,
  onClose,
  title = 'Confirmação',
  message,
}: ModalConfirmProps) => {
  if (!isOpen) return null;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={title}
      content={<p className="mt-2">{message}</p>}
      buttons={[
        {
          text: 'Cancelar',
          variant: 'secondary',
          onClick: onClose,
        },
        {
          text: 'Confirmar',
          onClick: () => {
            onConfirm();
            onClose();
          },
        },
      ]}
    />
  );
};
