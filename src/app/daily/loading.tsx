import GoalDaySkeleton from '@/components/GoalDaySkeleton';
import { Skeleton } from '@/components/ui/skeleton';

export default function Loading() {
	return (
		<div className="container pt-8">
			<div className="flex justify-center">
				<Skeleton className="lg:h-[48px] h-[40px] mb-8 w-[250px] " />
			</div>

			<div className="flex flex-col gap-y-8 max-w-3xl mx-auto">
				{Array.from({ length: 3 }).map((_, i) => (
					<GoalDaySkeleton key={`goal-day-skeleton-${i}`} index={i} />
				))}
			</div>
		</div>
	);
}
