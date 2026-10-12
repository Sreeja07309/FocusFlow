import { useState } from 'react';
import { Inbox } from 'lucide-react';
import type { Task, TaskFilter, Category } from '../types';
import { CATEGORIES } from '../types';
import { isSameDay } from '../lib/storage';
import TaskCard from './TaskCard';

interface TasksViewProps {
  tasks: Task[];
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

const filters: { id: TaskFilter; label: string }[] = [
  { id: 'all', label: 'All Tasks' },
  { id: 'pending', label: 'Pending' },
  { id: 'completed', label: 'Completed' },
  { id: 'due-today', label: 'Due Today' },
];

export default function TasksView({ tasks, onToggle, onDelete }: TasksViewProps) {
  const [filter, setFilter] = useState<TaskFilter>('all');
  const [categoryFilter, setCategoryFilter] = useState<Category | 'all'>('all');

  const filtered = tasks.filter((t) => {
    if (filter === 'pending' && t.completed) return false;
    if (filter === 'completed' && !t.completed) return false;
    if (filter === 'due-today' && !isSameDay(t.dueDate)) return false;
    if (categoryFilter !== 'all' && t.category !== categoryFilter) return false;
    return true;
  });

  const counts = {
    all: tasks.length,
    pending: tasks.filter((t) => !t.completed).length,
    completed: tasks.filter((t) => t.completed).length,
    'due-today': tasks.filter((t) => isSameDay(t.dueDate)).length,
  };

  return (
    <div className="mx-auto max-w-4xl">
      <div className="mb-6 animate-fade-in">
        <h1 className="text-2xl font-bold text-navy-900 dark:text-white">My Tasks</h1>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          Manage and filter all your tasks in one place.
        </p>
      </div>

      {/* Status filters */}
      <div className="mb-3 flex flex-wrap gap-2">
        {filters.map((f) => (
          <button
            key={f.id}
            onClick={() => setFilter(f.id)}
            className={`inline-flex items-center gap-1.5 rounded-xl px-3 py-1.5 text-sm font-medium transition-all ${
              filter === f.id
                ? 'bg-navy-700 text-white dark:bg-lavender-600'
                : 'bg-white text-gray-600 border border-gray-200 hover:border-gray-300 dark:bg-navy-800 dark:text-gray-400 dark:border-navy-700'
            }`}
          >
            {f.label}
            <span
              className={`rounded-full px-1.5 text-xs ${
                filter === f.id
                  ? 'bg-white/20'
                  : 'bg-gray-100 dark:bg-navy-700'
              }`}
            >
              {counts[f.id]}
            </span>
          </button>
        ))}
      </div>

      {/* Category filters */}
      <div className="mb-5 flex flex-wrap gap-2">
        <button
          onClick={() => setCategoryFilter('all')}
          className={`rounded-lg px-2.5 py-1 text-xs font-medium transition-all ${
            categoryFilter === 'all'
              ? 'bg-navy-100 text-navy-700 dark:bg-navy-700 dark:text-white'
              : 'text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-navy-800'
          }`}
        >
          All Categories
        </button>
        {CATEGORIES.map((c) => (
          <button
            key={c}
            onClick={() => setCategoryFilter(c)}
            className={`rounded-lg px-2.5 py-1 text-xs font-medium transition-all ${
              categoryFilter === c
                ? 'bg-navy-100 text-navy-700 dark:bg-navy-700 dark:text-white'
                : 'text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-navy-800'
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      {/* Task list */}
      {filtered.length === 0 ? (
        <div className="animate-fade-in rounded-2xl border border-dashed border-gray-300 bg-white p-10 text-center dark:border-navy-600 dark:bg-navy-800">
          <Inbox size={36} className="mx-auto text-gray-300 dark:text-navy-500" />
          <p className="mt-3 text-sm font-medium text-gray-500 dark:text-gray-400">
            No tasks match this filter.
          </p>
          <p className="mt-1 text-xs text-gray-400 dark:text-gray-500">
            Try selecting a different filter or category.
          </p>
        </div>
      ) : (
        <div className="grid gap-3 animate-fade-in sm:grid-cols-2">
          {filtered.map((task) => (
            <TaskCard key={task.id} task={task} onToggle={onToggle} onDelete={onDelete} />
          ))}
        </div>
      )}
    </div>
  );
}
