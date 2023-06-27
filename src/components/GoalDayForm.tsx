'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { toast } from '@/components/ui/use-toast';
import ButtonLoading from './ui/ButtonLoading';
import { useState } from 'react';

const FormSchema = z.object({
	goal: z.string().min(1, {
		message: 'The goal field cannot be empty.',
	}),
});

const GoalDayForm = () => {
	const [loading, setLoading] = useState(false);
	const [addingGoal, setAddingGoal] = useState(false);

	const form = useForm<z.infer<typeof FormSchema>>({
		resolver: zodResolver(FormSchema),
	});

	function onSubmit(data: z.infer<typeof FormSchema>) {
		toast({
			title: 'You submitted the following values:',
			description: (
				<pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
					<code className="text-white">{JSON.stringify(data, null, 2)}</code>
				</pre>
			),
		});
	}

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
								disabled={loading}
								onClick={() => setAddingGoal(false)}
							>
								Cancel
							</Button>
							<ButtonLoading loading={loading} type="submit">
								Add goal
							</ButtonLoading>
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
