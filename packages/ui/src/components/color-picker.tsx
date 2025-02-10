'use client';

import { Button, type ButtonProps } from '@repo/ui/components/button';
import { Input } from '@repo/ui/components/input';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@repo/ui/components/popover';
import { useForwardedRef } from '@repo/ui/lib/use-forwarded-ref';
import { cn } from '@repo/ui/lib/utils';
import { XIcon } from 'lucide-react';
import { forwardRef, useMemo, useState } from 'react';
import { HexColorPicker } from 'react-colorful';

interface ColorPickerProps {
  value: string;
  previewClassName?: string;
  onClear: () => void;
  onChange: (value: string) => void;
  onBlur?: () => void;
}

const ColorPicker = forwardRef<
  HTMLInputElement,
  Omit<ButtonProps, 'value' | 'onChange' | 'onBlur'> & ColorPickerProps
>(
  (
    {
      disabled,
      value,
      onClear,
      onChange,
      onBlur,
      name,
      className,
      previewClassName,
      ...props
    },
    forwardedRef,
  ) => {
    const ref = useForwardedRef(forwardedRef);
    const [open, setOpen] = useState(false);

    const parsedValue = useMemo(() => {
      return value || '#FFFFFF';
    }, [value]);

    return (
      <Popover onOpenChange={setOpen} open={open}>
        <PopoverTrigger asChild disabled={disabled} onBlur={onBlur}>
          <Button
            {...props}
            className={cn(
              'flex flex-col items-center justify-center gap-1',
              className,
            )}
            name={name}
            onClick={() => {
              setOpen(true);
            }}
            variant={props.variant ?? 'ghost'}
          >
            {props.children}
            <div
              className={cn('w-[60%] h-1 border rounded-md', previewClassName)}
              style={{
                backgroundColor: parsedValue,
              }}
            />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-full p-1 space-y-1">
          <HexColorPicker color={parsedValue} onChange={onChange} />
          <Input
            maxLength={7}
            onChange={(e) => {
              onChange(e?.currentTarget?.value);
            }}
            ref={ref}
            value={parsedValue}
          />
          <Button
            variant="outline"
            className="justify-start w-full"
            onClick={() => onClear()}
          >
            <XIcon className="mr-2 size-4" />
            <p>Clear Color</p>
          </Button>
        </PopoverContent>
      </Popover>
    );
  },
);
ColorPicker.displayName = 'ColorPicker';

export { ColorPicker };
