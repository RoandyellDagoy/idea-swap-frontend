import {BookOpen, Code, Palette, Camera} from 'lucide-react'

export interface Idea {
  id?: string;
  user_id: string;
  title: string;
  description: string;
  category: string;
  user_name?: string;
}


export interface IdeaFormData {
  title: string;
  description: string;
  category: string;
}

export const Categories = [
  { name: 'All', icon: BookOpen },
  { name: 'Programming', icon: Code },
  { name: 'Design', icon: Palette },
  { name: 'Photography', icon: Camera },
];

export interface AuthResult {
  success: boolean;
  error?: string;
}

export interface Profile {
  id: string;
  full_name: string | null;
  avatar_url: string | null;
  created_at: string;
}