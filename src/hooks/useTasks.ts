import { useState, useEffect, useCallback } from 'react';
import type { Task } from '../types';
import {
  loadTasks,
  saveTasks,
  SAMPLE_TASKS,
  hasVisited,
  markVisited,
} from '../lib/storage';

function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
}

export function useTasks() {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    const stored = loadTasks();
    if (stored && stored.length >= 0) {
      setTasks(stored);
    } else if (!hasVisited()) {
      setTasks(SAMPLE_TASKS);
      markVisited();
    } else {
      setTasks([]);
    }
  }, []);

  useEffect(() => {
    if (tasks.length > 0) {
      saveTasks(tasks);
    }
  }, [tasks]);

  const addTask = useCallback(
    (data: Omit<Task, 'id' | 'completed' | 'createdAt'>) => {
      const newTask: Task = {
        ...data,
        id: generateId(),
        completed: false,
        createdAt: new Date().toISOString(),
      };
      setTasks((prev) => [newTask, ...prev]);
    },
    [],
  );

  const toggleTask = useCallback((id: string) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t)),
    );
  }, []);

  const deleteTask = useCallback((id: string) => {
    setTasks((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const resetTasks = useCallback(() => {
    setTasks(SAMPLE_TASKS);
  }, []);

  return { tasks, addTask, toggleTask, deleteTask, resetTasks };
}
