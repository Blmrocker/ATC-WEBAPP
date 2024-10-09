import { create } from 'zustand';

interface UserState {
  username: string;
  level: number;
  experience: number;
  addExperience: (amount: number) => void;
}

export const useUserStore = create<UserState>((set) => ({
  username: 'Trainee Pilot',
  level: 1,
  experience: 0,
  addExperience: (amount) => set((state) => {
    const newExperience = state.experience + amount;
    const newLevel = Math.floor(newExperience / 100) + 1;
    return {
      experience: newExperience,
      level: newLevel,
    };
  }),
}));