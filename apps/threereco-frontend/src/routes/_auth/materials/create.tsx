import { postApiMaterialsMutation } from '@/api-client/@tanstack/react-query.gen';
import { useMutation } from '@tanstack/react-query';
import { createFileRoute, useRouter } from '@tanstack/react-router';
import { ArrowLeftIcon } from 'lucide-react';
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

import RoleGuard from '@/guards/role';

const createSchema = z.object({
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

export const Route = createFileRoute('/_auth/materials/create')({
  component: () => (
    <RoleGuard roles={['admin']} isPage>
      <RouteComponent />
    </RoleGuard>
  ),
});

function RouteComponent() {
  const router = useRouter();

  const createForm = useForm<z.infer<typeof createSchema>>({
    resolver: zodResolver(createSchema),
    defaultValues: {
      name: '',
      description: '',
      gwCode: '',
      carbonFactor: '',
    },
  });

  const createMaterial = useMutation({
    ...postApiMaterialsMutation(),
    onError: (error) =>
      toast.error('Failed', {
        description: error.message,
        duration: 2000,
      }),
    onSuccess: () =>
      toast.success('Success', {
        description: 'The material has been created.',
        duration: 2000,
        onAutoClose: () => {},
      }),
  });

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

      <Form {...createForm}>
        <form
          onSubmit={createForm.handleSubmit((values) =>
            createMaterial.mutate({
              body: values,
            })
          )}
          className="flex flex-col w-full h-full gap-4 overflow-hidden"
        >
          <div className="flex flex-col w-full h-auto p-3 gap-3 text-center">
            <Label className="text-primary font-bold text-2xl">
              Create Material
            </Label>
            <Label className="text-muted-foreground">
              Please fill in the new material's information below.
            </Label>
          </div>

          <div className="flex flex-col w-full h-auto gap-4 overflow-y-auto p-3">
            <FormField
              control={createForm.control}
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
              control={createForm.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Description" {...field} />
                  </FormControl>
                  <FormDescription>Describe the new material.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={createForm.control}
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
              control={createForm.control}
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
            Create Material
          </Button>
        </form>
      </Form>
    </div>
  );
}
