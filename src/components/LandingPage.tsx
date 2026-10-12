import { useRef } from 'react';
import {
  ArrowRight,
  ListTodo,
  TrendingUp,
  CalendarClock,
  Check,
  FileText,
  GraduationCap,
  BookOpen,
  Coffee,
  Moon,
  Sun,
} from 'lucide-react';
import Logo from './Logo';
import type { Task } from '../types';
import { PRIORITY_COLORS, CATEGORY_COLORS } from '../types';
import { formatDate } from '../lib/storage';

interface LandingPageProps {
  onGetStarted: () => void;
  theme: 'light' | 'dark';
  onToggleTheme: () => void;
}

const previewTasks: Task[] = [
  {
    id: 'p1',
    title: 'Complete Linear Algebra Problem Set 5',
    category: 'Assignment',
    dueDate: new Date(Date.now() + 86400000).toISOString().split('T')[0],
    priority: 'High',
    completed: false,
    createdAt: new Date().toISOString(),
  },
  {
    id: 'p2',
    title: 'Review Data Structures – Trees & Graphs',
    category: 'Revision',
    dueDate: new Date().toISOString().split('T')[0],
    priority: 'Medium',
    completed: false,
    createdAt: new Date().toISOString(),
  },
  {
    id: 'p3',
    title: 'Submit English Essay – First Draft',
    category: 'Assignment',
    dueDate: new Date(Date.now() - 86400000).toISOString().split('T')[0],
    priority: 'Medium',
    completed: true,
    createdAt: new Date().toISOString(),
  },
];

const categoryIcons: Record<string, typeof FileText> = {
  Assignment: FileText,
  'Exam Preparation': GraduationCap,
  Revision: BookOpen,
  Personal: Coffee,
};

