'use client'
import {cn} from "@/lib/utils"
import {Button} from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    Field,
    FieldDescription, FieldError,
    FieldGroup,
    FieldLabel,
} from "@/components/ui/field"
import {Input} from "@/components/ui/input"
import {ComponentProps} from "react";
import {useMutation} from "@tanstack/react-query";
import {toast} from "sonner";
import {useForm} from "react-hook-form";
import {DepartmentSignupInput, departmentSignupSchema} from "@/lib/validations/auth";
import {zodResolver} from "@hookform/resolvers/zod";
import {getError} from "@/lib/error";
import Link from "next/link";
import {signUpDepartmentAction} from "@/actions/signup-actions";

export function SignUpForm({
                               className,
                               ...props
                           }: ComponentProps<"div">) {
    const form = useForm<DepartmentSignupInput>({
        resolver: zodResolver(departmentSignupSchema),
        defaultValues: {
            departmentCode: "",
            departmentName: "",
            email: "",
            password: "",
            confirmPassword: ""
        }
    });
    const {register, handleSubmit, formState: {errors}} = form;

    const {mutate, isPending} = useMutation({
        mutationFn: signUpDepartmentAction,
        onError: (err) => {
            const errorData = getError(err);
            if (errorData) {
                toast.error(errorData.title, {
                    description: errorData.description
                });
            }
        }
    });

    return (
        <form onSubmit={handleSubmit((data) => mutate(data))}>
        <FieldGroup>
            <Field>
                <FieldLabel htmlFor="departmentCode">Department Code</FieldLabel>
                <Input
                    id="departmentCode"
                    placeholder="CCS"
                    {...register("departmentCode")}
                />
                {errors.departmentCode && (
                    <FieldError>{errors.departmentCode.message}</FieldError>
                )}
            </Field>

            <Field>
                <FieldLabel htmlFor="departmentName">Department Name</FieldLabel>
                <Input
                    id="departmentName"
                    placeholder="College of Computer Studies"
                    {...register("departmentName")}
                />
                {errors.departmentName && (
                    <FieldError>{errors.departmentName.message}</FieldError>
                )}
            </Field>

            <Field>
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <Input
                    id="email"
                    type="email"
                    placeholder="m@example.com"
                    {...register("email")}
                />
                {errors.email && (
                    <FieldError>{errors.email.message}</FieldError>
                )}
            </Field>

            <Field className="grid grid-cols-2 gap-4">
                <Field>
                    <FieldLabel htmlFor="password">Password</FieldLabel>
                    <Input
                        id="password"
                        type="password"
                        {...register("password")}
                    />
                    {errors.password && (
                        <FieldError>{errors.password.message}</FieldError>
                    )}
                </Field>
                <Field>
                    <FieldLabel htmlFor="confirmPassword">Confirm Password</FieldLabel>
                    <Input
                        id="confirmPassword"
                        type="password"
                        {...register("confirmPassword")}
                    />
                    {errors.confirmPassword && (
                        <FieldError>{errors.confirmPassword.message}</FieldError>
                    )}
                </Field>
            </Field>

            <Button type="submit" disabled={isPending} className="w-full">
                {isPending ? "Setting up your profile..." : "Create Account"}
            </Button>
        </FieldGroup>
    </form>
    )
}
