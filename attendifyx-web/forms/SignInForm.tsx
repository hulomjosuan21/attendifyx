'use client'
import {Button} from "@/components/ui/button"
import {Input} from "@/components/ui/input"
import {FaGoogle, FaFingerprint} from "react-icons/fa";
import Link from "next/link"
import {DepartmentSigninInput, departmentSigninSchema} from "@/lib/validations/auth";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {useMutation} from "@tanstack/react-query";
import {getError} from "@/lib/error";
import {toast} from "sonner";
import {
    Field,
    FieldDescription, FieldError,
    FieldGroup,
    FieldLabel,
    FieldSeparator,
} from "@/components/ui/field"
import {signInDepartmentAction, signInWithOAuth} from "@/actions/signin-actions";
import {useEffect} from "react";

export function SignInForm() {
    const form = useForm<DepartmentSigninInput>({
        resolver: zodResolver(departmentSigninSchema),
        defaultValues: {
            email: "",
            password: ""
        }
    })

    const {mutate: oauthMutate, isPending: isOAuthPending} = useMutation({
        mutationFn: async (provider: 'google') => {
            return await signInWithOAuth(provider);
        },
        onError: (err) => {
            const errorData = getError(err);
            if (errorData) {
                toast.error(errorData.title, {
                    description: errorData.description
                });
            }
        }
    });

    const handleSignInWithOAuth = (provider: 'google') => {
        oauthMutate(provider);
    };
    const {mutate, isPending} = useMutation({
        mutationFn: signInDepartmentAction,
        onError: (err) => {
            const errorData = getError(err);
            if (errorData) {
                toast.error(errorData.title, {
                    description: errorData.description
                });
            }
        }
    });

    const {register, handleSubmit, formState: {errors}} = form;

    return (
        <form onSubmit={handleSubmit((data) => mutate(data))}>
            <FieldGroup>
                <Field>
                    <Button variant="outline" type="button">
                        <FaFingerprint/>
                        Sign in with SAML SSO
                    </Button>
                    <Button variant="outline" type="button" disabled={isOAuthPending}
                            onClick={() => handleSignInWithOAuth('google')}>
                        <FaGoogle/>
                        Login with Google
                    </Button>
                </Field>
                <FieldSeparator className="*:data-[slot=field-separator-content]:bg-card">
                    Or continue with
                </FieldSeparator>
                <Field>
                    <FieldLabel htmlFor="email">Email</FieldLabel>
                    <Input
                        id="email"
                        type="email"
                        placeholder="m@example.com"
                        {...register('email')}
                    />
                    {errors.email && (
                        <FieldError>{errors.email.message}</FieldError>
                    )}
                </Field>
                <Field>
                    <div className="flex w-full items-center justify-between gap-4">
                        <FieldLabel htmlFor="password">Password</FieldLabel>
                        <Link href="/forgot-password" className="ml-auto inline-block text-xs underline-offset-4 hover:underline">Forgot your password?</Link>
                    </div>
                    <Input id="password" type="password" {...register('password')}/>
                    {errors.password && (
                        <FieldError>{errors.password.message}</FieldError>
                    )}
                </Field>
                <Field>
                    <Button type="submit" disabled={isPending}>{isPending ? "Signing in..." : "Sign In"}</Button>
                    <FieldDescription className="text-center">
                        Don&apos;t have an account? <Link href="/auth/sign-up">Sign up</Link>
                    </FieldDescription>
                </Field>
            </FieldGroup>
        </form>
    )
}
