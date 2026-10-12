import {
  LayoutDashboard,
  ListTodo,
  CalendarClock,
  Settings,
  Plus,
  Moon,
  Sun,
  Home,
  Menu,
  X,
} from 'lucide-react';
import { useState } from 'react';
import Logo from './Logo';

export type DashboardView = 'dashboard' | 'tasks' | 'planner' | 'settings';

interface DashboardLayoutProps {
  view: DashboardView;
  onViewChange: (view: DashboardView) => void;
  onAddTask: () => void;
  onHome: () => void;
  theme: 'light' | 'dark';
  onToggleTheme: () => void;
  children: React.ReactNode;
}

const navItems: { id: DashboardView; label: string; icon: typeof LayoutDashboard }[] = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'tasks', label: 'My Tasks', icon: ListTodo },
  { id: 'planner', label: 'Study Planner', icon: CalendarClock },
  { id: 'settings', label: 'Settings', icon: Settings },
];

export default function DashboardLayout({
  view,
  onViewChange,
  onAddTask,
  onHome,
  theme,
  onToggleTheme,
  children,
}: DashboardLayoutProps) {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  const handleNavClick = (id: DashboardView) => {
    onViewChange(id);
    setMobileNavOpen(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-navy-950">
      {/* Sidebar — desktop */}
      <aside className="fixed left-0 top-0 z-30 hidden h-full w-64 border-r border-gray-200 bg-white dark:border-navy-800 dark:bg-navy-900 lg:flex lg:flex-col">
        <div className="border-b border-gray-100 p-5 dark:border-navy-800">
          <Logo onClick={onHome} />
        </div>
        <nav className="flex-1 space-y-1 p-3">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = view === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all ${
                  active
                    ? 'bg-navy-700 text-white shadow-sm dark:bg-lavender-600'
                    : 'text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-navy-800'
                }`}
              >
                <Icon size={18} />
                {item.label}
              </button>
            );
          })}
        </nav>
        <div className="border-t border-gray-100 p-3 dark:border-navy-800">
          <button
            onClick={onToggleTheme}
            className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-navy-800"
          >
            {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
            {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
          </button>
          <button
            onClick={onHome}
            className="mt-1 flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-navy-800"
          >
            <Home size={18} />
            Back to Home
          </button>
        </div>
      </aside>

      {/* Mobile nav header */}
      <div className="sticky top-0 z-30 flex items-center justify-between border-b border-gray-200 bg-white px-4 py-3 dark:border-navy-800 dark:bg-navy-900 lg:hidden">
        <Logo size="sm" onClick={onHome} />
        <button
          onClick={() => setMobileNavOpen(true)}
          className="rounded-lg p-2 text-gray-600 dark:text-gray-300"
          aria-label="Open menu"
        >
          <Menu size={22} />
        </button>
      </div>

      {/* Mobile nav drawer */}
      {mobileNavOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="absolute inset-0 bg-navy-950/40 backdrop-blur-sm"
            onClick={() => setMobileNavOpen(false)}
          />
          <div className="absolute left-0 top-0 h-full w-72 bg-white shadow-2xl animate-fade-in dark:bg-navy-900">
            <div className="flex items-center justify-between border-b border-gray-100 p-5 dark:border-navy-800">
              <Logo size="sm" onClick={onHome} />
              <button
                onClick={() => setMobileNavOpen(false)}
                className="rounded-lg p-1.5 text-gray-400 dark:text-gray-500"
                aria-label="Close menu"
              >
                <X size={20} />
              </button>
            </div>
            <nav className="space-y-1 p-3">
              {navItems.map((item) => {
                const Icon = item.icon;
                const active = view === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleNavClick(item.id)}
                    className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all ${
                      active
                        ? 'bg-navy-700 text-white dark:bg-lavender-600'
                        : 'text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-navy-800'
                    }`}
                  >
                    <Icon size={18} />
                    {item.label}
                  </button>
                );
              })}
              <div className="my-2 border-t border-gray-100 dark:border-navy-800" />
              <button
                onClick={() => {
                  onToggleTheme();
                  setMobileNavOpen(false);
                }}
                className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-navy-800"
              >
                {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
                {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
              </button>
              <button
                onClick={() => {
                  onHome();
                  setMobileNavOpen(false);
                }}
                className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-navy-800"
              >
                <Home size={18} />
                Back to Home
              </button>
            </nav>
          </div>
        </div>
      )}

      {/* Main content */}
      <div className="lg:pl-64">
        {/* Top bar */}
        <header className="sticky top-0 z-20 hidden items-center justify-between border-b border-gray-200 bg-white/80 px-6 py-3 backdrop-blur-lg dark:border-navy-800 dark:bg-navy-900/80 lg:flex">
          <div className="flex items-center gap-3">
            <button
              onClick={onAddTask}
              className="inline-flex items-center gap-2 rounded-xl bg-navy-700 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-navy-800 dark:bg-lavender-600 dark:hover:bg-lavender-700"
            >
              <Plus size={16} /> Add New Task
            </button>
          </div>
          <button
            onClick={onToggleTheme}
            className="rounded-lg p-2 text-gray-500 transition-colors hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-navy-800"
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
          </button>
        </header>

        {/* Mobile add task button */}
        <div className="px-4 pt-4 lg:hidden">
          <button
            onClick={onAddTask}
            className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-navy-700 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-navy-800 dark:bg-lavender-600 dark:hover:bg-lavender-700"
          >
            <Plus size={16} /> Add New Task
          </button>
        </div>

        <main className="p-4 sm:p-6 lg:p-8">{children}</main>
      </div>
    </div>
  );
}
