import {
  Check,
  Trash2,
  FileText,
  GraduationCap,
  BookOpen,
  Coffee,
  AlertTriangle,
} from 'lucide-react';
import type { Task } from '../types';
import { PRIORITY_COLORS, CATEGORY_COLORS } from '../types';
import { formatDate, isOverdue } from '../lib/storage';

const iconMap = {
  FileText,
  GraduationCap,
  BookOpen,
  Coffee,
} as const;

interface TaskCardProps {
  task: Task;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

export default function TaskCard({ task, onToggle, onDelete }: TaskCardProps) {
  const Icon = iconMap[task.category as keyof typeof iconMap] ?? FileText;
  const overdue = isOverdue(task.dueDate, task.completed);

  return (
    <div
      className={`group flex items-start gap-3 rounded-xl border bg-white p-4 transition-all hover:shadow-md dark:bg-navy-800 dark:border-navy-700 ${
        task.completed
          ? 'border-gray-200 opacity-70 dark:border-navy-700'
          : overdue
            ? 'border-red-300 dark:border-red-900/50'
            : 'border-gray-200 dark:border-navy-700'
      }`}
    >
      <button
        onClick={() => onToggle(task.id)}
        className={`mt-0.5 flex-shrink-0 flex h-5 w-5 items-center justify-center rounded-md border-2 transition-all ${
          task.completed
            ? 'bg-navy-700 border-navy-700 text-white'
            : 'border-gray-300 hover:border-navy-500 dark:border-navy-500'
        }`}
        aria-label={task.completed ? 'Mark as not done' : 'Mark as done'}
      >
        {task.completed && <Check size={14} strokeWidth={3} />}
      </button>

      <div className="min-w-0 flex-1">
        <div className="flex items-start justify-between gap-2">
          <p
            className={`text-sm font-medium leading-snug ${
              task.completed
                ? 'text-gray-400 line-through dark:text-gray-500'
                : 'text-navy-900 dark:text-gray-100'
            }`}
          >
            {task.title}
          </p>
          <button
            onClick={() => onDelete(task.id)}
            className="flex-shrink-0 text-gray-300 transition-colors hover:text-red-500 dark:text-navy-500 dark:hover:text-red-400"
            aria-label="Delete task"
          >
            <Trash2 size={16} />
          </button>
        </div>

        <div className="mt-2 flex flex-wrap items-center gap-2">
          <span
            className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium ${CATEGORY_COLORS[task.category]}`}
          >
            <Icon size={12} />
            {task.category}
          </span>
          <span
            className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium ${PRIORITY_COLORS[task.priority]}`}
          >
            {task.priority} Priority
          </span>
          <span
            className={`inline-flex items-center gap-1 text-xs ${
              overdue
                ? 'text-red-500 font-medium'
                : 'text-gray-400 dark:text-gray-500'
            }`}
          >
            {overdue && <AlertTriangle size={12} />}
            {formatDate(task.dueDate)}
          </span>
        </div>
      </div>
    </div>
  );
}
