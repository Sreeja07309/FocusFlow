import type { Task } from '../types';

const STORAGE_KEY = 'focusflow-tasks';
const THEME_KEY = 'focusflow-theme';
const VISITED_KEY = 'focusflow-visited';

export const SAMPLE_TASKS: Task[] = [
  {
    id: 'sample-1',
    title: 'Complete Linear Algebra Problem Set 5',
    category: 'Assignment',
    dueDate: getRelativeDate(1),
    priority: 'High',
    completed: false,
    createdAt: new Date().toISOString(),
  },
  {
    id: 'sample-2',
    title: 'Review Data Structures – Trees & Graphs',
    category: 'Revision',
    dueDate: getRelativeDate(0),
    priority: 'Medium',
    completed: false,
    createdAt: new Date().toISOString(),
  },
  {
    id: 'sample-3',
    title: 'Prepare for Microeconomics Midterm Exam',
    category: 'Exam Preparation',
    dueDate: getRelativeDate(3),
    priority: 'High',
    completed: false,
    createdAt: new Date().toISOString(),
  },
  {
    id: 'sample-4',
    title: 'Read Chapter 7 – Organic Chemistry',
    category: 'Revision',
    dueDate: getRelativeDate(2),
    priority: 'Medium',
    completed: false,
    createdAt: new Date().toISOString(),
  },
  {
    id: 'sample-5',
    title: 'Buy stationery for the semester',
    category: 'Personal',
    dueDate: getRelativeDate(5),
    priority: 'Low',
    completed: false,
    createdAt: new Date().toISOString(),
  },
  {
    id: 'sample-6',
    title: 'Submit English Essay – First Draft',
    category: 'Assignment',
    dueDate: getRelativeDate(-1),
    priority: 'Medium',
    completed: true,
    createdAt: new Date().toISOString(),
  },
];

function getRelativeDate(daysFromNow: number): string {
  const d = new Date();
  d.setDate(d.getDate() + daysFromNow);
  return d.toISOString().split('T')[0];
}

export function loadTasks(): Task[] | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as Task[];
  } catch {
    return null;
  }
}

export function saveTasks(tasks: Task[]): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  } catch {
    // ignore quota errors
  }
}

export function hasVisited(): boolean {
  return localStorage.getItem(VISITED_KEY) === 'true';
}

export function markVisited(): void {
  localStorage.setItem(VISITED_KEY, 'true');
}

export function loadTheme(): 'light' | 'dark' {
  const stored = localStorage.getItem(THEME_KEY);
  if (stored === 'light' || stored === 'dark') return stored;
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

export function saveTheme(theme: 'light' | 'dark'): void {
  localStorage.setItem(THEME_KEY, theme);
}

export function isSameDay(dateStr: string): boolean {
  const today = new Date().toISOString().split('T')[0];
  return dateStr === today;
}

export function formatDate(dateStr: string): string {
  const date = new Date(dateStr + 'T00:00:00');
  return date.toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
  });
}

export function formatFullDate(date: Date): string {
  return date.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export function isOverdue(dateStr: string, completed: boolean): boolean {
  if (completed) return false;
  const today = new Date().toISOString().split('T')[0];
  return dateStr < today;
}
