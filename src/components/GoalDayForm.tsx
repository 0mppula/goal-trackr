'use client';

import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { toast } from '@/components/ui/use-toast';
import { GoalType } from '@/types/goal';
import { zodResolver } from '@hookform/resolvers/zod';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import ButtonLoading from './ui/ButtonLoading';

interface GoalDayFormProps {
	editedGoal: GoalType | null;
	setEditedGoal: React.Dispatch<React.SetStateAction<GoalType | null>>;
}

const GoalDayForm = ({ editedGoal, setEditedGoal }: GoalDayFormProps) => {
	const [loading, setLoading] = useState(false);
	const [addingGoal, setAddingGoal] = useState(false);

	const FormSchema = z.object({
		goal: z.string().min(1, {
			message: 'The goal field cannot be empty.',
		}),
	});

	const form = useForm<z.infer<typeof FormSchema>>({
		resolver: zodResolver(FormSchema),
	});

	useEffect(() => {
		if (editedGoal) {
			form.reset({ goal: editedGoal.text });
			setAddingGoal(false);
		} else {
			form.reset({ goal: '' });
		}
	}, [editedGoal]);

	function onSubmit(data: z.infer<typeof FormSchema>) {
		toast({
			title: 'You submitted the following values:',
			description: (
				<pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
					<code className="text-white">{JSON.stringify(data, null, 2)}</code>
				</pre>
			),
		});

		if (editedGoal) {
			setEditedGoal(null);
		}
	}

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="mt-[1.5rem] w-full space-y-4">
				{(addingGoal || editedGoal) && (
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
					{addingGoal && (
						<>
							<Button
								variant="ghost"
								disabled={loading}
								onClick={() => setAddingGoal(false)}
							>
								Cancel
							</Button>
							<ButtonLoading loading={loading} type="submit">
								Add goal
							</ButtonLoading>
						</>
					)}

					{editedGoal && (
						<>
							<Button
								variant="ghost"
								disabled={loading}
								onClick={() => setEditedGoal(null)}
							>
								Cancel
							</Button>
							<ButtonLoading loading={loading} type="submit">
								Edit goal
							</ButtonLoading>
						</>
					)}

					{!addingGoal && !editedGoal && (
						<Button onClick={() => setAddingGoal(true)}>New Goal</Button>
					)}
				</div>
			</form>
		</Form>
	);
};

export default GoalDayForm;
