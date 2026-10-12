import {
  ListTodo,
  CheckCircle2,
  Clock,
  CalendarDays,
  Plus,
} from 'lucide-react';
import type { Task } from '../types';
import { formatFullDate, isSameDay } from '../lib/storage';
import TaskCard from './TaskCard';

interface DashboardViewProps {
  tasks: Task[];
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onAddTask: () => void;
  onViewTasks: () => void;
}

export default function DashboardView({
  tasks,
  onToggle,
  onDelete,
  onAddTask,
  onViewTasks,
}: DashboardViewProps) {
  const total = tasks.length;
  const completed = tasks.filter((t) => t.completed).length;
  const pending = total - completed;
  const dueToday = tasks.filter((t) => isSameDay(t.dueDate) && !t.completed).length;
  const progress = total > 0 ? Math.round((completed / total) * 100) : 0;

  const todayTasks = tasks.filter((t) => isSameDay(t.dueDate));

  const cards = [
    {
      label: 'Total Tasks',
      value: total,
      icon: ListTodo,
      color: 'bg-navy-100 text-navy-700 dark:bg-navy-700/40 dark:text-navy-200',
    },
    {
      label: 'Completed',
      value: completed,
      icon: CheckCircle2,
      color: 'bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-300',
    },
    {
      label: 'Pending',
      value: pending,
      icon: Clock,
      color: 'bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300',
    },
    {
      label: 'Due Today',
      value: dueToday,
      icon: CalendarDays,
      color: 'bg-lavender-100 text-lavender-700 dark:bg-lavender-900/40 dark:text-lavender-300',
    },
  ];

  return (
    <div className="mx-auto max-w-5xl">
      {/* Header */}
      <div className="mb-6 animate-fade-in">
        <h1 className="text-2xl font-bold text-navy-900 dark:text-white">
          Welcome back, Student!
        </h1>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          {formatFullDate(new Date())}
        </p>
      </div>

      {/* Summary cards */}
      <div className="mb-6 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
        {cards.map((card, i) => {
          const Icon = card.icon;
          return (
            <div
              key={card.label}
              className="animate-slide-up rounded-2xl border border-gray-200 bg-white p-4 shadow-sm transition-shadow hover:shadow-md dark:border-navy-700 dark:bg-navy-800 sm:p-5"
              style={{ animationDelay: `${i * 0.05}s` }}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-medium text-gray-400 dark:text-gray-500 sm:text-sm">
                    {card.label}
                  </p>
                  <p className="mt-1 text-2xl font-bold text-navy-900 dark:text-white sm:text-3xl">
                    {card.value}
                  </p>
                </div>
                <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${card.color} sm:h-12 sm:w-12`}>
                  <Icon size={20} />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Progress bar */}
      <div className="mb-6 animate-slide-up rounded-2xl border border-gray-200 bg-white p-5 shadow-sm dark:border-navy-700 dark:bg-navy-800" style={{ animationDelay: '0.2s' }}>
        <div className="mb-3 flex items-center justify-between">
          <div>
            <h2 className="text-sm font-bold text-navy-900 dark:text-white">
              Completion Progress
            </h2>
            <p className="text-xs text-gray-400 dark:text-gray-500">
              {completed} of {total} tasks completed
            </p>
          </div>
          <span className="text-2xl font-bold text-navy-700 dark:text-lavender-400">
            {progress}%
          </span>
        </div>
        <div className="h-3 overflow-hidden rounded-full bg-gray-100 dark:bg-navy-700">
          <div
            className="h-full rounded-full bg-gradient-to-r from-navy-700 to-lavender-500 transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Today's Study Plan */}
      <div className="animate-slide-up" style={{ animationDelay: '0.25s' }}>
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-bold text-navy-900 dark:text-white">
            Today's Study Plan
          </h2>
          <button
            onClick={onViewTasks}
            className="text-sm font-medium text-navy-600 transition-colors hover:text-navy-800 dark:text-lavender-400 dark:hover:text-lavender-300"
          >
            View all tasks →
          </button>
        </div>

        {todayTasks.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-gray-300 bg-white p-8 text-center dark:border-navy-600 dark:bg-navy-800">
            <p className="text-sm text-gray-400 dark:text-gray-500">
              No tasks scheduled for today. Enjoy your day or add a new task!
            </p>
            <button
              onClick={onAddTask}
              className="mt-3 inline-flex items-center gap-2 rounded-xl bg-navy-700 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-navy-800 dark:bg-lavender-600 dark:hover:bg-lavender-700"
            >
              <Plus size={16} /> Add Task
            </button>
          </div>
        ) : (
          <div className="grid gap-3 sm:grid-cols-2">
            {todayTasks.map((task) => (
              <TaskCard key={task.id} task={task} onToggle={onToggle} onDelete={onDelete} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
