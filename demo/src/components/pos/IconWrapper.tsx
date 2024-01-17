import React from 'react';
import { cn } from '@nextui-org/react';

export const IconWrapper = ({
  children,
  className
}: {
  children: any;
  className: any;
}) => (
  <div
    className={cn(
      className,
      'flex h-7 w-7 items-center justify-center rounded-small'
    )}
  >
    {children}
  </div>
);
