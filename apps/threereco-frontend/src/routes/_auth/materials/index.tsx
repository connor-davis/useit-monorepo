import { getApiMaterialsOptions } from '@/api-client/@tanstack/react-query.gen';
import { useQuery } from '@tanstack/react-query';
import { Link, createFileRoute } from '@tanstack/react-router';
import { PencilIcon, PlusIcon } from 'lucide-react';
import { useState } from 'react';

import { Button } from '@use-it/ui/components/button';
import { DebounceInput } from '@use-it/ui/components/debounce-input';
import { Label } from '@use-it/ui/components/label';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@use-it/ui/components/tooltip';
import { TextShimmer } from '@use-it/ui/motion-ui/text-shimmer';

import DeleteMaterialDialog from '@/components/dialogs/materials/delete';
import RoleGuard from '@/guards/role';

export const Route = createFileRoute('/_auth/materials/')({
  component: () => (
    <RoleGuard roles={['admin']} isPage>
      <RouteComponent />
    </RoleGuard>
  ),
});

function RouteComponent() {
  const [searchValue, setSearchValue] = useState('');

  const { data: materials, isLoading } = useQuery({
    ...getApiMaterialsOptions(),
  });

  if (isLoading) {
    return (
      <div className="flex flex-col w-full h-full items-center justify-center gap-3 p-3">
        <TextShimmer>Loading materials...</TextShimmer>
      </div>
    );
  }

  return (
    <div className="flex flex-col w-full h-full overflow-hidden gap-3 p-3">
      <div className="flex flex-col lg:flex-row gap-3 lg:items-center lg:justify-between">
        <Label className="font-bold text-lg">Materials</Label>

        <div className="flex items-center gap-3">
          <DebounceInput
            type="text"
            placeholder="Search by name..."
            defaultValue={searchValue}
            value={searchValue}
            onChange={(event) => {
              setSearchValue(event.target.value);
            }}
          />
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="shrink-0"
                asChild
              >
                <Link to="/materials/create">
                  <PlusIcon className="size-4" />
                </Link>
              </Button>
            </TooltipTrigger>
            <TooltipContent>Add Material</TooltipContent>
          </Tooltip>
        </div>
      </div>

      <div className="flex flex-col w-full h-full overflow-y-auto gap-3">
        {materials?.length === 0 && (
          <div className="flex flex-col w-full h-full items-center justify-center gap-3 p-3">
            <Label className="text-muted-foreground">No materials found.</Label>
          </div>
        )}

        {materials
          ?.filter((material) =>
            material.name.toLowerCase().includes(searchValue.toLowerCase())
          )
          .map((material) => (
            <div className="flex items-center w-full h-auto p-1 rounded-md border">
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    className="w-full justify-start"
                    asChild
                  >
                    <Link to={`/materials/$id`} params={{ id: material.id }}>
                      <div className="flex items-center gap-1">
                        <Label>{material.name}</Label>
                      </div>
                    </Link>
                  </Button>
                </TooltipTrigger>
                <TooltipContent>View Material</TooltipContent>
              </Tooltip>

              <div className="flex items-center w-auto h-auto gap-1">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="ghost" size="icon" asChild>
                      <Link
                        to={`/materials/edit/$id`}
                        params={{ id: material.id }}
                      >
                        <PencilIcon className="size-4" />
                      </Link>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>Edit Material</TooltipContent>
                </Tooltip>
                <DeleteMaterialDialog id={material.id} />
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
