import { useState } from 'react';
import type { CheckIn } from '../types/checkIn.types';

export const useCheckIns = () => {
  const [checkIns, setCheckIns] = useState<CheckIn[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Exemplo de funções que você pode evoluir depois:
  // Buscar check-ins, criar, deletar, etc.
  // Aqui só o scaffold inicial:

  return {
    checkIns,
    setCheckIns,
    loading,
    setLoading,
    error,
    setError,
  };
};
