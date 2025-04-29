import { Skeleton } from "@/components/ui/skeleton";

const TaskItemSkeleton = () => (
  <li className="p-4 border-b border-gray-200">
    <div className="flex justify-between items-center">
      <div>
        <Skeleton className="h-6 w-32 mb-2 bg-gray-300" />
        <Skeleton className="h-4 w-48 bg-gray-300" />
      </div>
      <div className="flex items-center space-x-4">
        <Skeleton className="h-8 w-[180px] bg-gray-300" />
        <Skeleton className="h-8 w-24 bg-gray-300" />
      </div>
    </div>
  </li>
);

export default TaskItemSkeleton;