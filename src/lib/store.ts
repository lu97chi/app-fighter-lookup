import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export type UserRole = 'manager' | 'fighter'

interface UserState {
  role: UserRole
  name: string
  email: string
  unreadNotifications: number
  setRole: (role: UserRole) => void
  setUserData: (data: Partial<UserState>) => void
}

export const useStore = create<UserState>()(
  persist(
    (set) => ({
      role: 'manager',
      name: 'John Doe',
      email: 'john.doe@fighter.com',
      unreadNotifications: 3,
      setRole: (role) => set({ role }),
      setUserData: (data) => set((state) => ({ ...state, ...data })),
    }),
    {
      name: 'fighter-storage',
    }
  )
) 