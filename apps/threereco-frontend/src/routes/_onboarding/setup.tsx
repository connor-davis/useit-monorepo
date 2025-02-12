import {
  getApiProfileOptions,
  getApiProfileQueryKey,
  patchApiOnboardingSetRoleByRoleMutation,
  postApiBusinessesMutation,
  postApiCollectorsMutation,
} from '@/api-client/@tanstack/react-query.gen';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { createFileRoute, useNavigate } from '@tanstack/react-router';
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@use-it/ui/components/select';
import { Textarea } from '@use-it/ui/components/textarea';

export const Route = createFileRoute('/_onboarding/setup')({
  component: RouteComponent,
});

const businessSchema = z.object({
  type: z.enum(['Recycler', 'Waste Collector', 'Buy Back Centre']),
  description: z.string(),
  phoneNumber: z.string(),
  address: z.string(),
  city: z.string(),
  province: z.string(),
  zipCode: z.string(),
});

const collectorSchema = z.object({
  idNumber: z.string(),
  phoneNumber: z.string(),
  address: z.string(),
  city: z.string(),
  province: z.string(),
  zipCode: z.string(),
  paymentName: z.string(),
  paymentAccountHolder: z.string(),
  paymentAccountNumber: z.string(),
});

function RouteComponent() {
  const navigate = useNavigate();

  const { data: profile } = useQuery({
    ...getApiProfileOptions(),
  });

  const queryClient = useQueryClient();

  const updateUserRole = useMutation({
    ...patchApiOnboardingSetRoleByRoleMutation(),
    onError: (error) =>
      toast.error('Failed', {
        description: error.message,
        duration: 2000,
      }),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: getApiProfileQueryKey() }),
  });

  const createBusinessProfile = useMutation({
    ...postApiBusinessesMutation(),
    onError: (error) =>
      toast.error('Failed', {
        description: error.message,
        duration: 2000,
      }),
    onSuccess: () =>
      toast.success('Success', {
        description: "Your business's profile information has been saved.",
        duration: 2000,
        onAutoClose: () => {
          queryClient.invalidateQueries({ queryKey: getApiProfileQueryKey() });

          return navigate({ to: '/' });
        },
      }),
  });

  const createCollectorProfile = useMutation({
    ...postApiCollectorsMutation(),
    onError: (error) =>
      toast.error('Failed', {
        description: error.message,
        duration: 2000,
      }),
    onSuccess: () =>
      toast.success('Success', {
        description: 'Your profile information has been saved.',
        duration: 2000,
        onAutoClose: () => {
          queryClient.invalidateQueries({ queryKey: getApiProfileQueryKey() });

          return navigate({ to: '/' });
        },
      }),
  });

  const businessForm = useForm<z.infer<typeof businessSchema>>({
    resolver: zodResolver(businessSchema),
  });

  const collectorForm = useForm<z.infer<typeof collectorSchema>>({
    resolver: zodResolver(collectorSchema),
  });

  if (profile?.role === 'user')
    return (
      <div className="flex flex-col w-full h-full items-center justify-center">
        <div className="flex flex-col w-auto h-auto p-3 gap-5 bg-background border rounded-md">
          <div className="flex flex-col w-full h-auto gap-3 text-center">
            <Label className="text-primary font-bold text-2xl">Welcome</Label>
            <Label className="text-muted-foreground">
              Please select your role below to continue.
            </Label>
          </div>

          <Select
            onValueChange={(value: 'business' | 'collector') =>
              updateUserRole.mutate({
                path: {
                  role: value,
                },
              })
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="Select a role." />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="business">Business</SelectItem>
              <SelectItem value="collector">Collector</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    );

  if (profile?.role === 'business')
    return (
      <div className="flex flex-col w-full h-full items-center justify-center p-3">
        <Form {...businessForm}>
          <form
            onSubmit={businessForm.handleSubmit((values) =>
              createBusinessProfile.mutate({
                body: {
                  userId: profile.id,
                  ...values,
                },
              })
            )}
            className="flex flex-col w-full lg:w-1/2 h-auto p-3 gap-10 bg-background border rounded-md overflow-hidden"
          >
            <div className="flex flex-col w-full h-auto gap-3 text-center">
              <Label className="text-primary font-bold text-2xl">
                Business Setup
              </Label>
              <Label className="text-muted-foreground">
                Please fill in your business's information below.
              </Label>
            </div>

            <div className="flex flex-col w-full h-auto gap-5 overflow-y-auto">
              <Label className="text-primary font-bold">Profile Details</Label>

              <div className="flex flex-col w-full h-auto gap-3">
                <FormField
                  control={businessForm.control}
                  name="type"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Type</FormLabel>
                      <Select
                        value={field.value}
                        onValueChange={field.onChange}
                      >
                        <SelectTrigger>
                          <FormControl>
                            <SelectValue
                              placeholder="Select a business type."
                              {...field}
                            />
                          </FormControl>
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Recycler">Recycler</SelectItem>
                          <SelectItem value="Waste Collector">
                            Waste Collector
                          </SelectItem>
                          <SelectItem value="Buy Back Centre">
                            Buy Back Centre
                          </SelectItem>
                        </SelectContent>
                      </Select>
                      <FormDescription>
                        Please select the type of business.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={businessForm.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Textarea placeholder="Description" {...field} />
                      </FormControl>
                      <FormDescription>
                        Please provide a description of your business.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={businessForm.control}
                  name="phoneNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone Number</FormLabel>
                      <FormControl>
                        <Input
                          type="tel"
                          placeholder="Phone Number"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        Please provide a phone number for your business.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <Label className="text-primary font-bold">Location Details</Label>

              <div className="flex flex-col w-full h-auto gap-3">
                <FormField
                  control={businessForm.control}
                  name="address"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Address</FormLabel>
                      <FormControl>
                        <Textarea placeholder="Address" {...field} />
                      </FormControl>
                      <FormDescription>
                        Please provide the address of your business.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={businessForm.control}
                  name="city"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>City</FormLabel>
                      <FormControl>
                        <Input placeholder="City" {...field} />
                      </FormControl>
                      <FormDescription>
                        Please provide the city your business is located in.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={businessForm.control}
                  name="province"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Province</FormLabel>
                      <FormControl>
                        <Input placeholder="Province" {...field} />
                      </FormControl>
                      <FormDescription>
                        Please provide the province your business is located in.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={businessForm.control}
                  name="zipCode"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Zip Code</FormLabel>
                      <FormControl>
                        <Input placeholder="Zip Code" {...field} />
                      </FormControl>
                      <FormDescription>
                        Please provide the zip code your business is located in.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <Button type="submit">Continue</Button>

            <Button
              type="button"
              variant="outline"
              onClick={() => updateUserRole.mutate({ path: { role: 'user' } })}
            >
              Cancel
            </Button>
          </form>
        </Form>
      </div>
    );

  if (profile?.role === 'collector')
    return (
      <div className="flex flex-col w-full h-full items-center justify-center p-3">
        <Form {...collectorForm}>
          <form
            onSubmit={collectorForm.handleSubmit((values) =>
              createCollectorProfile.mutate({
                body: {
                  userId: profile.id,
                  ...values,
                },
              })
            )}
            className="flex flex-col w-full lg:w-1/2 h-auto p-3 gap-10 bg-background border rounded-md overflow-hidden"
          >
            <div className="flex flex-col w-full h-auto gap-3 text-center">
              <Label className="text-primary font-bold text-2xl">
                Collector Setup
              </Label>
              <Label className="text-muted-foreground">
                Please fill in your information below.
              </Label>
            </div>

            <div className="flex flex-col w-full h-auto gap-5 overflow-y-auto">
              <Label className="text-primary font-bold">Profile Details</Label>

              <div className="flex flex-col w-full h-auto gap-3">
                <FormField
                  control={collectorForm.control}
                  name="idNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>ID Number</FormLabel>
                      <FormControl>
                        <Input type="text" placeholder="ID Number" {...field} />
                      </FormControl>
                      <FormDescription>
                        Please provide your ID number.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={collectorForm.control}
                  name="phoneNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone Number</FormLabel>
                      <FormControl>
                        <Input
                          type="tel"
                          placeholder="Phone Number"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        Please provide a phone number.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <Label className="text-primary font-bold">Location Details</Label>

              <div className="flex flex-col w-full h-auto gap-3">
                <FormField
                  control={collectorForm.control}
                  name="address"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Address</FormLabel>
                      <FormControl>
                        <Textarea placeholder="Address" {...field} />
                      </FormControl>
                      <FormDescription>
                        Please provide your address.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={collectorForm.control}
                  name="city"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>City</FormLabel>
                      <FormControl>
                        <Input placeholder="City" {...field} />
                      </FormControl>
                      <FormDescription>
                        Please provide the city you are located in.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={collectorForm.control}
                  name="province"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Province</FormLabel>
                      <FormControl>
                        <Input placeholder="Province" {...field} />
                      </FormControl>
                      <FormDescription>
                        Please provide the province you are located in.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={collectorForm.control}
                  name="zipCode"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Zip Code</FormLabel>
                      <FormControl>
                        <Input placeholder="Zip Code" {...field} />
                      </FormControl>
                      <FormDescription>
                        Please provide the zip code you are located in.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <Label className="text-primary font-bold">Payment Details</Label>

              <div className="flex flex-col w-full h-auto gap-3">
                <FormField
                  control={collectorForm.control}
                  name="paymentName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Payment Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Payment Name" {...field} />
                      </FormControl>
                      <FormDescription>
                        Please provide the name of the payment account.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={collectorForm.control}
                  name="paymentAccountHolder"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Payment Account Holder</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Payment Account Holder"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        Please provide the account holder of the payment
                        account.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={collectorForm.control}
                  name="paymentAccountNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Payment Account Number</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Payment Account Number"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        Please provide the account number of the payment
                        account.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <Button type="submit">Continue</Button>

            <Button
              type="button"
              variant="outline"
              onClick={() => updateUserRole.mutate({ path: { role: 'user' } })}
            >
              Cancel
            </Button>
          </form>
        </Form>
      </div>
    );
}
