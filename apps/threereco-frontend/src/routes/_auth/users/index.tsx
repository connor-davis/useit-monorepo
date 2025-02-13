import { createFileRoute } from '@tanstack/react-router';

import { Label } from '@use-it/ui/components/label';

import RoleGuard from '@/guards/role';

export const Route = createFileRoute('/_auth/users/')({
  component: () => (
    <RoleGuard roles={['admin']}>
      <RouteComponent />
    </RoleGuard>
  ),
});

function RouteComponent() {
  return (
    <div className="flex flex-col w-full h-full overflow-hidden gap-3">
      <div className="flex flex-col lg:flex-row gap-3 items-center lg:justify-between">
        <Label className="font-bold text-lg">Users</Label>
      </div>
    </div>
  );
}
