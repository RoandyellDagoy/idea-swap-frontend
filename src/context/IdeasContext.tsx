import { createContext, useState, useContext } from 'react';
import type { ReactNode } from 'react';
import type { Idea } from '../types/Idea';

// 1. DEFINE THE TYPES
// The shape of the context value
interface IdeasContextType {
  ideas: Idea[];
  loading: boolean;
  error: string | null;
  setIdeas: (ideas: Idea[]) => void;
  addIdea: (idea: Idea) => void;
  updateIdea: (idea: Idea) => void;
  removeIdea: (id: string) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
}

// 2. CREATE THE CONTEXT
const IdeasContext = createContext<IdeasContextType | undefined>(undefined);

// 3. CREATE THE PROVIDER COMPONENT
interface IdeasProviderProps {
  children: ReactNode; // This allows the provider to wrap other components
}

export const IdeasProvider = ({ children }: IdeasProviderProps) => {
  const [ideas, setIdeas] = useState<Idea[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const addIdea = (idea: Idea) => {
    setIdeas((prevIdeas) => [...prevIdeas, idea]);
  };

  const updateIdea = (updatedIdea: Idea) => {
    setIdeas((prevIdeas) =>
      prevIdeas.map((idea) =>
        idea.id === updatedIdea.id ? updatedIdea : idea
      )
    );
  };

  const removeIdea = (id: string) => {
    setIdeas((prevIdeas) => prevIdeas.filter((idea) => idea.id !== id));
  };

  const contextValue: IdeasContextType = {
    ideas,
    loading,
    error,
    setIdeas,
    addIdea,
    updateIdea,
    removeIdea,
    setLoading,
    setError,
  };

  return (
    <IdeasContext.Provider value={contextValue}>
      {children}
    </IdeasContext.Provider>
  );
};

// 4. CREATE THE CUSTOM HOOK
export const useIdeas = (): IdeasContextType => {
  const context = useContext(IdeasContext);
  if (context === undefined) {
    throw new Error('useIdeas must be used within an IdeasProvider');
  }
  return context;
};