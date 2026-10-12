import { useState } from 'react';
import { Sun, Moon, RotateCcw, AlertTriangle, X } from 'lucide-react';

interface SettingsViewProps {
  theme: 'light' | 'dark';
  onToggleTheme: () => void;
  onResetTasks: () => void;
}

export default function SettingsView({
  theme,
  onToggleTheme,
  onResetTasks,
}: SettingsViewProps) {
  const [showConfirm, setShowConfirm] = useState(false);

  return (
    <div className="mx-auto max-w-2xl">
      <div className="mb-6 animate-fade-in">
        <h1 className="text-2xl font-bold text-navy-900 dark:text-white">Settings</h1>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          Customize your FocusFlow experience.
        </p>
      </div>

      {/* Theme toggle */}
      <div className="mb-4 animate-slide-up rounded-2xl border border-gray-200 bg-white p-5 shadow-sm dark:border-navy-700 dark:bg-navy-800">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-lavender-100 text-lavender-700 dark:bg-lavender-900/40 dark:text-lavender-300">
              {theme === 'dark' ? <Moon size={20} /> : <Sun size={20} />}
            </div>
            <div>
              <h2 className="text-sm font-bold text-navy-900 dark:text-white">
                Appearance
              </h2>
              <p className="text-xs text-gray-400 dark:text-gray-500">
                {theme === 'dark' ? 'Dark mode is currently on' : 'Light mode is currently on'}
              </p>
            </div>
          </div>
          <button
            onClick={onToggleTheme}
            className={`relative h-7 w-12 rounded-full transition-colors ${
              theme === 'dark' ? 'bg-lavender-600' : 'bg-gray-300'
            }`}
            aria-label="Toggle theme"
          >
            <span
              className={`absolute top-1 h-5 w-5 rounded-full bg-white shadow-sm transition-transform ${
                theme === 'dark' ? 'translate-x-6' : 'translate-x-1'
              }`}
            />
          </button>
        </div>
      </div>

      {/* Reset tasks */}
      <div className="animate-slide-up rounded-2xl border border-gray-200 bg-white p-5 shadow-sm dark:border-navy-700 dark:bg-navy-800" style={{ animationDelay: '0.05s' }}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300">
              <RotateCcw size={20} />
            </div>
            <div>
              <h2 className="text-sm font-bold text-navy-900 dark:text-white">
                Reset Sample Tasks
              </h2>
              <p className="text-xs text-gray-400 dark:text-gray-500">
                Restore the original set of sample study tasks.
              </p>
            </div>
          </div>
          <button
            onClick={() => setShowConfirm(true)}
            className="rounded-xl border border-gray-200 px-4 py-2 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-50 dark:border-navy-600 dark:text-gray-300 dark:hover:bg-navy-700"
          >
            Reset
          </button>
        </div>
      </div>

      {/* Confirmation modal */}
      {showConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fade-in">
          <div
            className="absolute inset-0 bg-navy-950/40 backdrop-blur-sm"
            onClick={() => setShowConfirm(false)}
          />
          <div className="relative w-full max-w-sm rounded-2xl bg-white p-6 shadow-2xl animate-scale-in dark:bg-navy-800 dark:border dark:border-navy-700">
            <div className="mb-4 flex items-center justify-between">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-red-100 text-red-600 dark:bg-red-900/40 dark:text-red-300">
                <AlertTriangle size={20} />
              </div>
              <button
                onClick={() => setShowConfirm(false)}
                className="rounded-lg p-1.5 text-gray-400 transition-colors hover:bg-gray-100 dark:hover:bg-navy-700"
                aria-label="Close"
              >
                <X size={18} />
              </button>
            </div>
            <h3 className="mb-2 text-lg font-bold text-navy-900 dark:text-white">
              Reset all tasks?
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              This will replace all your current tasks with the original sample tasks.
              This action cannot be undone.
            </p>
            <div className="mt-5 flex gap-3">
              <button
                onClick={() => setShowConfirm(false)}
                className="flex-1 rounded-xl border border-gray-200 px-4 py-2.5 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-50 dark:border-navy-600 dark:text-gray-300 dark:hover:bg-navy-700"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  onResetTasks();
                  setShowConfirm(false);
                }}
                className="flex-1 rounded-xl bg-red-500 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-red-600"
              >
                Yes, Reset
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
