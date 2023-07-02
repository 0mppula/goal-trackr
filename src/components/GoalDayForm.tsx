'use client';

import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { toast } from '@/components/ui/use-toast';
import { GoalDayType } from '@/types/goal';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { getSession } from 'next-auth/react';
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

	const handleAddFirstGoalDay = async () => {
		const session = await getSession();
		const userId = session?.user.id;

		const newDayGoal = {
			userId,
			goals: [],
			goalTarget: 0,
		};

		const { data } = await axios.post('/api/day-goals/new', newDayGoal);

		return data as GoalDayType;
	};

	const addNewMutation = useMutation({
		mutationFn: handleAddFirstGoalDay,
		onMutate: () => {
			setLoading(true);
			queryClient.invalidateQueries(['goalDays'], { exact: true });
		},
		onSuccess: (data) => {
			// @ts-ignore
			queryClient.setQueriesData(['goalDays'], (oldData) => {
				// @ts-ignore
				return { ...oldData, goalDays: [data, ...oldData.goalDays] };
			});
		},
		onSettled: () => {
			setLoading(false);
		},
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
		toast({
			title: 'You submitted the following values:',
			description: (
				<pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
					<code className="text-white">{JSON.stringify(data, null, 2)}</code>
				</pre>
			),
		});

		form.setFocus('goal');
		form.reset({ goal: '' });
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
						<ButtonLoading loading={loading} onClick={() => addNewMutation.mutate()}>
							New Goal Day
						</ButtonLoading>
					)}
				</div>
			</form>
		</Form>
	);
};

export default GoalDayForm;
