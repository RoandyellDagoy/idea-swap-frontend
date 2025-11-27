import { X } from "lucide-react";
import type { Idea } from "../types/Idea";
import { Categories } from "../types/Idea";
import { motion } from "framer-motion";

const IdeaDetailsModal: React.FC<{
  idea: Idea;
  onClose: () => void;
}> = ({ idea, onClose }) => {
  const category = Categories.find((c) => c.name === idea.category);
  const CategoryIcon = category?.icon;

  return (
    <motion.div 
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div 
        className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        transition={{ duration: 0.3 }}
      >
        {/* Header with gradient */}
        <div className="bg-gradient-to-r from-purple-500 to-blue-500 p-6 text-white sticky top-0 flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-3">
              {CategoryIcon && <CategoryIcon className="w-5 h-5" />}
              <span className="text-sm font-semibold bg-white/20 px-3 py-1 rounded-full">
                {idea.category}
              </span>
            </div>
            <h2 className="text-3xl font-bold">{idea.title}</h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-white/20 rounded-lg transition flex-shrink-0"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        <div className="p-8 space-y-8">
          {/* Description Section */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Description
            </h3>
            <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
              {idea.description}
            </p>
          </div>

          {/* Details Section */}
          <div className="grid grid-cols-2 gap-6 pt-4 border-t border-gray-200">
            <div>
              <p className="text-sm font-medium text-gray-600 mb-2">
                Category
              </p>
              <p className="text-base text-gray-900 font-semibold">
                {idea.category}
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4 pt-4">
            <button
              onClick={onClose}
              className="flex-1 px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg hover:shadow-lg transition font-medium"
            >
              Close
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default IdeaDetailsModal;
