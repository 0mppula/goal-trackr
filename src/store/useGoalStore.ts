import { create } from 'zustand';

interface editedGoal {
	editedGoalId: string | null;
	setEditedGoalId: (id: string | null) => void;
	isAddingGoalDayId: string | null;
	setIsAddingGoalDayId: (id: string | null) => void;
}

const useGoalStore = create<editedGoal>((set) => ({
	editedGoalId: null,
	setEditedGoalId: (id) => set(() => ({ editedGoalId: id, isAddingGoalDayId: null })),
	isAddingGoalDayId: null,
	setIsAddingGoalDayId: (id) => set(() => ({ isAddingGoalDayId: id, editedGoalId: null })),
}));

export default useGoalStore;
