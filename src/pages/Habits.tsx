import React, { useEffect, useState } from 'react';
import Button from '../components/Common/Button';
import Card from '../components/Common/Card';
import type { HabitWithPlansCount } from '../types/habit.types';
import { habitApi } from '../services/api/habitApi';
import { toast } from 'react-toastify';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCrosshairs, faTasks } from '@fortawesome/free-solid-svg-icons';
import { ModalConfirm } from '../components/Common/ModalConfirm';
import { isSuccess } from '../types/api.types';
import CreateHabitModal from '../components/Habits/CreateHabitModal';
import useBooleanState from '../hooks/useBooleanState';
import FontAwesomeIconWithTooltip from '../components/Common/FontAwesomeIconWithTooltip';

type Action =
  | { type: 'SET_HABITS'; payload: HabitWithPlansCount[] }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'OPEN_DELETE_MODAL'; payload: { onSubmit: () => Promise<void> } }
  | { type: 'CLOSE_DELETE_MODAL' }
  | { type: 'OPEN_CREATE_MODAL'; payload: { onSubmit: () => Promise<void> } }
  | { type: 'SUBMIT_CREATE_MODAL'; payload: { habitName: string } }
  | { type: 'CLOSE_CREATE_MODAL' };

type State = {
  habits: HabitWithPlansCount[];
  isLoading: boolean;
  deleteModal: {
    isOpen: boolean;
    onConfirm: () => Promise<void>;
  };
  createModal: {
    isOpen: boolean;
    habitName: string;
    onConfirm: () => Promise<void>;
  };
};

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'SET_HABITS':
      return { ...state, habits: action.payload };
    case 'SET_LOADING':
      return { ...state, isLoading: action.payload };
    case 'OPEN_DELETE_MODAL':
      return {
        ...state,
        deleteModal: { isOpen: true, onConfirm: action.payload.onSubmit },
      };
    case 'CLOSE_DELETE_MODAL':
      return {
        ...state,
        deleteModal: { isOpen: false, onConfirm: async () => {} },
      };
    case 'OPEN_CREATE_MODAL':
      return {
        ...state,
        createModal: {
          isOpen: true,
          habitName: '',
          onConfirm: action.payload.onSubmit,
        },
      };
    case 'SUBMIT_CREATE_MODAL':
      return {
        ...state,
        createModal: {
          ...state.createModal,
          habitName: action.payload.habitName,
        },
      };
    case 'CLOSE_CREATE_MODAL':
      return {
        ...state,
        createModal: {
          isOpen: false,
          habitName: '',
          onConfirm: async () => {},
        },
      };
    default:
      return state;
  }
}

const Habits: React.FC = () => {
  const initialState: State = {
    habits: [],
    isLoading: false,
    deleteModal: {
      isOpen: false,
      onConfirm: async () => {},
    },
    createModal: {
      isOpen: false,
      habitName: '',
      onConfirm: async () => {},
    },
  };

  //const [state, dispatch] = useReducer(reducer, initialState);
  const loading = useBooleanState(false);
  const [habits, setHabits] = useState<HabitWithPlansCount[]>([]);
  const createHabitModalOpen = useBooleanState(false);
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
          onClick={() => createHabitModalOpen.set()}
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
              <p className="text-info">
                <FontAwesomeIconWithTooltip
                  icon={faTasks}
                  tooltip={`${habit.plansCount} ${
                    habit.plansCount === 1 ? 'plano ativo' : 'planos ativos'
                  }`}
                  onClick={() => toast.info("Funcionalidade em construção...")}
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
      <CreateHabitModal
        isOpen={createHabitModalOpen.isEnabled}
        onClose={createHabitModalOpen.reset}
        onSuccess={() => fetchHabits()}
      />
    </div>
  );
};

export default Habits;
