import React, { useEffect } from 'react';
import Button from '../components/Common/Button';
import Card from '../components/Common/Card';
import type { HabitWithPlansCount } from '../types/habit.types';
import { habitApi } from '../services/api/habitApi';
import { toast } from 'react-toastify';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCrosshairs } from '@fortawesome/free-solid-svg-icons';
import { ModalConfirm } from '../components/Common/ModalConfirm';

const Habits: React.FC = () => {
  const [habits, setHabits] = React.useState<Array<HabitWithPlansCount>>([]);
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string | null>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] =
    React.useState<boolean>(false);
  const [deleteModalOnConfirm, setDeleteModalOnConfirm] =
    React.useState<() => Promise<void>>(() => async () => {});

  useEffect(() => {
    async function fetchHabits() {
      try {
        setIsLoading(true);
        setError(null);
        const response = await habitApi.getAllHabits();
        setHabits(response);
      } catch (err) {
        setError(`Erro ao carregar hábitos. ${err}`);
      } finally {
        setIsLoading(false);
      }
    }

    fetchHabits();
  }, []);

  useEffect(() => {
    toast.error(error!);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-start w-full top-10">
      <div className="flex flex-row justify-between w-full p-4">
        <h1 className="mb-4 text-2xl font-bold text-title">Hábitos</h1>
        <Button className="text-info-contrast">Criar Novo Hábito</Button>
      </div>
      <div className="grid w-full grid-flow-row grid-cols-3 gap-4 p-4">
        {isLoading ? (
          <p>Carregando hábitos...</p>
        ) : habits.length === 0 ? (
          <p className="text-info">Nenhum hábito encontrado</p>
        ) : (
          habits.map((habit) => (
            <Card key={habit.habitId}>
              <div className="flex flex-row items-center gap-2 mb-2">
                <FontAwesomeIcon icon={faCrosshairs} />
                <h2 className="text-lg font-semibold text-title">
                  {habit.name}
                </h2>
              </div>
              <p className="text-info">{`${habit.plansCount} ${
                habit.plansCount === 1 ? 'plano ativo' : 'planos ativos'
              }`}</p>
              <Button
                className="text-info-contrast"
                variant="danger"
                onClick={() => {
                  setIsDeleteModalOpen(true);
                  setDeleteModalOnConfirm(() => async () => {
                    try {
                      await habitApi.deleteHabit(habit.habitId);
                      setHabits((prevHabits) =>
                        prevHabits.filter((h) => h.habitId !== habit.habitId)
                      );
                      toast.success('Hábito deletado com sucesso!');
                    } catch (err) {
                      toast.error(`Erro ao deletar hábito. ${err}`);
                    } finally {
                      setIsDeleteModalOpen(false);
                    }
                  });
                }}
              >
                Deletar
              </Button>
            </Card>
          ))
        )}
      </div>
      <ModalConfirm
        isOpen={isDeleteModalOpen}
        onConfirm={deleteModalOnConfirm}
        onCancel={() => setIsDeleteModalOpen(false)}
        message='Deseja deletar este hábito?'
      />
    </div>
  );
};

export default Habits;
