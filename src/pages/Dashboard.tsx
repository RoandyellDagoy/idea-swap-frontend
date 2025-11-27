import { useState, useEffect } from 'react';
import { Search, Plus, ArrowLeft , Trash2, Loader, Edit2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useIdeas } from '../context/IdeasContext';
import { IdeaService } from '../services/ideaServices';
import type { Idea, IdeaFormData } from '../types/Idea';
import CreateIdeaModal from '../components/CreateIdeaModal';
import EditIdeaModal from '../components/EditIdeaModal';
import IdeaDetailsModal from '../components/IdeaDetailsModal';
import { Categories } from '../types/Idea';
import { AnimatePresence, motion } from 'framer-motion';

// Helper function to generate avatar color and initials
const getAvatarInitials = (name: string): { initials: string; bgColor: string } => {
  const cleanName = name?.trim() || 'Anonymous';
  const names = cleanName.split(' ');
  
  // Get first letter of first name and first letter of last name (if exists)
  const initials = names.length > 1 
    ? names[0][0] + names[names.length - 1][0]
    : names[0]?.[0] || 'U';
  
  // Generate a consistent color based on name
  let hash = 0;
  for (let i = 0; i < cleanName.length; i++) {
    hash = cleanName.charCodeAt(i) + ((hash << 5) - hash);
  }
  
  const colors = [
    'bg-red-500',
    'bg-orange-500',
    'bg-yellow-500',
    'bg-green-500',
    'bg-blue-500',
    'bg-indigo-500',
    'bg-purple-500',
    'bg-pink-500',
  ];
  
  const bgColor = colors[Math.abs(hash) % colors.length];
  return { initials: initials.toUpperCase(), bgColor };
};

