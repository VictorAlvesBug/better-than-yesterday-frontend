import { useEffect, useRef } from 'react';
import { Modal } from '../Common/Modal';
import type { useSaveHabitModal } from '../../hooks/useSaveHabitModal';
import { Formik, Form, Field, ErrorMessage } from 'formik';

type SaveHabitModalProps = {
  manager: ReturnType<typeof useSaveHabitModal>;
};

export default function SaveHabitModal({ manager }: SaveHabitModalProps) {
  const { validationSchema, stateOnOpen, isOpen, isNew, onSubmit, close } =
    manager;

  const nameInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (isOpen && nameInputRef.current) {
      //nameInputRef.current.focus();
    }
  }, [isOpen]);

  return (
    <Formik
      initialValues={stateOnOpen}
      validationSchema={validationSchema}
      onSubmit={(values) => onSubmit(values/*, errors*/)}
    >
      {({ /*errors, */isSubmitting }) => (
        <Form>
          <Modal
            isOpen={isOpen}
            onClose={close}
            title={isNew ? 'Criar Novo Hábito' : 'Editar Hábito'}
            content={
              <div className="flex flex-col items-start gap-2 px-2 py-3">
                <Field id="habitId" name="habitId" type="hidden" />

                <div className="w-full">
                  <label
                    htmlFor="name"
                    className="block mb-1 text-sm font-medium text-gray-700"
                  >
                    Nome
                  </label>
                  <Field
                    id="name"
                    name="name"
                    type="text"
                    autoFocus
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-1 focus:ring-primary focus:border-transparent"
                  />
                  <ErrorMessage
                    name="name"
                    component="p"
                    className="px-1 text-sm text-danger"
                  />
                </div>
              </div>
            }
            buttons={[
              {
                text: 'Cancelar',
                variant: 'secondary',
                disabled: isSubmitting,
                onClick: close,
              },
              {
                text: 'Salvar',
                loadingText: 'Salvando...',
                disabled: isSubmitting,
                isLoading: isSubmitting,
                onClick: () => {}
              },
            ]}
          />
        </Form>
      )}
    </Formik>
  );
}