export default function LandingPage({ onGetStarted, theme, onToggleTheme }: LandingPageProps) {
  const featuresRef = useRef<HTMLDivElement>(null);

  const scrollToFeatures = () => {
    featuresRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-white dark:bg-navy-950">
      {/* Nav */}
      <nav className="sticky top-0 z-40 border-b border-gray-100 bg-white/80 backdrop-blur-lg dark:border-navy-800 dark:bg-navy-950/80">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6">
          <Logo />
          <div className="flex items-center gap-1 sm:gap-4">
            <button
              onClick={scrollToFeatures}
              className="hidden text-sm font-medium text-gray-600 transition-colors hover:text-navy-700 dark:text-gray-300 dark:hover:text-white sm:block"
            >
              Features
            </button>
            <button
              onClick={onGetStarted}
              className="hidden text-sm font-medium text-gray-600 transition-colors hover:text-navy-700 dark:text-gray-300 dark:hover:text-white sm:block"
            >
              Get Started
            </button>
            <button
              onClick={onToggleTheme}
              className="rounded-lg p-2 text-gray-500 transition-colors hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-navy-800"
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
            </button>
            <button
              onClick={onGetStarted}
              className="rounded-xl bg-navy-700 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-navy-800 dark:bg-lavender-600 dark:hover:bg-lavender-700"
            >
              Get Started
            </button>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -top-24 -right-24 h-96 w-96 rounded-full bg-lavender-200/40 blur-3xl dark:bg-lavender-800/20" />
          <div className="absolute -bottom-32 -left-24 h-80 w-80 rounded-full bg-blue-100/50 blur-3xl dark:bg-navy-800/30" />
        </div>

        <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
          <div className="grid items-center gap-12 py-16 md:grid-cols-2 md:py-24">
            {/* Left */}
            <div className="animate-slide-up">
              <span className="inline-flex items-center gap-2 rounded-full bg-lavender-100 px-3 py-1 text-sm font-medium text-lavender-700 dark:bg-lavender-900/40 dark:text-lavender-300">
                <span className="h-2 w-2 rounded-full bg-lavender-500" />
                Student Task Planner
              </span>
              <h1 className="mt-5 text-4xl font-bold leading-tight tracking-tight text-navy-900 dark:text-white sm:text-5xl">
                Stay Focused. <br />
                Get Things Done.
              </h1>
              <p className="mt-5 max-w-md text-base leading-relaxed text-gray-600 dark:text-gray-400 sm:text-lg">
                Organize your studies, manage your daily tasks, and make every study
                session productive with FocusFlow.
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-4">
                <button
                  onClick={onGetStarted}
                  className="group inline-flex items-center gap-2 rounded-xl bg-navy-700 px-6 py-3 text-base font-semibold text-white shadow-lg shadow-navy-700/20 transition-all hover:bg-navy-800 hover:shadow-xl dark:bg-lavender-600 dark:hover:bg-lavender-700"
                >
                  Get Started
                  <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
                </button>
                <button
                  onClick={scrollToFeatures}
                  className="text-base font-medium text-gray-600 transition-colors hover:text-navy-700 dark:text-gray-400 dark:hover:text-white"
                >
                  Learn more
                </button>
              </div>
            </div>

            {/* Right – Dashboard Preview */}
            <div className="animate-slide-up" style={{ animationDelay: '0.1s' }}>
              <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-2xl shadow-navy-900/10 dark:border-navy-700 dark:bg-navy-800">
                <div className="mb-4 flex items-center justify-between">
                  <div>
                    <p className="text-xs font-medium text-gray-400 dark:text-gray-500">
                      Today's Study Plan
                    </p>
                    <p className="text-sm font-bold text-navy-900 dark:text-white">
                      Welcome back, Student!
                    </p>
                  </div>
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-lavender-100 text-lavender-700 dark:bg-lavender-900/40 dark:text-lavender-300">
                    <GraduationCap size={20} />
                  </div>
                </div>

                <div className="mb-4 grid grid-cols-3 gap-2">
                  <div className="rounded-xl bg-gray-50 p-3 dark:bg-navy-900">
                    <p className="text-2xl font-bold text-navy-900 dark:text-white">5</p>
                    <p className="text-xs text-gray-400 dark:text-gray-500">Total</p>
                  </div>
                  <div className="rounded-xl bg-green-50 p-3 dark:bg-green-900/20">
                    <p className="text-2xl font-bold text-green-600 dark:text-green-400">1</p>
                    <p className="text-xs text-gray-400 dark:text-gray-500">Done</p>
                  </div>
                  <div className="rounded-xl bg-amber-50 p-3 dark:bg-amber-900/20">
                    <p className="text-2xl font-bold text-amber-600 dark:text-amber-400">4</p>
                    <p className="text-xs text-gray-400 dark:text-gray-500">Pending</p>
                  </div>
                </div>

                <div className="space-y-2">
                  {previewTasks.map((task) => {
                    const Icon = categoryIcons[task.category] ?? FileText;
                    return (
                      <div
                        key={task.id}
                        className="flex items-center gap-3 rounded-xl border border-gray-100 bg-white p-3 dark:border-navy-700 dark:bg-navy-900"
                      >
                        <div
                          className={`flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-md border-2 ${
                            task.completed
                              ? 'border-navy-700 bg-navy-700 text-white'
                              : 'border-gray-300 dark:border-navy-500'
                          }`}
                        >
                          {task.completed && <Check size={12} strokeWidth={3} />}
                        </div>
                        <div className="min-w-0 flex-1">
                          <p
                            className={`truncate text-xs font-medium ${
                              task.completed
                                ? 'text-gray-400 line-through dark:text-gray-600'
                                : 'text-navy-900 dark:text-gray-200'
                            }`}
                          >
                            {task.title}
                          </p>
                          <div className="mt-1 flex items-center gap-1.5">
                            <span
                              className={`inline-flex items-center gap-0.5 rounded-full px-1.5 py-0.5 text-[10px] font-medium ${CATEGORY_COLORS[task.category]}`}
                            >
                              <Icon size={10} />
                              {task.category}
                            </span>
                            <span
                              className={`rounded-full px-1.5 py-0.5 text-[10px] font-medium ${PRIORITY_COLORS[task.priority]}`}
                            >
                              {task.priority}
                            </span>
                            <span className="text-[10px] text-gray-400 dark:text-gray-500">
                              {formatDate(task.dueDate)}
                            </span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Progress bar */}
                <div className="mt-4">
                  <div className="mb-1 flex items-center justify-between text-xs">
                    <span className="font-medium text-gray-500 dark:text-gray-400">
                      Completion
                    </span>
                    <span className="font-semibold text-navy-700 dark:text-lavender-400">20%</span>
                  </div>
                  <div className="h-2 overflow-hidden rounded-full bg-gray-100 dark:bg-navy-700">
                    <div className="h-full rounded-full bg-gradient-to-r from-navy-700 to-lavender-500" style={{ width: '20%' }} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section ref={featuresRef} className="border-t border-gray-100 py-16 dark:border-navy-800 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-bold tracking-tight text-navy-900 dark:text-white">
              Everything you need to stay on track
            </h2>
            <p className="mt-3 text-gray-600 dark:text-gray-400">
              Simple tools designed for students, by students.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            <FeatureCard
              icon={<ListTodo size={24} />}
              title="Organize Tasks"
              desc="Create tasks with categories, priorities, and due dates. Keep everything organized in one place."
            />
            <FeatureCard
              icon={<TrendingUp size={24} />}
              title="Track Progress"
              desc="See your completion rate at a glance. Summary cards and progress bars keep you motivated."
            />
            <FeatureCard
              icon={<CalendarClock size={24} />}
              title="Meet Deadlines"
              desc="Never miss a due date again. Overdue tasks are highlighted, and the study planner sorts by due date."
            />
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-gray-100 py-16 dark:border-navy-800">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6">
          <div className="rounded-3xl bg-gradient-to-br from-navy-800 to-navy-900 p-10 dark:from-navy-800 dark:to-navy-950 sm:p-14">
            <h2 className="text-3xl font-bold text-white sm:text-4xl">
              Ready to take control of your studies?
            </h2>
            <p className="mt-4 text-navy-200">
              Start managing your tasks today — no sign-up required.
            </p>
            <button
              onClick={onGetStarted}
              className="group mt-8 inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3 text-base font-semibold text-navy-800 shadow-lg transition-all hover:shadow-xl"
            >
              Open Dashboard
              <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-100 py-8 dark:border-navy-800">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-4 sm:flex-row sm:px-6">
          <Logo size="sm" />
          <p className="text-sm text-gray-400 dark:text-gray-500">
            FocusFlow — Student Task Planner
          </p>
        </div>
      </footer>
    </div>
  );
}

function FeatureCard({
  icon,
  title,
  desc,
}: {
  icon: React.ReactNode;
  title: string;
  desc: string;
}) {
  return (
    <div className="group rounded-2xl border border-gray-200 bg-white p-6 transition-all hover:shadow-lg dark:border-navy-700 dark:bg-navy-800">
      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-lavender-100 text-lavender-700 transition-colors group-hover:bg-lavender-600 group-hover:text-white dark:bg-lavender-900/40 dark:text-lavender-300">
        {icon}
      </div>
      <h3 className="mb-2 text-lg font-bold text-navy-900 dark:text-white">{title}</h3>
      <p className="text-sm leading-relaxed text-gray-600 dark:text-gray-400">{desc}</p>
    </div>
  );
}
