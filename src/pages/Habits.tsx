import React, { useEffect, useState } from 'react';
import Button from '../components/Common/Button';
import Card from '../components/Common/Card';
import type { HabitWithPlansCount } from '../types/habit.types';
import { habitApi } from '../services/api/habitApi';
import { toast } from 'react-toastify';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCrosshairs,
  faEdit,
  faTasks,
} from '@fortawesome/free-solid-svg-icons';
import { ModalConfirm } from '../components/Common/ModalConfirm';
import { isSuccess } from '../types/api.types';
import SaveHabitModal from '../components/Habits/SaveHabitModal';
import useBooleanState from '../hooks/useBooleanState';
import FontAwesomeIconWithTooltip from '../components/Common/FontAwesomeIconWithTooltip';
import { useSaveHabitModal } from '../hooks/useSaveHabitModal';

const Habits: React.FC = () => {
  const loading = useBooleanState(false);
  const [habits, setHabits] = useState<HabitWithPlansCount[]>([]);

  const saveHabitModalManager = useSaveHabitModal(
    () => fetchHabits(),
  );

  const confirmHabitDeletionModalOpen = useBooleanState(false);
  const [habitToDelete, setHabitToDelete] =
    useState<HabitWithPlansCount | null>(null);

  const fetchHabits = async function () {
    try {
      loading.set();
      const response = await habitApi.getAllHabits();

      if (!isSuccess(response)) toast.error(response.reason);

      setHabits(response.data || []);
    } catch (err) {
      toast.error(
        err instanceof Error ? err.message : 'Erro ao carregar hábitos'
      );
    } finally {
      loading.reset();
    }
  };

  useEffect(() => {
    fetchHabits();
  }, []);

  const onDeleteHabit = async () => {
    if (!habitToDelete) {
      toast.error('Não foi selecionado nenhum hábito para deletar');
      return;
    }
    const response = await habitApi.deleteHabit(habitToDelete.habitId);
    const ok = isSuccess(response);
    const showToast = ok ? toast.success : toast.error;

    if (response.reason) showToast(response.reason);

    if (ok) {
      setHabits((prev) =>
        prev.filter((habit) => habit.habitId !== habitToDelete.habitId)
      );
    }
  };

  return (
    <div className="flex flex-col items-center justify-start w-full top-10">
      <div className="flex flex-row justify-between w-full p-4">
        <h1 className="mb-4 text-2xl font-bold text-title">Hábitos</h1>
        <Button
          className="text-info-contrast"
          onClick={() => saveHabitModalManager.openCreateModal()}
        >
          Criar Novo Hábito
        </Button>
      </div>
      <div className="grid w-full grid-flow-row grid-cols-1 gap-4 p-4 lg:grid-cols-3 md:grid-cols-2">
        {loading.isEnabled ? (
          <p>Carregando hábitos...</p>
        ) : habits.length === 0 ? (
          <p className="text-info">Nenhum hábito encontrado</p>
        ) : (
          habits.map((habit) => (
            <Card
              key={habit.habitId}
              className="flex flex-row items-center justify-between gap-4"
            >
              <div className="flex flex-row items-center flex-1 gap-2">
                <FontAwesomeIcon icon={faCrosshairs} />
                <h2 className="text-lg font-semibold text-title">
                  {habit.name}
                </h2>
              </div>
              <p className="flex flex-row gap-2 text-info">
                <FontAwesomeIconWithTooltip
                  icon={faEdit}
                  tooltip={'Editar'}
                  onClick={() => saveHabitModalManager.openUpdateModal(habit)}
                />
                <FontAwesomeIconWithTooltip
                  icon={faTasks}
                  tooltip={`${habit.plansCount} ${
                    habit.plansCount === 1 ? 'plano ativo' : 'planos ativos'
                  }`}
                  onClick={() => toast.info('Funcionalidade em construção...')}
                />
              </p>
              <Button
                className="text-info-contrast"
                variant="danger"
                onClick={() => {
                  setHabitToDelete(habit);
                  confirmHabitDeletionModalOpen.set();
                }}
              >
                Deletar
              </Button>
            </Card>
          ))
        )}
      </div>
      <ModalConfirm
        isOpen={confirmHabitDeletionModalOpen.isEnabled}
        onConfirm={onDeleteHabit}
        onClose={confirmHabitDeletionModalOpen.reset}
        message={
          <>
            Deseja deletar o hábito{' '}
            <span className="font-bold">{habitToDelete?.name}</span>?
          </>
        }
      />
      <SaveHabitModal modal={saveHabitModalManager} />
    </div>
  );
};

export default Habits;
