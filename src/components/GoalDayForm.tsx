'use client';

import { generateId } from '@/app/utils/generateId';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import useGoalStore from '@/store/useGoalStore';
import { GoalDayType, GoalType } from '@/types/goal';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { getSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import ButtonLoading from './ui/ButtonLoading';
import { toast } from './ui/use-toast';

interface GoalDayFormProps {
	goalDay: GoalDayType | null;
}

const GoalDayForm = ({ goalDay }: GoalDayFormProps) => {
	const [loading, setLoading] = useState(false);
	const [addingGoal, setAddingGoal] = useState(false);
	const { isAddingGoalDayId, setIsAddingGoalDayId, setEditedGoalId, editedGoalId } =
		useGoalStore();

	const queryClient = useQueryClient();

	useEffect(() => {
		if (isAddingGoalDayId === goalDay?._id) {
			setAddingGoal(true);

			setTimeout(() => form.setFocus('goal'), 250);
		}
	}, [isAddingGoalDayId]);

	useEffect(() => {
		if (editedGoalId) {
			setAddingGoal(false);
		}
	}, [editedGoalId]);

	const handleAddFirstGoalDay = async (newGoalDay: GoalDayType) => {
		await axios.post('/api/day-goals/new', newGoalDay);
	};

	const handleAddGoal = async (newGoalDay: GoalDayType) => {
		await axios.post(`/api/day-goals/${newGoalDay?._id}/new-goal`, { newGoalDay });
	};

	const addNewGoalDayMutation = useMutation({
		mutationFn: handleAddFirstGoalDay,
		onMutate: async (newGoalDay) => {
			setLoading(true);
			await queryClient.cancelQueries({ queryKey: ['goalDays'] });

			const previousGoalDays = queryClient.getQueryData(['goalDays']);

			// @ts-ignore
			queryClient.setQueriesData(['goalDays'], (oldData) => {
				// @ts-ignore
				return { ...oldData, goalDays: [newGoalDay, ...oldData.goalDays] };
			});

			setIsAddingGoalDayId(newGoalDay._id);

			return { previousGoalDays };
		},
		onError: (err, newGoalDay, context) => {
			toast({
				variant: 'destructive',
				title: 'Error adding a new goal.',
				description: 'Please try again later.',
			});

			// @ts-ignore
			queryClient.setQueryData(['goalDays'], context?.previousGoalDays);
			form.setFocus('goal');
			setLoading(false);
		},
		onSuccess: () => {
			toast({ description: 'Goal added.' });
		},
		onSettled: () => {
			setLoading(false);
			queryClient.invalidateQueries(['goalDays']);
		},
	});

	const addGoalMutation = useMutation({
		mutationFn: handleAddGoal,
		onMutate: async (newGoalDay) => {
			setLoading(true);
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

			setIsAddingGoalDayId(null);
			setAddingGoal(true);
			form.setFocus('goal');
			form.reset({ goal: '' });
			setLoading(false);

			return { previousGoalDays };
		},
		onError: (err, newGoalDay, context) => {
			toast({
				variant: 'destructive',
				title: 'Error adding a new goal.',
				description: 'Please try again later.',
			});

			// @ts-ignore
			queryClient.setQueryData(['goalDays'], context?.previousGoalDays);

			form.setFocus('goal');
			setLoading(false);
		},
		onSuccess: () => {
			toast({ description: 'Goal added.' });
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

	const onSubmit = async (data: z.infer<typeof FormSchema>) => {
		const session = await getSession();
		const timestamp = new Date().toISOString();

		if (session?.user.id) {
			const newGoal: GoalType = {
				_id: generateId(),
				text: data.goal.trim(),
				completed: false,
				createdAt: timestamp,
				updatedAt: timestamp,
			};

			const newGoalDay: GoalDayType = {
				_id: goalDay ? goalDay._id : generateId(),
				userId: session?.user.id,
				goals: [...(goalDay?.goals || []), newGoal],
				goalTarget: goalDay ? goalDay.goalTarget : 0,
				createdAt: goalDay ? goalDay.createdAt : timestamp,
				updatedAt: timestamp,
			};

			if (!goalDay) {
				addNewGoalDayMutation.mutate(newGoalDay);
			}

			if (goalDay) {
				addGoalMutation.mutate(newGoalDay);
			}
		}
	};

	const handleCancel = (e: React.MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();
		setAddingGoal(false);
		setIsAddingGoalDayId(null);
		form.reset({ goal: '' });
	};

	const handleAddingGoal = () => {
		setAddingGoal(true);
		setEditedGoalId(null);
	};

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="mt-[1.5rem] w-full space-y-4">
				{(addingGoal || isAddingGoalDayId === goalDay?._id) && (
					<FormField
						control={form.control}
						name="goal"
						render={({ field }) => (
							<FormItem>
								<FormControl>
									<Input
										disabled={loading}
										placeholder="Goal description"
										{...field}
										autoFocus
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
				)}

				<div className="flex gap-4">
					{addingGoal || isAddingGoalDayId === goalDay?._id ? (
						<>
							<Button variant="ghost" type="button" onClick={(e) => handleCancel(e)}>
								Cancel
							</Button>

							<ButtonLoading type="submit" loading={loading}>
								Add goal
							</ButtonLoading>
						</>
					) : (
						<ButtonLoading onClick={handleAddingGoal} loading={loading}>
							New Goal
						</ButtonLoading>
					)}
				</div>
			</form>
		</Form>
	);
};

export default GoalDayForm;
