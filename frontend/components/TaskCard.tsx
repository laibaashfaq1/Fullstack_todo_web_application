import { motion } from 'framer-motion';
import { format } from 'date-fns';
import { CheckCircle, Circle, Edit2, Trash2 } from 'lucide-react';

export interface Task {
  id: number;
  title: string;
  description?: string;
  completed: boolean;
  created_at: string;
  updated_at: string;
}

interface TaskCardProps {
  task: Task;
  onToggleComplete: (id: number) => void;
  onDelete: (id: number) => void;
  onEdit: (task: Task) => void;
}

const TaskCard = ({ task, onToggleComplete, onDelete, onEdit }: TaskCardProps) => {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      whileHover={{ y: -6 }}
      transition={{ duration: 0.25 }}
      className="
        relative flex flex-col h-full
        bg-white/60 dark:bg-gray-900/50
        backdrop-blur-xl
        rounded-2xl p-6
        border border-gray-200/40 dark:border-gray-700/40
        shadow-md hover:shadow-xl
        transition-all
      "
    >
      {/* STATUS BADGE */}
      <span
        className={`absolute top-4 right-4 text-xs font-medium px-3 py-1 rounded-full
          ${
            task.completed
              ? 'bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-300'
              : 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/40 dark:text-yellow-300'
          }
        `}
      >
        {task.completed ? 'Completed' : 'Pending'}
      </span>

      {/* TITLE + CHECK */}
      <div className="flex items-start gap-3 mb-3">
        <button
          onClick={() => onToggleComplete(task.id)}
          aria-label="Toggle task completion"
          className="mt-1 text-teal-500 hover:scale-110 transition-transform"
        >
          {task.completed ? (
            <CheckCircle className="w-6 h-6" />
          ) : (
            <Circle className="w-6 h-6" />
          )}
        </button>

        <h3
          className={`text-lg font-semibold leading-snug
            ${
              task.completed
                ? 'line-through text-gray-400 dark:text-gray-500'
                : 'text-gray-800 dark:text-white'
            }
          `}
        >
          {task.title}
        </h3>
      </div>

      {/* DESCRIPTION */}
      {task.description && (
        <p
          className={`text-sm mb-6
            ${
              task.completed
                ? 'line-through text-gray-400'
                : 'text-gray-600 dark:text-gray-300'
            }
          `}
        >
          {task.description}
        </p>
      )}

      {/* FOOTER */}
      <div className="mt-auto pt-4 border-t border-gray-200/40 dark:border-gray-700/40 flex items-center justify-between">
        <span className="text-xs text-gray-500 dark:text-gray-400">
          Created {format(new Date(task.created_at), 'MMM d, yyyy')}
        </span>

        <div className="flex items-center gap-3">
          <button
            onClick={() => onEdit(task)}
            aria-label="Edit task"
            className="p-2 rounded-lg text-blue-600 hover:bg-blue-100/60 dark:hover:bg-blue-900/30 transition"
          >
            <Edit2 size={16} />
          </button>

          <button
            onClick={() => onDelete(task.id)}
            aria-label="Delete task"
            className="p-2 rounded-lg text-red-600 hover:bg-red-100/60 dark:hover:bg-red-900/30 transition"
          >
            <Trash2 size={16} />
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default TaskCard;
