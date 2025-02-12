/* eslint-disable @typescript-eslint/no-explicit-any */
import { XIcon } from 'lucide-react';
import * as React from 'react';

import { Badge } from '@use-it/ui/components/badge';
import { Button } from '@use-it/ui/components/button';
import { Input } from '@use-it/ui/components/input';
import { Label } from '@use-it/ui/components/label';
import { cn } from '@use-it/ui/lib/utils';

type InputTagsProps = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  'value' | 'onChange'
> & {
  value: string[];
  onChange: React.Dispatch<React.SetStateAction<string[]>>;
};

const InputTags = React.forwardRef<HTMLInputElement, InputTagsProps>(
  ({ className, value, onChange, ...props }, ref) => {
    const [pendingDataPoint, setPendingDataPoint] = React.useState('');

    React.useEffect(() => {
      if (pendingDataPoint.includes(',')) {
        const newDataPoints = new Set([
          ...value,
          ...pendingDataPoint.split(',').map((chunk) => chunk.trim()),
        ]);
        onChange(Array.from(newDataPoints));
        setPendingDataPoint('');
      }
    }, [pendingDataPoint, onChange, value]);

    const addPendingDataPoint = () => {
      if (pendingDataPoint) {
        const newDataPoints = new Set([...value, pendingDataPoint]);
        onChange(Array.from(newDataPoints));
        setPendingDataPoint('');
      }
    };

    return (
      <div
        className={cn(
          // caveat: :has() variant requires tailwind v3.4 or above: https://tailwindcss.com/blog/tailwindcss-v3-4#new-has-variant
          'bg-muted border rounded-md p-1 gap-1 flex flex-col',
          className
        )}
      >
        {value.map((item: any) => (
          <Badge key={item} className="flex items-center gap-3 px-3 py-1 h-9">
            <Label className="w-full">{item}</Label>
            <Button
              size="icon"
              className="bg-transparent size-4 hover:bg-transparent"
              onClick={() => {
                onChange(value.filter((i: any) => i !== item));
              }}
            >
              <XIcon className="size-4" />
            </Button>
          </Badge>
        ))}
        <Input
          value={pendingDataPoint}
          onChange={(e) => setPendingDataPoint(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ',') {
              e.preventDefault();
              addPendingDataPoint();
            } else if (
              e.key === 'Backspace' &&
              pendingDataPoint.length === 0 &&
              value.length > 0
            ) {
              e.preventDefault();
              onChange(value.slice(0, -1));
            }
          }}
          {...props}
          ref={ref}
        />
      </div>
    );
  }
);

InputTags.displayName = 'InputTags';

export { InputTags };
