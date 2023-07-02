'use client';

import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { toast } from '@/components/ui/use-toast';
import { GoalDayType } from '@/types/goal';
import { PostGoalDayApiData } from '@/types/goalDayApiData';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import ButtonLoading from './ui/ButtonLoading';

interface GoalDayFormProps {
	goalDay: GoalDayType | null;
}

const GoalDayForm = ({ goalDay }: GoalDayFormProps) => {
	const [loading, setLoading] = useState(false);
	const [addingGoal, setAddingGoal] = useState(false);

	const queryClient = useQueryClient();

	const handleAddFirstGoalDay = async (goalText: string) => {
		const newDayGoal = {
			goals: [{ text: goalText, completed: false }],
			goalTarget: 0,
		};

		const { data } = await axios.post('/api/day-goals/new', newDayGoal);

		return data as PostGoalDayApiData;
	};

	const handleAddGoal = async (goalText: string) => {
		const newGoal = {
			text: goalText,
			completed: false,
		};

		const { data } = await axios.post(`/api/day-goals/${goalDay?._id}/new-goal`, {
			newGoal,
			goalDayId: goalDay?._id,
		});

		return data as PostGoalDayApiData;
	};

	const addNewGoalDayMutation = useMutation({
		mutationFn: handleAddFirstGoalDay,
		onMutate: () => setLoading(true),
		onError: (err) => {
			form.setFocus('goal');
		},
		onSuccess: (data) => {
			// @ts-ignore
			queryClient.setQueriesData(['goalDays'], (oldData) => {
				// @ts-ignore
				return { ...oldData, goalDays: [data.goalDay, ...oldData.goalDays] };
			});

			queryClient.invalidateQueries(['goalDays'], { exact: true });
		},
		onSettled: () => setLoading(false),
	});

	const addGoalMutation = useMutation({
		mutationFn: handleAddGoal,
		onMutate: () => setLoading(true),
		onError: (err) => form.setFocus('goal'),
		onSuccess: (data) => {
			// @ts-ignore
			queryClient.setQueriesData(['goalDays'], (oldData) => {
				// @ts-ignore
				return { ...oldData, goalDays: [data.goalDay, ...oldData.goalDays] };
			});

			queryClient.invalidateQueries(['goalDays'], { exact: true });
			form.setFocus('goal');
			form.reset({ goal: '' });
		},
		onSettled: () => setLoading(false),
	});

	const FormSchema = z.object({
		goal: z.string().min(1, {
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

	const onSubmit = (data: z.infer<typeof FormSchema>) => {
		if (!goalDay) {
			addNewGoalDayMutation.mutate(data.goal);

			return;
		}

		if (goalDay) {
			addGoalMutation.mutate(data.goal);
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
							<Button
								variant="ghost"
								type="button"
								disabled={loading}
								onClick={(e) => handleCancel(e)}
							>
								Cancel
							</Button>

							<ButtonLoading loading={loading} type="submit">
								Add goal
							</ButtonLoading>
						</>
					) : goalDay ? (
						<ButtonLoading loading={loading} onClick={() => setAddingGoal(true)}>
							New Goal
						</ButtonLoading>
					) : (
						<ButtonLoading loading={loading} onClick={() => setAddingGoal(true)}>
							New Goal Day
						</ButtonLoading>
					)}
				</div>
			</form>
		</Form>
	);
};

export default GoalDayForm;
