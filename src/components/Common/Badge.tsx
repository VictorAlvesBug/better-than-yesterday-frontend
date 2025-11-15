import React from 'react';
import type { PlanStatus } from '../../types/plan.types';
interface BadgeProps {
  status: PlanStatus;
  children?: React.ReactNode;
}
const Badge: React.FC<BadgeProps> = ({ status, children }) => {
  const statusConfig = {
    active: {
      bg: 'bg-success',
      text: 'text-white',
      label: 'Ativo',
    },
    paused: {
      bg: 'bg-warning',
      text: 'text-white',
      label: 'Pausado',
    },
    completed: {
      bg: 'bg-blue-500',
      text: 'text-white',
      label: 'Concluído',
    },
    cancelled: {
      bg: 'bg-error',
      text: 'text-white',
      label: 'Cancelado',
    },
  };
  const config = statusConfig[status];
  return <span>{children || config.label}</span>;
};
export default Badge;
