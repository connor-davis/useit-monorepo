import {
  getApiMaterialsByIdOptions,
  patchApiMaterialsByIdMutation,
} from '@/api-client/@tanstack/react-query.gen';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { createFileRoute, useParams, useRouter } from '@tanstack/react-router';
import { ArrowLeftIcon } from 'lucide-react';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { z } from 'zod';

import { Button } from '@use-it/ui/components/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@use-it/ui/components/form';
import { Input } from '@use-it/ui/components/input';
import { Label } from '@use-it/ui/components/label';
import { Textarea } from '@use-it/ui/components/textarea';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@use-it/ui/components/tooltip';
import { TextShimmer } from '@use-it/ui/motion-ui/text-shimmer';

import RoleGuard from '@/guards/role';

const editSchema = z.object({
  name: z.string().nonempty("Please fill in the material's name."),
  description: z
    .string()
    .nonempty("Please fill in the material's description."),
  gwCode: z
    .string()
    .nonempty("Please fill in the material's GW Code.")
    .regex(/^GW\s?\d+$/, 'Please enter a valid GW Code.'),
  carbonFactor: z
    .string()
    .nonempty("Please fill in the material's carbon factor."),
});

export const Route = createFileRoute('/_auth/materials/edit/$id')({
  component: () => (
    <RoleGuard roles={['admin']} isPage>
      <RouteComponent />
    </RoleGuard>
  ),
});

function RouteComponent() {
  const { id } = useParams({ from: '/_auth/materials/edit/$id' });

  const router = useRouter();
  const queryClient = useQueryClient();

  const { data: material, isLoading } = useQuery({
    ...getApiMaterialsByIdOptions({
      path: {
        id,
      },
    }),
  });

  const editForm = useForm<z.infer<typeof editSchema>>({
    resolver: zodResolver(editSchema),
    defaultValues: {
      name: '',
      description: '',
      gwCode: '',
      carbonFactor: '',
    },
  });

  useEffect(() => {
    const disposeable = setTimeout(() => {
      if (material) {
        editForm.reset({
          name: material.name,
          description: material.description,
          gwCode: material.gwCode,
          carbonFactor: material.carbonFactor,
        });
      }
    }, 0);

    return () => {
      clearTimeout(disposeable);
    };
  }, [material]);

  const editMaterial = useMutation({
    ...patchApiMaterialsByIdMutation(),
    onError: (error) =>
      toast.error('Failed', {
        description: error.message,
        duration: 2000,
      }),
    onSuccess: () => {
      toast.success('Success', {
        description: 'The material has been edited.',
        duration: 2000,
      });

      return queryClient.invalidateQueries({
        queryKey: getApiMaterialsByIdOptions({
          path: {
            id,
          },
        }),
      });
    },
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

      <Form {...editForm}>
        <form
          onSubmit={editForm.handleSubmit((values) =>
            editMaterial.mutate({
              path: {
                id,
              },
              body: values,
            })
          )}
          className="flex flex-col w-full h-auto gap-4 overflow-hidden"
        >
          <div className="flex flex-col w-full h-auto p-3 gap-3 text-center">
            <Label className="text-primary font-bold text-2xl">
              Edit Material
            </Label>
            <Label className="text-muted-foreground">
              Modify in the material's information below.
            </Label>
          </div>

          <div className="flex flex-col w-full h-auto gap-4 overflow-y-auto p-3">
            <FormField
              control={editForm.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Name" {...field} />
                  </FormControl>
                  <FormDescription>
                    What is the name of the material?
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={editForm.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Description" {...field} />
                  </FormControl>
                  <FormDescription>Describe the material.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={editForm.control}
              name="gwCode"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>GW Code</FormLabel>
                  <FormControl>
                    <Input placeholder="GW Code" {...field} />
                  </FormControl>
                  <FormDescription>
                    What is the GW Code of the material?
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={editForm.control}
              name="carbonFactor"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Carbon Factor</FormLabel>
                  <FormControl>
                    <Input placeholder="Carbon Factor" {...field} />
                  </FormControl>
                  <FormDescription>
                    What is the carbon factor of the material?
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <Button type="submit" className="w-full">
            Edit Material
          </Button>
        </form>
      </Form>
    </div>
  );
}
