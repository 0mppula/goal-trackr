import { GoalDayType, GoalType } from '@/types/goal';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from './ui/button';
import { Form, FormControl, FormField, FormItem, FormMessage } from './ui/form';
import { Input } from './ui/input';
import { toast } from './ui/use-toast';

interface GoalEditFormProps {
	goalDay: GoalDayType;
	goal: GoalType;
	editingGoal: boolean;
	setEditingGoal: React.Dispatch<React.SetStateAction<boolean>>;
}

const GoalEditForm = ({ goalDay, goal, editingGoal, setEditingGoal }: GoalEditFormProps) => {
	const queryClient = useQueryClient();

	const handleEditGoal = async (newGoalDay: GoalDayType) => {
		await axios.patch(`/api/day-goals/${goalDay?._id}/edit-goal`, { newGoalDay });
	};

	const addGoalMutation = useMutation({
		mutationFn: handleEditGoal,
		onMutate: async (newGoalDay) => {
			await queryClient.cancelQueries({ queryKey: ['goalDays'] });

			const previousGoalDays = queryClient.getQueryData(['goalDays']);

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

			form.setFocus('goal');
			form.reset({ goal: '' });
			setEditingGoal(false);

			return { previousGoalDays };
		},
		onError: (err, newGoalDay, context) => {
			toast({
				variant: 'destructive',
				title: 'Error editing your goal.',
				description: 'Please try again later.',
			});

			queryClient.setQueryData(['goalDays'], context?.previousGoalDays);

			form.setFocus('goal');
			form.reset({ goal: goal.text });
			setEditingGoal(false);
		},
		onSuccess: () => {
			toast({ description: 'Goal edited.' });
		},
		onSettled: () => {
			queryClient.invalidateQueries(['goalDays']);
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
		if (editingGoal) {
			setTimeout(() => form.setFocus('goal'), 200);

			form.reset({ goal: goal.text });
		}
	}, [editingGoal]);

	const onSubmit = async (data: z.infer<typeof FormSchema>) => {
		const timestamp = new Date().toISOString();

		// Dont make any requests if goal text did not change.
		if (data.goal === goal.text) {
			form.reset({ goal: '' });
			setEditingGoal(false);
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
			{editingGoal && (
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
								onClick={() => setEditingGoal(false)}
							>
								Cancel
							</Button>
							<Button type="submit">Edit goal</Button>
						</div>
					</form>
				</Form>
			)}
		</>
	);
};

export default GoalEditForm;
