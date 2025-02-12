import { Minus, Plus } from 'lucide-react';
import * as React from 'react';

import { Button } from '@use-it/ui/components/button';
import { Input } from '@use-it/ui/components/input';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@use-it/ui/components/tooltip';
import { cn } from '@use-it/ui/lib/utils';

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  symbol?: string;
}

const IncrementorInput = React.forwardRef<HTMLInputElement, InputProps>(
  ({ symbol, className, ...props }, ref) => {
    const [hitMax, setHitMax] = React.useState(false);
    const [hitMin, setHitMin] = React.useState(false);
    const incrementInput = React.useRef<HTMLInputElement>(null);

    React.useImperativeHandle(ref, () => incrementInput.current!, []);

    const increment = () => {
      incrementInput.current?.stepUp();
      // Supports onchange events
      incrementInput.current?.dispatchEvent(
        new Event('change', { bubbles: true })
      );
      // Disbale when hitting max
      setHitMax(incrementInput.current?.value === incrementInput.current?.max);
      setHitMin(incrementInput.current?.value === incrementInput.current?.min);
    };

    const decrement = () => {
      incrementInput.current?.stepDown();
      // Supports onchange events
      incrementInput.current?.dispatchEvent(
        new Event('change', { bubbles: true })
      );
      // Disbale when hitting min
      setHitMax(incrementInput.current?.value === incrementInput.current?.max);
      setHitMin(incrementInput.current?.value === incrementInput.current?.min);
    };

    return (
      <div className="flex items-center w-full px-3 py-1 text-sm transition-colors border rounded-lg h-9 border-input placeholder:text-muted-foreground focus-visible:ring-ring bg-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground focus-visible:outline-hidden focus-visible:ring-1 disabled:cursor-not-allowed disabled:opacity-50">
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              disabled={hitMax}
              onClick={increment}
              aria-label="increase"
              type="button"
              className="w-auto h-auto p-1 shrink-0"
            >
              <Plus className="size-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>Increase</TooltipContent>
        </Tooltip>

        <div className="relative w-full">
          <Input
            type="number"
            className={cn(
              'no-steps w-full border-0 bg-transparent h-auto p-0 pr-4 text-center text-foreground disabled:text-foreground [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none',
              className
            )}
            ref={incrementInput}
            {...props}
          />
          {symbol && <span className="absolute top-0 right-4">{symbol}</span>}
        </div>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              disabled={hitMin}
              onClick={decrement}
              aria-label="decrease"
              type="button"
              className="w-auto h-auto p-1 shrink-0"
            >
              <Minus className="size-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>Decrease</TooltipContent>
        </Tooltip>
      </div>
    );
  }
);
IncrementorInput.displayName = 'IncrementorInput';

export { IncrementorInput };
