import { Link, createFileRoute, useNavigate } from '@tanstack/react-router';
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

import { authClient } from '@/lib/auth-client';

export const Route = createFileRoute('/authentication/login')({
  component: RouteComponent,
});

const loginSchema = z.object({
  email: z.string().email('Please enter a valid email address.'),
  password: z.string().min(8, 'Password must be at least 8 characters.'),
});

function RouteComponent() {
  const navigate = useNavigate();

  const loginForm = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  return (
    <div className="flex flex-col w-full h-full items-center justify-center p-3">
      <div className="flex flex-col w-auto h-auto p-3 gap-6 bg-background border rounded-md">
        <div className="flex flex-col w-full h-auto gap-3 text-center">
          <Label className="text-primary font-bold text-2xl">
            3rEco Authentication
          </Label>
          <Label className="text-muted-foreground">
            Please enter your email and password below to authenticate.
          </Label>
        </div>
        <Form {...loginForm}>
          <form
            className="flex flex-col w-full h-auto gap-3"
            onSubmit={loginForm.handleSubmit(async (data) => {
              const result = await authClient.signIn.email({
                email: data.email,
                password: data.password,
              });

              if (result.error)
                return toast.error('Failed', {
                  description: result.error.message,
                  duration: 2000,
                });

              return toast.success('Success', {
                description: 'You have successfully authenticated.',
                duration: 2000,
                onAutoClose: () => navigate({ to: '/', replace: true }),
              });
            })}
          >
            <FormField
              control={loginForm.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input type="email" placeholder="Email" {...field} />
                  </FormControl>
                  <FormDescription>Enter your email address.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={loginForm.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="Password" {...field} />
                  </FormControl>
                  <FormDescription>Enter your password.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit">Continue</Button>

            <div className="flex items-center gap-3">
              <Label className="text-muted-foreground">
                Don't have an account?
              </Label>
              <Link to="/authentication/register">
                <Label className="text-primary" asChild>
                  <p>Create One</p>
                </Label>
              </Link>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}
