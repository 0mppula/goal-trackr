import useGoalStore from '@/store/useGoalStore';
import { GoalDayType, GoalType } from '@/types/goal';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from './ui/button';
import { Form, FormControl, FormField, FormItem, FormMessage } from './ui/form';
import { Input } from './ui/input';
import { toast } from './ui/use-toast';
import ButtonLoading from './ui/ButtonLoading';

interface GoalEditFormProps {
	goalDay: GoalDayType;
	goal: GoalType;
}

const GoalEditForm = ({ goalDay, goal }: GoalEditFormProps) => {
	const [loading, setLoading] = useState(false);
	const queryClient = useQueryClient();
	const editedGoalId = useGoalStore((state) => state.editedGoalId);
	const setEditedGoalId = useGoalStore((state) => state.setEditedGoalId);

	const handleEditGoal = async (newGoalDay: GoalDayType) => {
		await axios.patch(`/api/day-goals/${goalDay?._id}/edit-goal`, { newGoalDay });
	};

	const addGoalMutation = useMutation({
		mutationFn: handleEditGoal,
		onMutate: async (newGoalDay) => {
			setLoading(true);
		},
		onError: (err, newGoalDay, context) => {
			toast({
				variant: 'destructive',
				title: 'Error editing your goal.',
				description: 'Please try again later.',
			});

			form.reset({ goal: goal.text });
			setTimeout(() => form.setFocus('goal'), 300);
		},
		onSuccess: () => {
			toast({ description: 'Goal edited.' });
			form.reset({ goal: '' });
		},
		onSettled: () => {
			queryClient.invalidateQueries(['goalDays']);
			setLoading(false);
			setEditedGoalId(null);
		},
	});

	const FormSchema = z.object({
		goal: z.string().trim().min(1, {
			message: 'The goal field cannot be empty.',
		}),
	});

	const form = useForm<z.infer<typeof FormSchema>>({
		resolver: zodResolver(FormSchema),
		defaultValues: { goal: '' },
	});

	useEffect(() => {
		if (editedGoalId === goal._id) {
			setTimeout(() => form.setFocus('goal'), 200);

			form.reset({ goal: goal.text });
		}
	}, [editedGoalId]);

	const onSubmit = async (data: z.infer<typeof FormSchema>) => {
		const timestamp = new Date().toISOString();

		// Dont make any requests if goal text did not change.
		if (data.goal === goal.text) {
			form.reset({ goal: '' });
			setEditedGoalId(null);
			return;
		}

		const newGoal: GoalType = {
			...goal,
			text: data.goal.trim(),
			completed: false,
			updatedAt: timestamp,
		};

		const newGoals = [...goalDay.goals].map((g) => (g._id === newGoal._id ? newGoal : g));

		const newGoalDay: GoalDayType = {
			...goalDay,
			goals: newGoals,
			goalTarget: 0,
			updatedAt: timestamp,
		};

		addGoalMutation.mutate(newGoalDay);
	};

	return (
		<>
			{editedGoalId === goal._id && (
				<Form {...form}>
					<form
						onSubmit={form.handleSubmit(onSubmit)}
						className="mt-[1.5rem] w-full space-y-4"
					>
						<FormField
							control={form.control}
							name="goal"
							render={({ field }) => (
								<FormItem>
									<FormControl>
										<Input
											placeholder="Goal description"
											{...field}
											autoFocus
											disabled={loading}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<div className="flex gap-4">
							<Button
								variant="ghost"
								type="button"
								onClick={() => setEditedGoalId(null)}
							>
								Cancel
							</Button>
							<ButtonLoading loading={loading} type="submit">
								Edit goal
							</ButtonLoading>
						</div>
					</form>
				</Form>
			)}
		</>
	);
};

export default GoalEditForm;
