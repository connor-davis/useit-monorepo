import { Minus, Plus } from 'lucide-react';
import * as React from 'react';

import { Button } from '@use-it/ui/components/button';
import { Input } from '@use-it/ui/components/input';

type Props = {
  min?: number;
  max?: number;
  step?: number;
  placeholder?: string;
};

export const NumberInput = ({
  min = 0,
  max = 1000,
  step = 1,
  placeholder = undefined,
}: Props) => {
  const [value, setValue] = React.useState(min);

  const decrease = () => {
    setValue((prevValue) => Math.max(min, prevValue - step));
  };

  const increase = () => {
    setValue((prevValue) => Math.min(max, prevValue + step));
  };

  return (
    <div className="flex items-center">
      <Button
        type="button"
        onClick={decrease}
        size="icon"
        variant="outline"
        className="z-0 rounded-r-none"
      >
        <Minus className="size-4" />
      </Button>
      <Input
        type="number"
        placeholder={placeholder}
        className="rounded-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none z-10"
        value={value}
        min={min}
        max={max}
        step={step}
      />
      <Button
        type="button"
        onClick={increase}
        size="icon"
        variant="outline"
        className="z-0 rounded-l-none"
      >
        <Plus className="size-4" />
      </Button>
    </div>
  );
};
