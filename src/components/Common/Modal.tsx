import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Button, { type ButtonVariant } from './Button';

type ButtonConfig = {
  text: string;
  variant?: ButtonVariant;
  onClick: () => void;
};

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  content: React.ReactNode;
  buttons: ButtonConfig[];
};

export const Modal = ({
  isOpen,
  onClose,
  title,
  content,
  buttons,
}: ModalProps) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed top-0 bottom-0 left-0 right-0 flex items-center justify-center bg-black bg-opacity-50"
      onClick={onClose}
    >
      <div
        className="flex flex-col w-1/3 max-w-lg px-3 bg-white rounded-lg shadow-md"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex flex-row items-center justify-between px-2 py-3 border-b border-gray-200">
          <h2 className="text-xl font-semibold">{title}</h2>
          <FontAwesomeIcon
            className="cursor-pointer"
            icon={faTimes}
            onClick={onClose}
          />
        </div>

        {content}

        <div className="flex flex-row items-center justify-end gap-2 px-2 py-3">
          {buttons.map(({ text, ...rest }) => (
            <Button key={text} {...rest}>
              {text}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
};
