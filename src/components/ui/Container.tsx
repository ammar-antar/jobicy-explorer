import { type ReactNode } from 'react';
import { cn } from '@/utils/cn';

type ContainerProps = {
  children: ReactNode;
  className?: string;
};

export function Container({ children, className }: ContainerProps) {
  return (
    <div className={cn('mx-auto w-full max-w-max px-4 md:px-5 lg:px-6', className)}>
      {children}
    </div>
  );
}