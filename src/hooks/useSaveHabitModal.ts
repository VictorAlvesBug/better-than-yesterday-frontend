import React, { useEffect, useState } from 'react';
import { isSuccess } from '../types/api.types';
import { toast } from 'react-toastify';
import { habitApi } from '../services/api/habitApi';
import type { SaveHabitData } from '../types/habit.types';
import useErrorsState from '../hooks/useErrorsState';
import * as Yup from 'yup';
import type { FormikErrors } from 'formik';

export function useSaveHabitModal(onSuccess?: () => void) {
  const initialState: SaveHabitData = { habitId: '', name: '' }
  const [stateOnOpen, setStateOnOpen] = useState<SaveHabitData>(initialState);

  const [isOpen, setIsOpen] = useState(false);
  const [isNew, setIsNew] = useState(false);
  //const [habit, setHabit] = useState<SaveHabitData>(initialHabit);
  //const { errors, addError, clearErrors } = useErrorsState<SaveHabitData>({ oneErrorPerField: false });



  const schemaCreate = Yup.object({
    name: Yup.string()
      .min(3, 'Mínimo 3 caracteres')
      .required('Defina um nome para o hábito')
  });

  const schemaUpdate = schemaCreate.shape({
    habitId: Yup.string()
      .uuid('test')
      .required("ID do hábito não preenchido")
  });

  const validationSchema = isNew ? schemaCreate : schemaUpdate;

  const openCreateModal = () => {
    setIsOpen(true);
    setIsNew(true);
    setStateOnOpen(initialState);
    console.log(123)
  };

  const openUpdateModal = (habit: SaveHabitData) => {
    setIsOpen(true);
    setIsNew(false);
    setStateOnOpen(habit);
  };

  const close = () => setIsOpen(false);

  /*const onChange = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    setHabit(prev => ({ ...prev, [target.name]: target.value }));
  }*/

  /*useEffect(() => {
    if (errors) {
      errors.forEach(({ error }) => toast.error(error));
    }
  }, [errors]);*/

  /*const validate = () => {
    try {
      clearErrors();
      validationSchema.validateSync(habit, { abortEarly: false });
      return true;
    } catch (err: any) {
      if (err.name === "ValidationError") {
        const uniqueErrors: Partial<Record<keyof SaveHabitData, string>> = {};

        err.inner.forEach((e: any) => {
          if (e.path && !uniqueErrors[e.path as keyof SaveHabitData]) {
            uniqueErrors[e.path as keyof SaveHabitData] = e.message;
          }
        });

        Object.entries(uniqueErrors).forEach(([path, message]) => {
          addError(path as keyof SaveHabitData, message);
        });
      }
      return false;
    }




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
  };*/

  const onSubmit = async (habit: SaveHabitData/*, errors: FormikErrors<SaveHabitData>*/) => {
    /*console.log(errors)
    
    const isValid = validate();
    if (!isValid) return;*/

    /*const errorEntries = Object.entries(errors);
    
    if(errorEntries.length){
      errorEntries.forEach(([_, error]) => toast.error(error));
     return; 
    }*/

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

  return {
    validationSchema,
    isOpen,
    isNew,
    stateOnOpen,
    //habit,
    //onChange,
    onSubmit,
    close,
    openCreateModal,
    openUpdateModal
  };
}