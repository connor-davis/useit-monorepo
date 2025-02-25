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

export const Route = createFileRoute('/authentication/register')({
  component: RouteComponent,
});

const registerSchema = z.object({
  name: z.string(),
  email: z.string().email('Please enter a valid email address.'),
  password: z.string().min(8, 'Password must be at least 8 characters.'),
});

function RouteComponent() {
  const navigate = useNavigate();

  const registerForm = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
    },
  });

  return (
    <div className="flex flex-col w-full h-full items-center justify-center p-3">
      <div className="flex flex-col w-auto h-auto p-3 gap-6 bg-background border rounded-md">
        <div className="flex flex-col w-full h-auto gap-3 text-center">
          <Label className="text-primary font-bold text-2xl">
            3rEco Registration
          </Label>
          <Label className="text-muted-foreground">
            Please enter your email and password below to authenticate.
          </Label>
        </div>
        <Form {...registerForm}>
          <form
            className="flex flex-col w-full h-auto gap-3"
            onSubmit={registerForm.handleSubmit(async (data) => {
              const result = await authClient.signUp.email({
                name: data.name,
                email: data.email,
                password: data.password,
              });

              if (result.error)
                return toast.error('Failed', {
                  description: result.error.message,
                  duration: 2000,
                });

              return toast.success('Success', {
                description: 'You have successfully registered.',
                duration: 2000,
                onAutoClose: () => navigate({ to: '/', replace: true }),
              });
            })}
          >
            <FormField
              control={registerForm.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input type="text" placeholder="Name" {...field} />
                  </FormControl>
                  <FormDescription>Enter your name.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={registerForm.control}
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
              control={registerForm.control}
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
                Already have an account?
              </Label>
              <Link to="/authentication/login">
                <Label className="text-primary" asChild>
                  <p>Authenticate</p>
                </Label>
              </Link>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}
