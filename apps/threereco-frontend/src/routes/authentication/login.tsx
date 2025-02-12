import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/authentication/login')({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/authentication/login"!</div>;
}
