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

interface GaolItemControlsProps {}

const GaolItemControls = ({}: GaolItemControlsProps) => {
	const [editLoading, setEditLoading] = useState(false);
	const [deleteLoading, setDeleteLoading] = useState(false);

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant="ghost" size="sm">
					<MoreVertical className="h-[1.125rem] w-[1.125rem]" />
					<span className="sr-only">Open goal menu</span>
				</Button>
			</DropdownMenuTrigger>

			<DropdownMenuContent align="end">
				<DropdownMenuItem className="flex gap-2" disabled={editLoading || deleteLoading}>
					{editLoading ? (
						<Loader2 className="h-[1.125rem] w-[1.125rem] animate-spin" />
					) : (
						<Edit2 className="h-[1.125rem] w-[1.125rem]" />
					)}
					<span>Edit</span>
					<span className="sr-only">Edit Goal</span>
				</DropdownMenuItem>

				<DropdownMenuItem className="flex gap-2" disabled={editLoading || deleteLoading}>
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

export default GaolItemControls;
