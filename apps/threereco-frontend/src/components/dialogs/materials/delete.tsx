import {
  deleteApiMaterialsByIdMutation,
  getApiMaterialsQueryKey,
} from '@/api-client/@tanstack/react-query.gen';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { TrashIcon } from 'lucide-react';

import { toast } from 'sonner';

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@use-it/ui/components/alert-dialog';
import { Button } from '@use-it/ui/components/button';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@use-it/ui/components/tooltip';

export default function DeleteMaterialDialog({
  id,
  children,
  onDeleted,
}: {
  id: string;
  children?: React.ReactNode;
  onDeleted?: () => void;
}) {
  const queryClient = useQueryClient();

  const deleteMaterial = useMutation({
    ...deleteApiMaterialsByIdMutation(),
    onError: (error) =>
      toast.error('Failed', {
        description: error.message,
      }),
    onSuccess: () => {
      toast.success('Success', {
        description: 'The material was deleted.',
        duration: 2000,
      });

      if (onDeleted) onDeleted();

      return queryClient.invalidateQueries({
        queryKey: getApiMaterialsQueryKey(),
      });
    },
  });

  return (
    <Tooltip>
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <TooltipTrigger>
            {children ?? (
              <Button variant="ghost" size="icon">
                <TrashIcon className="size-4" />
              </Button>
            )}
          </TooltipTrigger>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              By clicking <span className="text-primary">"Continue"</span> the
              material and all of it's data will be permanently removed.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() =>
                deleteMaterial.mutate({
                  path: {
                    id,
                  },
                })
              }
            >
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      <TooltipContent hidden={children !== undefined}>
        Delete Material
      </TooltipContent>
    </Tooltip>
  );
}
