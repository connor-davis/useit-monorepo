import { ChangeEvent, useEffect, useState } from 'react';

import { cn } from '@use-it/ui/lib/utils';

function DebounceInput({
  className,
  type,
  ...props
}: React.ComponentProps<'input'>) {
  const [inputValue, setInputValue] = useState<string | undefined>();
  const [changeEvent, setChangeEvent] =
    useState<ChangeEvent<HTMLInputElement>>();

  useEffect(() => {
    console.log(props.value);
    console.log(props.defaultValue);
  }, [props.value, props.defaultValue]);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (changeEvent && props.onChange) {
        props.onChange({
          ...changeEvent,
          target: {
            ...changeEvent.target,
            value: inputValue ?? '',
          },
        });
      }
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [inputValue]);

  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        'border-input file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground aria-invalid:outline-destructive/60 aria-invalid:ring-destructive/20 dark:aria-invalid:outline-destructive dark:aria-invalid:ring-destructive/50 ring-ring/10 dark:ring-ring/20 dark:outline-ring/40 outline-ring/50 aria-invalid:border-destructive/60 dark:aria-invalid:border-destructive flex h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:ring-4 focus-visible:outline-1 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:focus-visible:ring-[3px] aria-invalid:focus-visible:outline-none md:text-sm dark:aria-invalid:focus-visible:ring-4',
        className
      )}
      {...props}
      value={inputValue}
      onChange={(event) => {
        setInputValue(event.target.value);
        setChangeEvent(event);
      }}
    />
  );
}

export { DebounceInput };
