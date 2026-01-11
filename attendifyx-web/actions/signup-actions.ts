'use server'

import {departmentSignupSchema} from "@/lib/validations/auth";
import {departmentRepo} from "@/lib/db/repositories/department.repo";
import {createServerSupabaseClient} from "@/lib/supabase/server";
import {redirect} from "next/navigation";
import {throwActionError} from "@/lib/error";

export async function signUpDepartmentAction(rawData: unknown) {
    const validated = departmentSignupSchema.safeParse(rawData);
    if (!validated.success) throw new Error("Invalid Data");

    const {email, password, ...dbFields} = validated.data;
    const supabase = await createServerSupabaseClient();

    const {data: authData, error} = await supabase.auth.signUp({email, password});
    if (error) throw new Error(error.message);

    let successMessage = "";

    try {
        const newDepartment = await departmentRepo.insertDepartment({
            ...dbFields,
            authId: authData.user!.id,
        });

        const {departmentName} = newDepartment;
        successMessage = `Welcome to the system, ${departmentName}! Your department account has been successfully created.`;

    } catch (dbError: any) {
        // ERROR 1: Conflict (Duplicate)
        if (dbError.code === '23505') {
            throwActionError(
                "Name already taken",
                "This department is already registered. Please try a different name or code."
            );
        }

        // ERROR 2: General System Issue
        throwActionError(
            "Registration issue",
            "We couldn't set up your department account right now. Please try again later."
        );
    }

    // 2. Redirect MUST happen outside of the try/catch block
    return redirect(`/auth/sign-in?signed_up=success&message=${encodeURIComponent(successMessage)}`);
}