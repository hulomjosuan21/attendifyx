"use client"
import { Field, FieldLabel, FieldDescription, FieldError } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import {UpdatePasswordFormInput, updatePasswordSchema} from "@/lib/validations/update-password";
import {useMutation} from "@tanstack/react-query";
import {updatePasswordAction} from "@/actions/forgot-password-actions";
import {getError} from "@/lib/error";
import {toast} from "sonner";

export default function UpdatePasswordForm() {
    const form = useForm<UpdatePasswordFormInput>({
        resolver: zodResolver(updatePasswordSchema),
        defaultValues: {
            password: "",
            confirmPassword: "",
        },
    });

    const {mutate, isPending} = useMutation({
        mutationFn: updatePasswordAction,
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
                    <Field>
                        <FieldLabel>New Password</FieldLabel>
                        <Input
                            type="password"
                            {...register("password")}
                        />
                        <FieldDescription>
                            Must be at least 8 characters long.
                        </FieldDescription>
                        {errors.password && <FieldError>{errors.password.message}</FieldError>}
                    </Field>
                    <Field>
                        <FieldLabel>Confirm Password</FieldLabel>
                        <Input
                            type="password"
                            {...register("confirmPassword")}
                        />
                        {errors.confirmPassword && (
                            <FieldError>{errors.confirmPassword.message}</FieldError>
                        )}
                    </Field>

                <Button type="submit" className="w-full mt-4" disabled={isPending}>
                    {isPending ? "Saving..." : "Update Password"}
                </Button>
            </Field>
        </form>
    )
}