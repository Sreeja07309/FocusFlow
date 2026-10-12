import { useState } from 'react';
import LandingPage from './components/LandingPage';
import DashboardLayout, { type DashboardView as ViewType } from './components/DashboardLayout';
import DashboardView from './components/DashboardView';
import TasksView from './components/TasksView';
import PlannerView from './components/PlannerView';
import SettingsView from './components/SettingsView';
import AddTaskModal from './components/AddTaskModal';
import { useTasks } from './hooks/useTasks';
import { useTheme } from './hooks/useTheme';

type Page = 'landing' | 'app';

function App() {
  const [page, setPage] = useState<Page>('landing');
  const [view, setView] = useState<ViewType>('dashboard');
  const [modalOpen, setModalOpen] = useState(false);

  const { tasks, addTask, toggleTask, deleteTask, resetTasks } = useTasks();
  const { theme, toggleTheme } = useTheme();

  const handleGetStarted = () => {
    setPage('app');
    setView('dashboard');
  };

  const handleHome = () => {
    setPage('landing');
  };

  if (page === 'landing') {
    return (
      <LandingPage
        onGetStarted={handleGetStarted}
        theme={theme}
        onToggleTheme={toggleTheme}
      />
    );
  }

  return (
    <>
      <DashboardLayout
        view={view}
        onViewChange={setView}
        onAddTask={() => setModalOpen(true)}
        onHome={handleHome}
        theme={theme}
        onToggleTheme={toggleTheme}
      >
        {view === 'dashboard' && (
          <DashboardView
            tasks={tasks}
            onToggle={toggleTask}
            onDelete={deleteTask}
            onAddTask={() => setModalOpen(true)}
            onViewTasks={() => setView('tasks')}
          />
        )}
        {view === 'tasks' && (
          <TasksView tasks={tasks} onToggle={toggleTask} onDelete={deleteTask} />
        )}
        {view === 'planner' && <PlannerView tasks={tasks} />}
        {view === 'settings' && (
          <SettingsView
            theme={theme}
            onToggleTheme={toggleTheme}
            onResetTasks={resetTasks}
          />
        )}
      </DashboardLayout>

      <AddTaskModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onAdd={addTask}
      />
    </>
  );
}

export default App;
