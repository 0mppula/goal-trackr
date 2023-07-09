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
import { toast } from './ui/use-toast';
import ButtonLoading from './ui/ButtonLoading';
import {
	RefetchOptions,
	InfiniteData,
	QueryObserverResult,
	RefetchQueryFilters,
} from '@tanstack/react-query';
import { GetGoalDaysApiData } from '@/types/goalDayApiData';

interface GoalDayFormProps {
	goalDay: GoalDayType | null;
	refetch: <TPageData>(
		options?: (RefetchOptions & RefetchQueryFilters<TPageData>) | undefined
	) => Promise<QueryObserverResult<InfiniteData<GetGoalDaysApiData>, unknown>>;
}

const GoalDayForm = ({ goalDay, refetch }: GoalDayFormProps) => {
	const [addingGoal, setAddingGoal] = useState(false);
	const [loading, setLoading] = useState(false);
	const { isAddingGoalDayId, setIsAddingGoalDayId, setEditedGoalId, editedGoalId } =
		useGoalStore();

	const queryClient = useQueryClient();

	useEffect(() => {
		if (isAddingGoalDayId === goalDay?._id) {
			setAddingGoal(true);
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

			setIsAddingGoalDayId(newGoalDay._id);
		},
		onError: (err, newGoalDay, context) => {
			toast({
				variant: 'destructive',
				title: 'Error adding a new goal.',
				description: 'Please try again later.',
			});

			setTimeout(() => form.setFocus('goal'), 300);
		},
		onSuccess: () => {
			toast({ description: 'Goal added.' });
		},
		onSettled: () => {
			refetch({ refetchPage: (page, index) => index === 0 });
			setLoading(false);
		},
	});

	const addGoalMutation = useMutation({
		mutationFn: handleAddGoal,
		onMutate: async (newGoalDay) => {
			setLoading(true);
		},
		onError: (err, newGoalDay, context) => {
			toast({
				variant: 'destructive',
				title: 'Error adding a new goal.',
				description: 'Please try again later.',
			});
		},
		onSuccess: (_, variabels) => {
			const goalDayId = variabels._id;

			refetch({
				refetchPage: (page: GetGoalDaysApiData) => {
					return page.goalDays?.some((gd) => gd?._id === goalDayId) || false;
				},
			});

			toast({ description: 'Goal added.' });
			form.reset({ goal: '' });
		},
		onSettled: () => {
			setLoading(false);
			setIsAddingGoalDayId(null);
			setAddingGoal(true);
			setTimeout(() => form.setFocus('goal'), 300);
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
						<Button onClick={handleAddingGoal}>New Goal</Button>
					)}
				</div>
			</form>
		</Form>
	);
};

export default GoalDayForm;
