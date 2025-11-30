import React, { useEffect, useRef, useState } from 'react';
import { Modal } from '../Common/Modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import Button from '../Common/Button';
import { isSuccess } from '../../types/api.types';
import { toast } from 'react-toastify';
import { habitApi } from '../../services/api/habitApi';
import type { CreateHabitData } from '../../types/habit.types';
import Input from '../Common/Input';

type CreateHabitModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
};

type FieldError = {
  fieldName: keyof CreateHabitData;
  error: string;
};

export default function CreateHabitModal({
  isOpen,
  onClose,
  onSuccess,
}: CreateHabitModalProps) {
    const nameInputRef = useRef<HTMLInputElement | null>(null);
  const [name, setName] = useState<string>('');
  const [errors, setErrors] = useState<FieldError[]>([]);

  const onCloseDecorated = () => {
    onClose();
    setName('');
  };

  const clearErrors = () => setErrors([]);

  const addError = (fieldName: keyof CreateHabitData, error: string) =>
    setErrors((prev) => {
      const newError: FieldError = { fieldName, error };
      return [...prev, newError];
    });

  const validate = () => {
    let isValid = true;
    clearErrors();

    if (name.length === 0) {
      isValid = false;
      addError('name', 'Defina um nome para o hábito');
    }

    return isValid;
  };

  const onSubmit = async () => {
    const isValid = validate();
    if (!isValid) {
      return;
    }

    const request: CreateHabitData = {
      name,
    };
    const response = await habitApi.createHabit(request);
    const ok = isSuccess(response);

    const showToast = ok ? toast.success : toast.error;
    if (response.reason) showToast(response.reason);

    if (ok) {
      onCloseDecorated();
      onSuccess && onSuccess();
    }
  };

  useEffect(() => {
    if (isOpen && nameInputRef.current) {
        nameInputRef.current.focus();
    }
  }, [isOpen]);

  return (
    <Modal
      isOpen={isOpen}
      onClose={onCloseDecorated}
      title={'Criar Novo Hábito'}
      content={
        <div className="flex flex-col items-start gap-2 px-2 py-3">
          <Input
            ref={nameInputRef}
            label="Nome"
            error={errors
              .filter(({ fieldName }) => fieldName === 'name')
              .map(({ error }) => error)
              .join('\n')}
            value={name}
            onChange={({ target }) => setName(target.value)}
            onKeyDown={e => {
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
          onClick: onCloseDecorated,
        },
        {
          text: 'Salvar',
          onClick: onSubmit,
        },
      ]}
    />
  );
}
