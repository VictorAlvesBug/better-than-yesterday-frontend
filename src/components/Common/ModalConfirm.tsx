type ModalConfirmProps = {
  isOpen: boolean;
  onConfirm: () => Promise<void>;
  onCancel: () => void;
  title?: string;
  message: string;
};

export const ModalConfirm = ({
  isOpen,
  onConfirm,
  onCancel,
  title = 'Confirmação',
  message,
}: ModalConfirmProps) => {
  if (!isOpen) return null;

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'rgba(0,0,0,0.5)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
      onClick={onCancel}
    >
      <div
        style={{
          background: '#fff',
          padding: 24,
          borderRadius: 8,
          boxShadow: '0 2px 12px rgba(0,0,0,0.15)',
          minWidth: 320,
        }}
      >
        <h2 className="text-xl font-semibold">{title}</h2>
        <p className="mt-2">{message}</p>
        <div
          style={{
            display: 'flex',
            gap: 12,
            justifyContent: 'flex-end',
            marginTop: 24,
          }}
        >
          <button onClick={onCancel}>Cancelar</button>
          <button
            onClick={onConfirm}
            style={{
              background: '#0d6efd',
              color: '#fff',
              border: 'none',
              padding: '8px 16px',
              borderRadius: 4,
            }}
          >
            Confirmar
          </button>
        </div>
      </div>
    </div>
  );
};