export const Dashboard: React.FC = () => {
  const { ideas, setIdeas, loading, setLoading, setError } = useIdeas();
  const [filteredIdeas, setFilteredIdeas] = useState<Idea[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingIdea, setEditingIdea] = useState<Idea | null>(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [selectedIdea, setSelectedIdea] = useState<Idea | null>(null);

  const { signOut, user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    loadIdeas();
  }, []);

  useEffect(() => {
    filterIdeas();
  }, [ideas, searchQuery, selectedCategory]);

  const handleSignOut = async () =>{
    await signOut();
    navigate("/");
  }


  const loadIdeas = async () => {
    setLoading(true);
    try {
      const data = await IdeaService.getAll();
      // Use user_name from backend if available, otherwise use 'Anonymous'
      const enrichedData = data.map((idea: Idea) => ({
        ...idea,
        user_name: idea.user_name || 'Anonymous'
      }));
      setIdeas(enrichedData);
    } catch (error) {
      console.error('Error loading ideas:', error);
      setError('Failed to load ideas');
    } finally {
      setLoading(false);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
    },
  };

  const filterIdeas = () => {
    let filtered = ideas;
    if (selectedCategory !== 'All') {
      filtered = ideas.filter(idea => idea.category === selectedCategory);
    }
    if (searchQuery) {
      filtered = filtered.filter(idea =>
        idea.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        idea.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    setFilteredIdeas(filtered);
  };

  const handleAddNewIdea = async (idea: IdeaFormData) => {
    try {
      const userName = user?.user_metadata?.full_name || user?.email?.split('@')[0] || 'Anonymous';
      const res = await IdeaService.create({ 
        ...idea, 
        user_id: user?.id,
        user_name: userName 
      } as Idea);
      setIdeas([...ideas, res]);
      setShowCreateModal(false);
    } catch (error) {
      console.error("Failed to submit idea", error);
      setError('Failed to create idea');
    }
  }

  const handleDeleteIdea = async (ideaId: string) => {
    if (!window.confirm('Are you sure you want to delete this idea?')) {
      return;
    }
    try {
      await IdeaService.remove(ideaId);
      setIdeas(ideas.filter(idea => idea.id !== ideaId));
    } catch (error) {
      console.error("Failed to delete idea", error);
      setError('Failed to delete idea');
    }
  }

  const handleEditIdea = (idea: Idea) => {
    setEditingIdea(idea);
    setShowEditModal(true);
  }

  const handleUpdateIdea = async (formData: IdeaFormData) => {
    if (!editingIdea) return;
    try {
      const updatedIdea = await IdeaService.update(editingIdea.id!, formData);
      setIdeas(ideas.map(idea => idea.id === editingIdea.id ? updatedIdea : idea));
      setShowEditModal(false);
      setEditingIdea(null);
    } catch (error) {
      console.error("Failed to update idea", error);
      setError('Failed to update idea');
    }
  }

  const handleViewIdea = (idea: Idea) => {
    setSelectedIdea(idea);
    setShowDetailsModal(true);
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50">

      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Idea Dashboard</h1>
              <p className="text-sm sm:text-base text-gray-600 mt-1">Discover and share ideas with the community</p>
            </div>
            <div className='flex items-center gap-10'>
               <button
                onClick={() => setShowCreateModal(true)}
                className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg hover:shadow-lg transition font-medium flex items-center space-x-2"
              >
                <Plus className="w-5 h-5" />
                <span className="hidden sm:inline">Post Idea</span>
              </button>
               <button
                onClick={handleSignOut} 
                className="flex items-center gap-2 px-3 py-2 rounded-lg border hover:bg-gray-100 transition"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {/* Search and Filters */}
        <motion.div 
          className="bg-white rounded-xl shadow-md p-4 sm:p-6 mb-6 sm:mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Search Bar */}
          <div className="relative mb-4 sm:mb-6">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search ideas... "
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </div>

          {/* Category Pills */}
          <div className="flex flex-wrap gap-2 sm:gap-3 mb-4 sm:mb-6">
            {Categories.map((cat) => {
              const Icon = cat.icon;
              return (
                <button
                  key={cat.name}
                  onClick={() => setSelectedCategory(cat.name)}
                  className={`flex items-center space-x-2 px-3 sm:px-4 py-2 rounded-full font-medium transition ${
                    selectedCategory === cat.name
                      ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span className="text-sm">{cat.name}</span>
                </button>
              );
            })}
          </div>
        </motion.div>

        {/* Results Count */}
        <motion.div 
          className="mb-4 sm:mb-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <p className="text-gray-600 text-sm sm:text-base">
            Showing <span className="font-semibold text-gray-900">{filteredIdeas.length}</span> idea{filteredIdeas.length !== 1 && 's'}
          </p>
        </motion.div>

        {/* Idea Cards Grid */}
        <AnimatePresence mode="wait">
          {loading ? (
            <motion.div key="loader" className="flex items-center justify-center py-20">
              <Loader className="w-8 h-8 text-purple-600 animate-spin" />
            </motion.div>
          ) : filteredIdeas.length === 0 ? (
            <motion.div 
              key="no-ideas"
              className="text-center py-20"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.5 }}
            >
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No ideas found</h3>
              <p className="text-gray-600">Try adjusting your filters or search query</p>
            </motion.div>
          ) : (
            <motion.div 
              key="ideas-grid"
              className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {Array.isArray(filteredIdeas)&& filteredIdeas.map((idea) => (
                <motion.div
                  key={idea.id}
                  variants={itemVariants}
                  className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 hover:scale-105 flex flex-col h-full"
                >
                  {/* Card Header */}
                  <div className="bg-gradient-to-r from-purple-500 to-blue-500 p-4 text-white flex-shrink-0">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center space-x-3 flex-1 min-w-0">
                        <div className={`w-10 h-10 ${getAvatarInitials(idea.user_name || 'Anonymous').bgColor} rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0`}>
                          {getAvatarInitials(idea.user_name || 'Anonymous').initials}
                        </div>
                        <div className="min-w-0 flex-1">
                          <h3 className="font-semibold text-sm truncate">{idea.user_name || 'Anonymous'}</h3>
                        </div>
                      </div>
                      {idea.user_id === user?.id && (
                        <div className="flex gap-2 flex-shrink-0">
                          <button
                            onClick={() => handleEditIdea(idea)}
                            className="p-1 hover:bg-white/20 rounded transition"
                            title="Edit idea"
                          >
                            <Edit2 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDeleteIdea(idea.id!)}
                            className="p-1 hover:bg-white/20 rounded transition"
                            title="Delete idea"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Card Body */}
                  <div className="p-4 sm:p-6 flex flex-col flex-1">
                    <h4 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2">{idea.title}</h4>
                    <p className="text-sm text-gray-600 mb-4 line-clamp-3 flex-1">{idea.description}</p>

                    {/* Action Button */}
                    <button
                      onClick={() => handleViewIdea(idea)}
                      className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white py-2 rounded-lg hover:shadow-lg transition font-medium flex-shrink-0 mt-auto"
                    >
                      View
                    </button>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Create Idea Modal */}
      {showCreateModal && (
        <CreateIdeaModal
          onClose={() => setShowCreateModal(false)}
          onCreate={handleAddNewIdea}
        />
      )}

      {/* Edit Idea Modal */}
      {showEditModal && editingIdea && (
        <EditIdeaModal
          idea={editingIdea}
          onClose={() => {
            setShowEditModal(false);
            setEditingIdea(null);
          }}
          onUpdate={handleUpdateIdea}
        />
      )}

      {/* Idea Details Modal */}
      {showDetailsModal && selectedIdea && (
        <IdeaDetailsModal
          idea={selectedIdea}
          onClose={() => {
            setShowDetailsModal(false);
            setSelectedIdea(null);
          }}
        />
      )}
      
    </div>
  );
};

  