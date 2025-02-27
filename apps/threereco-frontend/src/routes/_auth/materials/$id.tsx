import { getApiMaterialsByIdOptions } from '@/api-client/@tanstack/react-query.gen';
import { useQuery } from '@tanstack/react-query';
import {
  Link,
  createFileRoute,
  useParams,
  useRouter,
} from '@tanstack/react-router';
import { ArrowLeftIcon } from 'lucide-react';

import { Button } from '@use-it/ui/components/button';
import { Label } from '@use-it/ui/components/label';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@use-it/ui/components/tooltip';
import { TextShimmer } from '@use-it/ui/motion-ui/text-shimmer';

import DeleteMaterialDialog from '@/components/dialogs/materials/delete';
import RoleGuard from '@/guards/role';

export const Route = createFileRoute('/_auth/materials/$id')({
  component: () => (
    <RoleGuard roles={['admin']} isPage>
      <RouteComponent />
    </RoleGuard>
  ),
});

function RouteComponent() {
  const { id } = useParams({ from: '/_auth/materials/$id' });

  const router = useRouter();

  const { data: material, isLoading } = useQuery({
    ...getApiMaterialsByIdOptions({
      path: {
        id,
      },
    }),
  });

  if (isLoading) {
    return (
      <div className="flex flex-col w-full h-full items-center justify-center gap-3 p-3">
        <TextShimmer>Loading material...</TextShimmer>
      </div>
    );
  }

  if (!material) {
    return (
      <div className="flex flex-col w-full h-full items-center justify-center gap-3 p-3">
        <Label className="text-2xl font-bold text-primary">
          Material not found
        </Label>
        <Label className="text-muted-foreground">
          The material you are trying to edit does not exist.
        </Label>
      </div>
    );
  }

  return (
    <div className="flex flex-col w-full h-full overflow-hidden gap-3 p-3">
      <div className="flex flex-col lg:flex-row gap-3 lg:items-center lg:justify-between">
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => router.history.back()}
            >
              <ArrowLeftIcon className="size-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>Back</TooltipContent>
        </Tooltip>
      </div>

      <div className="flex flex-col w-full h-auto items-center gap-4 overflow-hidden p-1">
        <div className="flex flex-col w-full h-auto p-3 gap-3 text-center">
          <Label className="text-primary font-bold text-2xl">
            Material Overview
          </Label>
          <Label className="text-muted-foreground">
            The material's information is displayed below.
          </Label>
        </div>

        <div className="flex flex-col w-full lg:w-1/3 h-auto overflow-y-auto gap-10">
          <div className="flex flex-col w-full h-auto gap-3">
            <div className="grid grid-cols-3 w-full h-auto gap-3">
              <Label className="font-bold">Name</Label>
              <Label className="col-span-2">{material.name}</Label>
            </div>

            <div className="grid grid-cols-3 w-full h-auto gap-3">
              <Label className="font-bold">Description</Label>
              <Label className="col-span-2">{material.description}</Label>
            </div>

            <div className="grid grid-cols-3 w-full h-auto gap-3">
              <Label className="font-bold">GW Code</Label>
              <Label className="col-span-2">{material.gwCode}</Label>
            </div>

            <div className="grid grid-cols-3 w-full h-auto gap-3">
              <Label className="font-bold">Carbon Factor</Label>
              <Label className="col-span-2">{material.carbonFactor}</Label>
            </div>
          </div>

          <div className="flex flex-col w-full h-auto gap-3">
            <Button asChild className="w-full">
              <Link to={`/materials/edit/$id`} params={{ id }}>
                Edit Material
              </Link>
            </Button>

            <DeleteMaterialDialog
              id={id}
              onDeleted={() => router.history.back()}
            >
              <Button variant="destructive" className="w-full">
                Delete Material
              </Button>
            </DeleteMaterialDialog>
          </div>
        </div>
      </div>
    </div>
  );
}
