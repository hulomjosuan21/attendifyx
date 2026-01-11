"use client"
import {Field, FieldLabel, FieldDescription, FieldError} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import {Button} from "@/components/ui/button";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {ForgotPasswordInput, forgotPasswordSchema} from "@/lib/validations/forgot-password";
import {useMutation} from "@tanstack/react-query";
import {signInDepartmentAction} from "@/actions/signin-actions";
import {getError} from "@/lib/error";
import {toast} from "sonner";
import {sendPasswordResetEmailAction} from "@/actions/forgot-password-actions";
import {useState} from "react";
import { Turnstile } from "@marsidev/react-turnstile";

export default function ForgotPasswordForm() {
    const [captchaToken, setCaptchaToken] = useState<string | null>(null);

    const form = useForm<ForgotPasswordInput>({
        resolver: zodResolver(forgotPasswordSchema),
        defaultValues: {
            email: "",
        }
    })

    const {mutate, isPending} = useMutation({
        mutationFn: (data: ForgotPasswordInput) => sendPasswordResetEmailAction(data, captchaToken),
        onError: (err) => {
            const errorData = getError(err);
            if (errorData) {
                toast.error(errorData.title, {
                    description: errorData.description
                });
            }
        }
    });

    const {register, handleSubmit, formState: {errors}} = form

  return (
      <form onSubmit={handleSubmit((data) => mutate(data))} className="space-y-4">
          <Field>
              <FieldLabel>Email Address</FieldLabel>
              <Input
                  type="email"
                  placeholder="name@example.com"
                  {...register("email")}
              />
              {errors.email && (
                  <FieldError>{errors.email.message}</FieldError>
              )}
              <FieldDescription>
                  We'll send a secure link to this email.
              </FieldDescription>
          </Field>

          <div className="flex justify-center">
              <Turnstile
                  siteKey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY!}
                  onSuccess={(token) => setCaptchaToken(token)}
                  onExpire={() => setCaptchaToken(null)}
              />
          </div>

          <Button type="submit" className="w-full" disabled={isPending}>
              {isPending ? "Sending..." : "Send Reset Link"}
          </Button>
      </form>
  )
}
