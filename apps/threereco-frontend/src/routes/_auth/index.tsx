import { createFileRoute } from '@tanstack/react-router';

import { Label } from '@use-it/ui/components/label';

export const Route = createFileRoute('/_auth/')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="flex flex-col size-full items-center justify-center">
      <Label className="text-muted-foreground">Welcome to 3rEco.</Label>
    </div>
  );
}
