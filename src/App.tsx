import React, { useEffect, useState } from 'react';
import { Users, Star, Menu, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import { StatsService } from './services/statsService';
import { IdeaService } from './services/ideaServices';
import type { Idea } from './types/Idea';
import { motion } from 'framer-motion';

function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const [stats, setStats] = useState({ totalUsers: 0, totalIdeas: 0 });
  const [featuredIdea, setFeaturedIdea] = useState<Idea | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const statsData = await StatsService.getStats();
        setStats(statsData);
      } catch (error) {
        console.error("Error fetching stats:", error);
      } finally {
        setLoading(false);
      }
    };

    const fetchIdeas = async () => {
      try {
        const ideasData = await IdeaService.getAll();
        if (ideasData.length > 0) {
          const randomIndex = Math.floor(Math.random() * ideasData.length);
          setFeaturedIdea(ideasData[randomIndex]);
        }
      } catch (error) {
        console.error("Error fetching ideas:", error);
      }
    };

    fetchStats();
    fetchIdeas();
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
  };

  const cardVariants = {
    hidden: { scale: 0.95, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
   <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50">
      {/* Navigation */}
      <motion.nav 
        className="bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-purple-600 to-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">IS</span>
              </div>
              <span className="text-xl font-bold text-gray-900">IdeaSwap</span>
            </div>
          
            <div className="hidden md:flex items-center space-x-4">
              <button className="text-gray-700 hover:text-purple-600 transition font-medium">
                <Link to="/signin">
                  Sign In
                </Link>
              </button>
              <button className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-2 rounded-lg hover:shadow-lg transition font-medium">
                <Link to="/signup">
                 Get Started
                </Link>
              </button>
            </div>
            <button 
              className="md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <motion.div 
              className="md:hidden py-4 space-y-4"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
            >
              <button 
              className="w-full text-center text-gray-700 hover:text-purple-600 transition font-medium">
                <Link to="/signin">
                  Sign In
                </Link>
              </button>
              <button className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-2 rounded-lg hover:shadow-lg transition font-medium">
               <Link to="/signup">
                 Get Started
                </Link>
              </button>
            </motion.div>
          )}
        </div>
      </motion.nav>

      {/* Hero Section */}
      <section className="min-h-72 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 sm:pt-16 lg:pt-20 pb-12 sm:pb-16">
        <motion.div 
          className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center mt-2"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div className="text-center lg:text-left" variants={itemVariants}>
            <motion.div 
              className="inline-flex items-center space-x-2 bg-purple-100 text-purple-700 px-4 py-2 rounded-full text-sm font-medium mb-6"
              variants={itemVariants}
            >
              <Star className="w-4 h-4 fill-current" />
              <span className="text-xs sm:text-sm">Join {loading ? '...' : stats.totalUsers}+ idea enthusiasts</span>
            </motion.div>
            <motion.h1 
              className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight"
              variants={itemVariants}
            >
              Exchange Ideas,
              <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent"> Grow Together</span>
            </motion.h1>
            <motion.p 
              className="text-lg sm:text-xl text-gray-600 mb-8 leading-relaxed"
              variants={itemVariants}
            >
             Post ideas and let people know what they do not know and learn from other people things you do not know. No money, just ideas.
            </motion.p>
           
            <motion.div 
              className="flex items-center justify-center lg:justify-start space-x-4 sm:space-x-8 mt-8"
              variants={itemVariants}
            >
              <div>
                <div className="text-2xl sm:text-3xl font-bold text-gray-900">{loading ? '...' : stats.totalUsers}+</div>
                <div className="text-xs sm:text-sm text-gray-600">Active Users</div>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-bold text-gray-900">{loading ? '...' : stats.totalIdeas}+</div>
                <div className="text-xs sm:text-sm text-gray-600">Ideas Exchanged</div>
              </div>
            </motion.div>
          </motion.div>
          <motion.div className="relative mt-8 lg:mt-0" variants={cardVariants}>
            <div className="bg-gradient-to-br from-purple-600 to-blue-600 rounded-2xl p-4 sm:p-8 shadow-2xl transform hover:rotate-0 transition duration-500 hover:scale-105">
              <div className="tilt-holder bg-white rounded-xl p-4 sm:p-6 space-y-4">
                {loading || !featuredIdea ? (
                  <div className="flex items-center justify-center h-40">
                    <p className="text-gray-600">Loading featured idea...</p>
                  </div>
                ) : (
                  <>
                    <div className="flex items-center space-x-4">
                      <div className="w-10 h-10 sm:w-12 sm:h-12 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                        <Users className="w-5 h-5 sm:w-6 sm:h-6 text-purple-600" />
                      </div>
                      <div>
                        <div className="font-semibold text-gray-900 text-sm sm:text-base">{featuredIdea.title}</div>
                        <div className="text-xs sm:text-sm text-gray-600">Category: {featuredIdea.category}</div>
                      </div>
                    </div>
                    <div className="border-t border-gray-200 pt-4">
                      <div className="text-xs sm:text-sm text-gray-600 mb-2">Description:</div>
                      <p className="text-sm text-gray-800">{featuredIdea.description}</p>
                    </div>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>
      </section>

      

      {/* Why Use IdeaSwap Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
        <motion.div 
          className="text-center mb-12 sm:mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Why Use IdeaSwap?</h2>
          <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto px-4">
            Discover the benefits that make IdeaSwap the best platform for idea exchange
          </p>
        </motion.div>
        <motion.div 
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {/* Benefit Card 1 */}
          <motion.div 
            className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-6 sm:p-8 border border-purple-200 hover:shadow-xl transition-all duration-300 hover:scale-105"
            variants={itemVariants}
          >
            <div className="w-12 h-12 sm:w-14 sm:h-14 bg-white rounded-lg flex items-center justify-center mb-4 sm:mb-6 shadow-md">
              <span className="text-2xl sm:text-3xl">💰</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3 sm:mb-4">100% Free</h3>
            <p className="text-gray-700 text-sm sm:text-base">
              No subscription fees or hidden costs. Exchange ideas directly without any monetary transactions.
            </p>
          </motion.div>


          {/* Benefit Card 3 */}
          <motion.div 
            className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-6 sm:p-8 border border-green-200 hover:shadow-xl transition-all duration-300 hover:scale-105"
            variants={itemVariants}
          >
            <div className="w-12 h-12 sm:w-14 sm:h-14 bg-white rounded-lg flex items-center justify-center mb-4 sm:mb-6 shadow-md">
              <span className="text-2xl sm:text-3xl">🤝</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3 sm:mb-4">Just Share</h3>
            <p className="text-gray-700 text-sm sm:text-base">
              Share your ideas or knowledge openly. Contribute to the community and let others benefit from what you know, simple and meaningful.
            </p>
          </motion.div>

          {/* Benefit Card 4 */}
          <motion.div 
            className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl p-6 sm:p-8 border border-orange-200 hover:shadow-xl transition-all duration-300 hover:scale-105"
            variants={itemVariants}
          >
            <div className="w-12 h-12 sm:w-14 sm:h-14 bg-white rounded-lg flex items-center justify-center mb-4 sm:mb-6 shadow-md">
              <span className="text-2xl sm:text-3xl">🧠</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3 sm:mb-4">Learn Something</h3>
            <p className="text-gray-700 text-sm sm:text-base">
              Explore new ideas and learn from others at your own pace.
            </p>
          </motion.div>
        </motion.div>
      </section>

      
    </div>
  );
}

export default App
