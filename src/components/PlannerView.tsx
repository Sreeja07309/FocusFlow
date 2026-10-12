import { CalendarClock, FileText, GraduationCap, BookOpen, Coffee } from 'lucide-react';
import type { Task } from '../types';
import { formatDate, isSameDay, isOverdue } from '../lib/storage';

interface PlannerViewProps {
  tasks: Task[];
}

const categoryIcons: Record<string, typeof FileText> = {
  Assignment: FileText,
  'Exam Preparation': GraduationCap,
  Revision: BookOpen,
  Personal: Coffee,
};

export default function PlannerView({ tasks }: PlannerViewProps) {
  const upcoming = tasks
    .filter((t) => !t.completed)
    .sort((a, b) => a.dueDate.localeCompare(b.dueDate));

  // Group by date
  const groups: Record<string, Task[]> = {};
  for (const t of upcoming) {
    if (!groups[t.dueDate]) groups[t.dueDate] = [];
    groups[t.dueDate].push(t);
  }

  const sortedDates = Object.keys(groups).sort((a, b) => a.localeCompare(b));

  return (
    <div className="mx-auto max-w-3xl">
      <div className="mb-6 animate-fade-in">
        <h1 className="text-2xl font-bold text-navy-900 dark:text-white">Study Planner</h1>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          Upcoming tasks sorted by due date. Stay ahead of your deadlines.
        </p>
      </div>

      {upcoming.length === 0 ? (
        <div className="animate-fade-in rounded-2xl border border-dashed border-gray-300 bg-white p-10 text-center dark:border-navy-600 dark:bg-navy-800">
          <CalendarClock size={36} className="mx-auto text-gray-300 dark:text-navy-500" />
          <p className="mt-3 text-sm font-medium text-gray-500 dark:text-gray-400">
            No upcoming tasks. You're all caught up!
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          {sortedDates.map((date) => {
            const isToday = isSameDay(date);
            const overdue = date < new Date().toISOString().split('T')[0];
            return (
              <div key={date} className="animate-slide-up">
                <div className="mb-3 flex items-center gap-2">
                  <h3
                    className={`text-sm font-bold ${
                      overdue
                        ? 'text-red-500'
                        : isToday
                          ? 'text-navy-700 dark:text-lavender-400'
                          : 'text-navy-800 dark:text-gray-200'
                    }`}
                  >
                    {isToday ? 'Today' : formatDate(date)}
                  </h3>
                  {overdue && (
                    <span className="rounded-full bg-red-100 px-2 py-0.5 text-xs font-medium text-red-600 dark:bg-red-900/40 dark:text-red-300">
                      Overdue
                    </span>
                  )}
                  {isToday && !overdue && (
                    <span className="rounded-full bg-lavender-100 px-2 py-0.5 text-xs font-medium text-lavender-700 dark:bg-lavender-900/40 dark:text-lavender-300">
                      Due Today
                    </span>
                  )}
                  <div className="h-px flex-1 bg-gray-200 dark:bg-navy-700" />
                </div>

                <div className="space-y-2">
                  {groups[date].map((task) => {
                    const Icon = categoryIcons[task.category] ?? FileText;
                    return (
                      <div
                        key={task.id}
                        className="flex items-center gap-3 rounded-xl border border-gray-200 bg-white p-3 transition-shadow hover:shadow-md dark:border-navy-700 dark:bg-navy-800"
                      >
                        <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg bg-navy-100 text-navy-700 dark:bg-navy-700 dark:text-navy-200">
                          <Icon size={16} />
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="truncate text-sm font-medium text-navy-900 dark:text-gray-100">
                            {task.title}
                          </p>
                          <p className="mt-0.5 text-xs text-gray-400 dark:text-gray-500">
                            {task.category}
                          </p>
                        </div>
                        <span
                          className={`flex-shrink-0 rounded-full px-2 py-0.5 text-xs font-medium ${
                            task.priority === 'High'
                              ? 'bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-300'
                              : task.priority === 'Medium'
                                ? 'bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300'
                                : 'bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-300'
                          }`}
                        >
                          {task.priority}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
