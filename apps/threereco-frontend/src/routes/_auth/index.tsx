import { createFileRoute } from '@tanstack/react-router';

import { Label } from '@use-it/ui/components/label';

export const Route = createFileRoute('/_auth/')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="relative flex flex-col size-full">
      <div className="flex flex-col size-full bg-background border rounded-md p-3 gap-3 items-center justify-center">
        <Label className="text-muted-foreground">Welcome to 3rEco.</Label>
      </div>
    </div>
  );
}
