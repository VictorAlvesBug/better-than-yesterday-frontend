import { useEffect, useRef } from 'react';
import { Modal } from '../Common/Modal';
import type { useSaveHabitModal } from '../../hooks/useSaveHabitModal';
import Input from '../Common/Input';

type SaveHabitModalProps = {
  modal: ReturnType<typeof useSaveHabitModal>;
};

export default function SaveHabitModal({ modal }: SaveHabitModalProps) {
  const { isOpen, isNew, errors, habit, onChange, onSubmit, close } = modal;
  const nameInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if(isOpen && nameInputRef.current){
      nameInputRef.current.focus();
    }
  }, [isOpen]);

  return (
    <Modal
      isOpen={isOpen}
      onClose={close}
      title={isNew ? 'Criar Novo Hábito' : 'Editar Hábito'}
      content={
        <div className="flex flex-col items-start gap-2 px-2 py-3">
          <Input
            ref={nameInputRef}
            label="Nome"
            name="name"
            error={errors
              .filter(({ fieldName }) => fieldName === 'name')
              .map(({ error }) => error)
              .join('\n')}
            value={habit.name}
            onChange={onChange}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                onSubmit();
              }
            }}
          />
        </div>
      }
      buttons={[
        {
          text: 'Cancelar',
          variant: 'secondary',
          onClick: close,
        },
        {
          text: 'Salvar',
          onClick: onSubmit,
        },
      ]}
    />
  );
}
