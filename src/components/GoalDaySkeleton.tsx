import React from 'react';
import { Skeleton } from './ui/skeleton';
import { cn } from '@/lib/utils';

interface GoalDaySkeletonProps {
	index: number;
}

const GoalDaySkeleton = ({ index }: GoalDaySkeletonProps) => {
	return (
		<div className={cn('w-full', index === 0 ? 'mt-0' : 'mt-8')}>
			<Skeleton className="h-[32px] lg:h-[36px] w-[150px] lg:w-[200px]" />
			<Skeleton className="h-[68px] w-full mt-4" />
			<Skeleton className="h-[68px] w-full mt-4" />
			<Skeleton className="h-[68px] w-full mt-4" />
			<Skeleton className="h-[40px] w-[105px] mt-6" />
		</div>
	);
};

export default GoalDaySkeleton;
