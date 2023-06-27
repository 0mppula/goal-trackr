'use client';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Edit2, Loader2, MoreVertical, Trash2 } from 'lucide-react';
import { useState } from 'react';
import { Button } from './ui/button';
import { GoalType } from '@/types/goal';

interface GoalItemControlsProps {
	goal: GoalType;
	setEditedGoal: React.Dispatch<React.SetStateAction<GoalType | null>>;
}

const GoalItemControls = ({ goal, setEditedGoal }: GoalItemControlsProps) => {
	const [deleteLoading, setDeleteLoading] = useState(false);

	const handleGoalDelete = () => {
		setEditedGoal(null);
	};

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant="ghost" size="sm">
					<MoreVertical className="h-[1.125rem] w-[1.125rem]" />
					<span className="sr-only">Open goal menu</span>
				</Button>
			</DropdownMenuTrigger>

			<DropdownMenuContent align="end">
				<DropdownMenuItem
					className="flex gap-2"
					disabled={deleteLoading}
					onClick={() => setEditedGoal(goal)}
				>
					<Edit2 className="h-[1.125rem] w-[1.125rem]" />
					<span>Edit</span>
					<span className="sr-only">Edit Goal</span>
				</DropdownMenuItem>

				<DropdownMenuItem
					className="flex gap-2"
					disabled={deleteLoading}
					onClick={handleGoalDelete}
				>
					{deleteLoading ? (
						<Loader2 className="h-[1.125rem] w-[1.125rem] animate-spin" />
					) : (
						<Trash2 className="h-[1.125rem] w-[1.125rem]" />
					)}
					<span>Delete</span>
					<span className="sr-only">Delete Goal</span>
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
};

export default GoalItemControls;
