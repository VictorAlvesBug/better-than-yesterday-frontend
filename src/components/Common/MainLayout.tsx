import React from 'react';
import type { Page } from '../../types/pages.types';
import Dashboard from '../../pages/Dashboard';
import Plans from '../../pages/Plans';
import Habits from '../../pages/Habits';
import CheckIns from '../../pages/CheckIns';
import Users from '../../pages/Users';

const MainLayout: React.FC = () => {
  const [currentPage, setCurrentPage] = React.useState<Page>('Habits');

  const getClassNamesForPageLink = (page: Page) => {
    const commonClassNames = 'p-4 cursor-pointer';
    const classNamesCurrentPageLink = 'text-primary';
    const classNamesOtherPageLink = 'hover:bg-surface-hover hover:text-primary';

    return `${commonClassNames} ${
      currentPage === page ? classNamesCurrentPageLink : classNamesOtherPageLink
    }`;
  };

  const getPageContent = (page: Page) => {
    switch (page) {
      case 'Dashboard':
        return <Dashboard />;
      case 'Plans':
        return <Plans />;
      case 'Habits':
        return <Habits />;
      case 'Checkins':
        return <CheckIns />;
      case 'Users':
        return <Users />;
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col items-center justify-start w-full min-h-screen pt-20 bg-background">
      <nav className="fixed top-0 left-0 flex flex-row items-center justify-between w-full shadow-md bg-surface">
        <h2
          className="p-4 text-lg font-semibold cursor-pointer text-primary"
          onClick={() => setCurrentPage('Dashboard')}
        >
          Better Than Yesterday
        </h2>
        <ul className="flex font-semibold text-info">
          <li
            onClick={() => setCurrentPage('Dashboard')}
            className={getClassNamesForPageLink('Dashboard')}
          >
            Dashboard
          </li>
          <li
            onClick={() => setCurrentPage('Plans')}
            className={getClassNamesForPageLink('Plans')}
          >
            Planos
          </li>
          <li
            onClick={() => setCurrentPage('Habits')}
            className={getClassNamesForPageLink('Habits')}
          >
            Hábitos
          </li>
          <li
            onClick={() => setCurrentPage('Checkins')}
            className={getClassNamesForPageLink('Checkins')}
          >
            Check-ins
          </li>
          <li
            onClick={() => setCurrentPage('Users')}
            className={getClassNamesForPageLink('Users')}
          >
            Usuários
          </li>
        </ul>
        <div className="p-4 font-semibold text-info">Bem-vindo, Victor!</div>
      </nav>
      {getPageContent(currentPage)}
    </div>
  );
};

export default MainLayout;
