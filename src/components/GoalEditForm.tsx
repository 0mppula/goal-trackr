import { GoalType } from '@/types/goal';
import { zodResolver } from '@hookform/resolvers/zod';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import ButtonLoading from './ui/ButtonLoading';
import { Button } from './ui/button';
import { Form, FormControl, FormField, FormItem, FormMessage } from './ui/form';
import { Input } from './ui/input';
import { toast } from './ui/use-toast';

interface GoalEditFormProps {
	goal: GoalType;
	editingGoal: boolean;
	setEditingGoal: React.Dispatch<React.SetStateAction<boolean>>;
}

const GoalEditForm = ({ goal, editingGoal, setEditingGoal }: GoalEditFormProps) => {
	const [loading, setLoading] = useState(false);

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
		if (editingGoal) {
			setTimeout(() => form.setFocus('goal'), 200);
			form.reset({ goal: goal.text });
		}
	}, [editingGoal]);

	const onSubmit = (data: z.infer<typeof FormSchema>) => {
		toast({
			title: 'You submitted the following values:',
			description: (
				<pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
					<code className="text-white">{JSON.stringify(data, null, 2)}</code>
				</pre>
			),
		});

		form.reset({ goal: '' });
		setEditingGoal(false);
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
								disabled={loading}
								onClick={() => setEditingGoal(false)}
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
