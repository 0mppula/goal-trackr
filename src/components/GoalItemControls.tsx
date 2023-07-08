'use client';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import useGoalStore from '@/store/useGoalStore';
import { GoalDayType, GoalType } from '@/types/goal';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { Edit2, MoreVertical, Trash2 } from 'lucide-react';
import { Button } from './ui/button';
import { toast } from './ui/use-toast';

interface GoalItemControlsProps {
	goalDay: GoalDayType;
	goal: GoalType;
}

const GoalItemControls = ({ goalDay, goal }: GoalItemControlsProps) => {
	const queryClient = useQueryClient();
	const editedGoalId = useGoalStore((state) => state.editedGoalId);
	const setEditedGoalId = useGoalStore((state) => state.setEditedGoalId);

	const handleGoalDelete = async () => {
		await axios.post(`/api/day-goals/${goalDay?._id}/delete-goal`, {
			goalId: goal._id,
		});
	};

	const deleteGoalMutation = useMutation({
		mutationFn: handleGoalDelete,
		onMutate: async () => {
			await queryClient.cancelQueries({ queryKey: ['goalDays'] });

			const previousGoalDays = queryClient.getQueryData(['goalDays']);

			const newGoalDay = {
				...goalDay,
				goals: [...goalDay.goals].filter((g) => g._id !== goal._id),
			};

			// @ts-ignore
			queryClient.setQueriesData(['goalDays'], (oldData) => {
				// @ts-ignore
				return {
					// @ts-ignore
					...oldData,
					goalDays: [
						newGoalDay,
						// @ts-ignore
						...oldData.goalDays.filter((gd) => gd._id !== newGoalDay._id),
					],
				};
			});

			return { previousGoalDays };
		},
		onError: (err, newGoalDay, context) => {
			toast({
				variant: 'destructive',
				title: 'Error deleting your goal.',
				description: 'Please try again later.',
			});

			queryClient.setQueryData(['goalDays'], context?.previousGoalDays);
		},
		onSuccess: () => {
			toast({ description: 'Goal Deleted.' });
		},
		onSettled: () => {
			queryClient.invalidateQueries(['goalDays']);
		},
	});

	const handleSetEditing = () => {
		if (editedGoalId === goal._id) {
			setEditedGoalId(null);
		} else {
			setEditedGoalId(goal._id);
		}
	};

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant="ghost" size="sm">
					<MoreVertical className="h-[1.125rem] w-[1.125rem]" />
					<span className="sr-only">Open goal menu</span>
				</Button>
			</DropdownMenuTrigger>

			<DropdownMenuContent align="end">
				<DropdownMenuItem className="flex gap-2" onClick={handleSetEditing}>
					<Edit2 className="h-[1.125rem] w-[1.125rem]" />
					<span>Edit</span>
					<span className="sr-only">Edit Goal</span>
				</DropdownMenuItem>

				<DropdownMenuItem
					className="flex gap-2 focus:bg-destructive"
					onClick={() => deleteGoalMutation.mutate()}
				>
					<Trash2 className="h-[1.125rem] w-[1.125rem]" />
					<span>Delete</span>
					<span className="sr-only">Delete Goal</span>
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
};

export default GoalItemControls;
