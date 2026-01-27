// frontend/app/dashboard/tasks/page.tsx
'use client';

import { useState, useEffect, useMemo } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import toast from 'react-hot-toast';
import { Plus, Search, Filter } from 'lucide-react';
import TaskCard, { Task } from '../../../components/TaskCard';
import TaskModal from '../../../components/TaskModal';
import { getTasks, addTask, updateTask, deleteTask, toggleTaskCompleted } from '../../../lib/api';
import { getToken } from '@/lib/auth';
import Image from 'next/image';

type FilterStatus = 'all' | 'pending' | 'completed';

const TasksPage = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [taskToEdit, setTaskToEdit] = useState<Task | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState<FilterStatus>('all');

  useEffect(() => {
    const fetchTasks = async () => {
      const token = getToken();
      if (!token) {
        // This should be handled by the layout, but as a fallback:
        window.location.href = '/auth/login';
        return;
      }
      try {
        setIsLoading(true);
        const fetchedTasks = await getTasks(token);
        setTasks(fetchedTasks.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()));
      } catch (error) {
        toast.error('Failed to load tasks.');
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchTasks();
  }, []);

  const handleAddTask = async (taskData: { title: string; description?: string }) => {
    const token = getToken();
    if (!token) return;

    const promise = addTask(token, taskData);
    toast.promise(promise, {
      loading: 'Adding task...',
      success: (newTask) => {
        setTasks((prev) => [newTask, ...prev]);
        return 'Task added successfully!';
      },
      error: 'Failed to add task.',
    });
  };

  const handleUpdateTask = async (taskData: { title?: string; description?: string }) => {
    const token = getToken();
    if (!token || !taskToEdit) return;

    const promise = updateTask(token, taskToEdit.id, taskData);
    toast.promise(promise, {
      loading: 'Updating task...',
      success: (updatedTask) => {
        setTasks((prev) => prev.map((t) => (t.id === updatedTask.id ? updatedTask : t)));
        return 'Task updated successfully!';
      },
      error: 'Failed to update task.',
    });
    setTaskToEdit(null);
  };

  const handleDeleteTask = (id: number) => {
    if (!window.confirm('Are you sure you want to delete this task?')) return;
    
    const token = getToken();
    if (!token) return;

    const promise = deleteTask(token, id);
    toast.promise(promise, {
      loading: 'Deleting task...',
      success: () => {
        setTasks((prev) => prev.filter((t) => t.id !== id));
        return 'Task deleted successfully!';
      },
      error: 'Failed to delete task.',
    });
  };

  const handleToggleComplete = (id: number) => {
    const token = getToken();
    if (!token) return;

    const promise = toggleTaskCompleted(token, id);
    toast.promise(promise, {
      loading: 'Updating status...',
      success: (updatedTask) => {
        setTasks((prev) => prev.map((t) => (t.id === updatedTask.id ? updatedTask : t)));
        return 'Task status updated!';
      },
      error: (err) => err.message || 'Failed to update status.',
    });
  };

  const handleModalSave = (taskData: { title: string; description?: string }) => {
    if (taskToEdit) {
      handleUpdateTask(taskData);
    } else {
      handleAddTask(taskData);
    }
  };

  const openEditModal = (task: Task) => {
    setTaskToEdit(task);
    setIsModalOpen(true);
  };

  const openAddModal = () => {
    setTaskToEdit(null);
    setIsModalOpen(true);
  };
  
  const filteredTasks = useMemo(() => {
    return tasks
      .filter(task => {
        if (filterStatus === 'pending') return !task.completed;
        if (filterStatus === 'completed') return task.completed;
        return true;
      })
      .filter(task => 
        task.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
  }, [tasks, filterStatus, searchQuery]);

  const FilterButton = ({ status, label }: { status: FilterStatus; label: string }) => (
    <button
      onClick={() => setFilterStatus(status)}
      className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200
        ${filterStatus === status
          ? 'bg-gradient-to-r from-teal-500 to-cyan-500 text-white shadow-md'
          : 'bg-white/50 dark:bg-gray-800/50 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
        }`}
    >
      {label}
    </button>
  );

  return (
    <div className="w-full">
      <TaskModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleModalSave}
        taskToEdit={taskToEdit}
      />

      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
        <h2 className="text-3xl font-bold text-gray-800 dark:text-white">My Tasks</h2>
        
        {/* Search and Filters */}
        <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
          <div className="relative w-full md:w-auto">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search tasks..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 py-2 w-full md:w-64 rounded-lg bg-white/50 dark:bg-gray-800/50 border border-transparent focus:border-cyan-500 focus:ring-cyan-500 transition"
            />
          </div>
          <div className="flex items-center gap-2 p-1 rounded-lg bg-white/30 dark:bg-gray-800/30">
            <FilterButton status="all" label="All" />
            <FilterButton status="pending" label="Pending" />
            <FilterButton status="completed" label="Completed" />
          </div>
        </div>
      </div>
      
      {/* Content */}
      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="bg-white/20 dark:bg-gray-800/20 backdrop-blur-sm p-6 rounded-xl shadow-lg animate-pulse h-52">
              <div className="h-5 bg-gray-300 dark:bg-gray-700 rounded w-3/4 mb-4"></div>
              <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-full mb-2"></div>
              <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-5/6 mb-6"></div>
               <div className="h-3 bg-gray-300 dark:bg-gray-700 rounded w-1/2"></div>
            </div>
          ))}
        </div>
      ) : filteredTasks.length === 0 ? (
        <div className="text-center py-20 bg-white/20 dark:bg-gray-800/20 backdrop-blur-lg rounded-xl p-8 shadow-lg mt-8">
          <Image src="/file.svg" alt="No tasks found" width={100} height={100} className="mx-auto mb-6 invert dark:invert-0" />
          <h2 className="text-2xl font-semibold text-gray-700 dark:text-gray-300">
            {tasks.length === 0 ? "You have no tasks yet" : "No tasks match your search"}
          </h2>
          <p className="text-gray-500 dark:text-gray-400 mt-2">
            {tasks.length === 0 ? "Click the '+' button to get started." : "Try a different search or filter."}
          </p>
        </div>
      ) : (
        <AnimatePresence>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredTasks.map((task) => (
              <TaskCard
                key={task.id}
                task={task}
                onToggleComplete={handleToggleComplete}
                onDelete={handleDeleteTask}
                onEdit={openEditModal}
              />
            ))}
          </div>
        </AnimatePresence>
      )}

      {/* Floating Add Button */}
      <motion.button
        whileHover={{ scale: 1.1, rotate: 90 }}
        whileTap={{ scale: 0.9 }}
        onClick={openAddModal}
        className="fixed bottom-10 right-10 bg-gradient-to-r from-teal-500 to-cyan-600 text-white rounded-full p-4 shadow-2xl z-40 hover:from-teal-600 hover:to-cyan-700 transition-all duration-300"
        aria-label="Add new task"
      >
        <Plus size={24} />
      </motion.button>
    </div>
  );
};

export default TasksPage;
