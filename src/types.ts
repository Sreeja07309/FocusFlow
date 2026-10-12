export type Priority = 'Low' | 'Medium' | 'High';
export type Category = 'Assignment' | 'Exam Preparation' | 'Revision' | 'Personal';

export interface Task {
  id: string;
  title: string;
  category: Category;
  dueDate: string;
  priority: Priority;
  completed: boolean;
  createdAt: string;
}

export type TaskFilter = 'all' | 'pending' | 'completed' | 'due-today';

export const CATEGORIES: Category[] = [
  'Assignment',
  'Exam Preparation',
  'Revision',
  'Personal',
];

export const PRIORITIES: Priority[] = ['Low', 'Medium', 'High'];

export const PRIORITY_COLORS: Record<Priority, string> = {
  Low: 'bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-300',
  Medium: 'bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300',
  High: 'bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-300',
};

export const CATEGORY_COLORS: Record<Category, string> = {
  'Assignment': 'bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300',
  'Exam Preparation': 'bg-lavender-100 text-lavender-700 dark:bg-lavender-900/40 dark:text-lavender-300',
  'Revision': 'bg-cyan-100 text-cyan-700 dark:bg-cyan-900/40 dark:text-cyan-300',
  'Personal': 'bg-pink-100 text-pink-700 dark:bg-pink-900/40 dark:text-pink-300',
};

export const CATEGORY_ICONS: Record<Category, string> = {
  'Assignment': 'FileText',
  'Exam Preparation': 'GraduationCap',
  'Revision': 'BookOpen',
  'Personal': 'Coffee',
};
