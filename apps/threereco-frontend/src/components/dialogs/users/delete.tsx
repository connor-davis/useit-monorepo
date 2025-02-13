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

import { authClient } from '@/lib/auth-client';

export default function DeleteUserDialog({
  userId,
  onDeleted,
}: {
  userId: string;
  onDeleted: () => void;
}) {
  return (
    <Tooltip>
      <AlertDialog>
        <AlertDialogTrigger>
          <TooltipTrigger>
            <Button variant="ghost" size="icon">
              <TrashIcon className="size-4" />
            </Button>
          </TooltipTrigger>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              By clicking <span className="text-primary">"Continue"</span> the
              user and all of their data will be permanently removed.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={async () => {
                const { data } = await authClient.admin.removeUser({
                  userId,
                });

                if (data?.success) {
                  toast.success('Success', {
                    description: 'The user has been deleted.',
                    duration: 2000,
                  });

                  onDeleted();
                }
              }}
            >
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      <TooltipContent>Delete User</TooltipContent>
    </Tooltip>
  );
}
