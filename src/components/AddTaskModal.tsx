import { useState, useEffect } from 'react';
import { X, Calendar, Flag, Tag, Plus } from 'lucide-react';
import type { Task, Category, Priority } from '../types';
import { CATEGORIES, PRIORITIES } from '../types';

interface AddTaskModalProps {
  open: boolean;
  onClose: () => void;
  onAdd: (data: Omit<Task, 'id' | 'completed' | 'createdAt'>) => void;
}

export default function AddTaskModal({ open, onClose, onAdd }: AddTaskModalProps) {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<Category>('Assignment');
  const [dueDate, setDueDate] = useState('');
  const [priority, setPriority] = useState<Priority>('Medium');
  const [error, setError] = useState('');

  useEffect(() => {
    if (open) {
      const today = new Date().toISOString().split('T')[0];
      setDueDate(today);
      setTitle('');
      setCategory('Assignment');
      setPriority('Medium');
      setError('');
    }
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [open, onClose]);

  if (!open) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      setError('Please enter a task title.');
      return;
    }
    onAdd({ title: title.trim(), category, dueDate, priority });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fade-in">
      <div
        className="absolute inset-0 bg-navy-950/40 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="relative w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl animate-scale-in dark:bg-navy-800 dark:border dark:border-navy-700">
        <div className="mb-5 flex items-center justify-between">
          <h2 className="text-lg font-bold text-navy-900 dark:text-white">Add New Task</h2>
          <button
            onClick={onClose}
            className="rounded-lg p-1.5 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600 dark:hover:bg-navy-700 dark:hover:text-gray-200"
            aria-label="Close"
          >
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="mb-1.5 block text-sm font-medium text-navy-800 dark:text-gray-200">
              Task Title
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
                if (error) setError('');
              }}
              placeholder="e.g. Complete calculus assignment"
              autoFocus
              className={`w-full rounded-xl border bg-gray-50 px-4 py-2.5 text-sm text-navy-900 outline-none transition-colors placeholder:text-gray-400 focus:border-navy-500 focus:ring-2 focus:ring-navy-500/20 dark:bg-navy-900 dark:text-white dark:border-navy-600 dark:placeholder:text-gray-500 ${
                error ? 'border-red-400' : 'border-gray-200'
              }`}
            />
            {error && <p className="mt-1.5 text-xs text-red-500">{error}</p>}
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-medium text-navy-800 dark:text-gray-200">
              <Tag size={14} className="mr-1 inline" /> Category
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value as Category)}
              className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-2.5 text-sm text-navy-900 outline-none transition-colors focus:border-navy-500 focus:ring-2 focus:ring-navy-500/20 dark:bg-navy-900 dark:text-white dark:border-navy-600"
            >
              {CATEGORIES.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-medium text-navy-800 dark:text-gray-200">
              <Calendar size={14} className="mr-1 inline" /> Due Date
            </label>
            <input
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-2.5 text-sm text-navy-900 outline-none transition-colors focus:border-navy-500 focus:ring-2 focus:ring-navy-500/20 dark:bg-navy-900 dark:text-white dark:border-navy-600"
            />
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-medium text-navy-800 dark:text-gray-200">
              <Flag size={14} className="mr-1 inline" /> Priority
            </label>
            <div className="grid grid-cols-3 gap-2">
              {PRIORITIES.map((p) => (
                <button
                  key={p}
                  type="button"
                  onClick={() => setPriority(p)}
                  className={`rounded-xl border px-3 py-2 text-sm font-medium transition-all ${
                    priority === p
                      ? p === 'High'
                        ? 'border-red-400 bg-red-50 text-red-700 dark:bg-red-900/30 dark:text-red-300 dark:border-red-800'
                        : p === 'Medium'
                          ? 'border-amber-400 bg-amber-50 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300 dark:border-amber-800'
                          : 'border-green-400 bg-green-50 text-green-700 dark:bg-green-900/30 dark:text-green-300 dark:border-green-800'
                      : 'border-gray-200 text-gray-500 hover:border-gray-300 dark:border-navy-600 dark:text-gray-400'
                  }`}
                >
                  {p}
                </button>
              ))}
            </div>
          </div>

          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 rounded-xl border border-gray-200 px-4 py-2.5 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-50 dark:border-navy-600 dark:text-gray-300 dark:hover:bg-navy-700"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 rounded-xl bg-navy-700 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-navy-800 dark:bg-lavender-600 dark:hover:bg-lavender-700"
            >
              <Plus size={16} className="mr-1 inline" /> Add Task
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
