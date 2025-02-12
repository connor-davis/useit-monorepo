import * as LabelPrimitive from '@radix-ui/react-label';
import * as React from 'react';

const PlainText = React.forwardRef<
  React.ElementRef<typeof LabelPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root> & {
    text: string;
  }
>(({ ...props }, ref) => (
  <LabelPrimitive.Root ref={ref} {...props}>
    {props.text.split('\n').map((line: string, index: number) => (
      <>
        {line}
        {index < props.text.split('\n').length - 1 && <br />}
      </>
    ))}
  </LabelPrimitive.Root>
));
PlainText.displayName = LabelPrimitive.Root.displayName;

export { PlainText };
