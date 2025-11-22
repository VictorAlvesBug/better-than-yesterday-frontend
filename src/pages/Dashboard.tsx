import React, { useEffect, useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { usePlans } from '../hooks/usePlans';
import { useCheckIns } from '../hooks/useCheckIns';
import Button from '../components/Common/Button';
const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const { plans } = usePlans();
  const { checkIns } = useCheckIns();
  const [stats, setStats] = useState({
    activePlans: 0,
    checkInsToday: 0,
    currentStreak: 0,
    checkInsThisMonth: 0,
  });
  useEffect(() => {
    // Calculate stats
    const today = new Date().toISOString().split('T')[0];
    const activePlansCount = plans.filter((p) => p.status === 'active').length;
    const todayCheckIns = checkIns.filter((c) =>
      c.date.startsWith(today)
    ).length;
    // Calculate streak (simplified)
    const sortedCheckIns = [...checkIns].sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );
    let streak = 0;
    let currentDate = new Date();
    for (const checkIn of sortedCheckIns) {
      const checkInDate = new Date(checkIn.date);
      const daysDiff = Math.floor(
        (currentDate.getTime() - checkInDate.getTime()) / (1000 * 60 * 60 * 24)
      );
      if (daysDiff === 0 || daysDiff === 1) {
        streak++;
        currentDate = checkInDate;
      } else {
        break;
      }
    }
    // This month check-ins
    const thisMonth = new Date().getMonth();
    const thisYear = new Date().getFullYear();
    const monthCheckIns = checkIns.filter((c) => {
      const date = new Date(c.date);
      return date.getMonth() === thisMonth && date.getFullYear() === thisYear;
    }).length;
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setStats({
      activePlans: activePlansCount,
      checkInsToday: todayCheckIns,
      currentStreak: streak,
      checkInsThisMonth: monthCheckIns,
    });
  }, [plans, checkIns]);
  return (
    <div>
      <div>
        <h1>Bem-vindo, {user?.name}!</h1>
        <p>Aqui está o resumo do seu progresso</p>
      </div>
      {/* Stats Cards */}
      <div>
        <StatCard
          icon="📋"
          label="Planos Ativos"
          value={stats.activePlans}
          color="blue"
        />
        <StatCard
          icon="✅"
          label="Check-ins Hoje"
          value={stats.checkInsToday}
          color="green"
        />
        <StatCard
          icon="🔥"
          label="Sequência Atual"
          value={stats.currentStreak}
          color="orange"
        />
        <StatCard
          icon="📊"
          label="Check-ins Este Mês"
          value={stats.checkInsThisMonth}
          color="purple"
        />
      </div>
      {/* Quick Actions */}
      <div>
        <h2>Ações Rápidas</h2>
        <div>
          <Button variant="primary">Fazer Check-in</Button>
          <Button variant="secondary">Criar Novo Plano</Button>
        </div>
      </div>
    </div>
  );
};
type StatCardProps = {
  icon: string;
  label: string;
  value: number;
  color: 'blue' | 'green' | 'orange' | 'purple';
}
const StatCard: React.FC<StatCardProps> = ({
  icon,
  label,
  value /*, color*/,
}) => {
  /*const colorClasses = {
blue: 'bg-blue-100 text-blue-600',
green: 'bg-green-100 text-green-600',
orange: 'bg-orange-100 text-orange-600',
purple: 'bg-purple-100 text-purple-600',
};*/
  return (
    <div>
      <div>
        <div>{icon}</div>
        <div>
          <p>{label}</p>
          <p>{value}</p>
        </div>
      </div>
    </div>
  );
};
export default Dashboard;
