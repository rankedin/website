import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

export function UserCardSkeleton() {
  return (
    <Card>
      <CardContent className='p-6'>
        <div className='flex items-center space-x-4'>
          <Skeleton className='h-16 w-16 rounded-full' />
          <div className='flex-1 space-y-2'>
            <Skeleton className='h-4 w-32' />
            <Skeleton className='h-3 w-24' />
          </div>
          <div className='text-right space-y-1'>
            <Skeleton className='h-6 w-12 ml-auto' />
            <Skeleton className='h-3 w-16 ml-auto' />
          </div>
        </div>
        <div className='mt-4 space-y-2'>
          <Skeleton className='h-3 w-full' />
          <Skeleton className='h-3 w-2/3' />
        </div>
        <div className='mt-4 flex justify-between text-sm'>
          <Skeleton className='h-4 w-20' />
          <Skeleton className='h-4 w-16' />
          <Skeleton className='h-4 w-24' />
        </div>
      </CardContent>
    </Card>
  );
}

export function RepoCardSkeleton() {
  return (
    <Card>
      <CardContent className='p-6'>
        <div className='flex items-start justify-between mb-4'>
          <div className='flex-1 space-y-2'>
            <Skeleton className='h-5 w-48' />
            <Skeleton className='h-4 w-32' />
          </div>
          <Skeleton className='h-6 w-12' />
        </div>
        <div className='space-y-2 mb-4'>
          <Skeleton className='h-3 w-full' />
          <Skeleton className='h-3 w-3/4' />
        </div>
        <div className='flex items-center justify-between'>
          <div className='flex items-center space-x-4'>
            <Skeleton className='h-4 w-16' />
            <Skeleton className='h-4 w-12' />
            <Skeleton className='h-4 w-14' />
          </div>
          <Skeleton className='h-4 w-20' />
        </div>
      </CardContent>
    </Card>
  );
}

export function TopicCardSkeleton() {
  return (
    <Card>
      <CardContent className='p-6'>
        <div className='flex items-center justify-between mb-4'>
          <div className='flex-1 space-y-2'>
            <Skeleton className='h-5 w-32' />
            <Skeleton className='h-4 w-24' />
          </div>
          <Skeleton className='h-6 w-12' />
        </div>
        <div className='space-y-2 mb-4'>
          <Skeleton className='h-3 w-full' />
          <Skeleton className='h-3 w-2/3' />
        </div>
        <div className='flex items-center justify-between'>
          <Skeleton className='h-4 w-20' />
          <Skeleton className='h-4 w-16' />
        </div>
      </CardContent>
    </Card>
  );
}
