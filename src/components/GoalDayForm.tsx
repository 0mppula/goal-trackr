'use client';

import { generateId } from '@/app/utils/generateId';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { GoalDayType, GoalType } from '@/types/goal';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { getSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { toast } from './ui/use-toast';

interface GoalDayFormProps {
	goalDay: GoalDayType | null;
}

const GoalDayForm = ({ goalDay }: GoalDayFormProps) => {
	const [addingGoal, setAddingGoal] = useState(false);

	const queryClient = useQueryClient();

	const handleAddFirstGoalDay = async (newGoalDay: GoalDayType) => {
		await axios.post('/api/day-goals/new', newGoalDay);
	};

	const handleAddGoal = async (newGoalDay: GoalDayType) => {
		await axios.post(`/api/day-goals/${goalDay?._id}/new-goal`, { newGoalDay });
	};

	const addNewGoalDayMutation = useMutation({
		mutationFn: handleAddFirstGoalDay,
		onMutate: async (newGoalDay) => {
			await queryClient.cancelQueries({ queryKey: ['goalDays'] });

			const previousGoalDays = queryClient.getQueryData(['goalDays']);

			// @ts-ignore
			queryClient.setQueriesData(['goalDays'], (oldData) => {
				// @ts-ignore
				return { ...oldData, goalDays: [newGoalDay, ...oldData.goalDays] };
			});

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
		},
		onSuccess: () => {
			toast({ description: 'Goal added.' });
		},
		onSettled: () => {
			queryClient.invalidateQueries(['goalDays'], { exact: true });
		},
	});

	const addGoalMutation = useMutation({
		mutationFn: handleAddGoal,
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
		},
		onSuccess: () => {
			toast({ title: 'Goal added.' });
		},
		onSettled: () => {
			queryClient.invalidateQueries(['goalDays'], { exact: true });
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
		if (addingGoal) {
			form.setFocus('goal');
		}
	}, [addingGoal]);

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
				goalTarget: 0,
				createdAt: timestamp,
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
		form.reset({ goal: '' });
	};

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="mt-[1.5rem] w-full space-y-4">
				{addingGoal && (
					<FormField
						control={form.control}
						name="goal"
						render={({ field }) => (
							<FormItem>
								<FormControl>
									<Input placeholder="Goal description" {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
				)}

				<div className="flex gap-4">
					{addingGoal ? (
						<>
							<Button variant="ghost" type="button" onClick={(e) => handleCancel(e)}>
								Cancel
							</Button>

							<Button type="submit">Add goal</Button>
						</>
					) : (
						<Button onClick={() => setAddingGoal(true)}>New Goal</Button>
					)}
				</div>
			</form>
		</Form>
	);
};

export default GoalDayForm;
