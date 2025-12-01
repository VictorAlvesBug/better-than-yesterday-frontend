import React, { useState } from 'react';
import { isSuccess } from '../types/api.types';
import { toast } from 'react-toastify';
import { habitApi } from '../services/api/habitApi';
import type { SaveHabitData } from '../types/habit.types';
import useErrorsState from '../hooks/useErrorsState';

export function useSaveHabitModal(onSuccess?: () => void) {
  const initialHabit: SaveHabitData = { habitId: '', name: '' };

  const [isOpen, setIsOpen] = useState(false);
  const [isNew, setIsNew] = useState(false);
  const [habit, setHabit] = useState<SaveHabitData>(initialHabit);
  const { errors, addError, clearErrors } = useErrorsState<SaveHabitData>();

  const openCreateModal = () => {
      setIsOpen(true);
      setIsNew(true);
      setHabit(initialHabit);
    };
    
    const openUpdateModal = (habit: SaveHabitData) => {
      setIsOpen(true);
      setIsNew(false);
      setHabit(habit);
    };

    const close = () => setIsOpen(false);

  const onChange = ({target}: React.ChangeEvent<HTMLInputElement>) =>{
    setHabit(prev => ({ ...prev, [target.name]: target.value }));
  }

  const validate = () => {
    let isValid = true;
    clearErrors();

    if (!isNew && !habit.habitId) {
      isValid = false;
      addError('habitId', 'Defina um nome para o hábito');
    }

    if (!habit.name) {
      isValid = false;
      addError('name', 'Defina um nome para o hábito');
    }

    return isValid;
  };

  const onSubmit = async () => {
    const isValid = validate();
    if (!isValid) return;

    const saveHabit = isNew ? habitApi.createHabit : habitApi.updateHabit;

    const response = await saveHabit(habit);
    const ok = isSuccess(response);

    const showToast = ok ? toast.success : toast.error;
    if (response.reason) showToast(response.reason);

    if (ok) {
      setIsOpen(false);
      onSuccess && onSuccess();
    }
  };

  /*useEffect(() => {
    if (isOpen && nameInputRef.current) {
      nameInputRef.current.focus();
    }
  }, [isOpen]);*/

  return {
    isOpen,
    isNew,
    habit,
    errors,
    onChange,
    onSubmit,
    close,
    openCreateModal,
    openUpdateModal
  };
}