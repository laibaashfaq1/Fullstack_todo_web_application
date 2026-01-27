// components/TaskModal.tsx
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Task } from './TaskCard';

interface TaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (task: { title: string; description?: string }) => void;
  taskToEdit?: Task | null;
}

const TaskModal = ({ isOpen, onClose, onSave, taskToEdit }: TaskModalProps) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    if (taskToEdit) {
      setTitle(taskToEdit.title);
      setDescription(taskToEdit.description || '');
    } else {
      // Clear fields when adding new task
      setTitle('');
      setDescription('');
    }
  }, [taskToEdit, isOpen]); // Add isOpen to dependencies

  // Clear fields when modal closes
  useEffect(() => {
    if (!isOpen) {
      setTitle('');
      setDescription('');
    }
  }, [isOpen]);

  const handleSave = () => {
    if (!title.trim()) {
      // Basic validation
      return;
    }
    onSave({ title: title.trim(), description: description.trim() });
    // Clear fields after save
    setTitle('');
    setDescription('');
    onClose();
  };

  const handleClose = () => {
    // Clear fields when closing
    setTitle('');
    setDescription('');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/20 backdrop-blur-sm z-50 flex justify-center items-center p-4" onClick={handleClose}>
      <motion.div
        initial={{ y: -50, opacity: 0, scale: 0.95 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        exit={{ y: 50, opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.2 }}
        onClick={(e) => e.stopPropagation()}
        className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl p-6 rounded-2xl shadow-2xl w-full max-w-md border border-teal-200/30 dark:border-teal-700/30"
      >
        <h2 className="text-2xl font-bold mb-6 bg-gradient-to-r from-teal-500 to-cyan-500 bg-clip-text text-transparent">
          {taskToEdit ? 'Edit Task' : 'Add Task'}
        </h2>
        <input
          type="text"
          placeholder="Task Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-3 mb-4 border border-gray-300/50 dark:border-gray-600/50 rounded-lg bg-white/80 dark:bg-gray-700/50 backdrop-blur-sm text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:ring-2 focus:ring-teal-400 focus:border-teal-400 dark:focus:border-teal-500 transition-all outline-none"
          required
          autoFocus
        />
        <textarea
          placeholder="Description (optional)"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full p-3 mb-6 border border-gray-300/50 dark:border-gray-600/50 rounded-lg bg-white/80 dark:bg-gray-700/50 backdrop-blur-sm text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:ring-2 focus:ring-teal-400 focus:border-teal-400 dark:focus:border-teal-500 transition-all resize-none outline-none"
          rows={4}
        />
        <div className="flex justify-end space-x-3">
          <button 
            onClick={handleClose} 
            className="px-5 py-2.5 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700/50 transition-colors duration-200 font-medium"
          >
            Cancel
          </button>
          <button 
            onClick={handleSave} 
            className="px-5 py-2.5 rounded-lg bg-gradient-to-r from-teal-500 to-cyan-600 hover:from-teal-600 hover:to-cyan-700 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105"
          >
            Save
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default TaskModal;