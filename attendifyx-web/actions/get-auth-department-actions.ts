"use server";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import { departmentRepo } from "@/lib/db/repositories/department.repo";

export async function getDepartmentWithAuth() {
  const supabase = await createServerSupabaseClient();
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  // 1. Catch Auth Error or missing user session
  if (authError || !user) {
    throw new Error("Unauthorized: Please log in to access this department.");
  }

  const department = await departmentRepo.getDepartmentByDepartmentAuthId({
    authId: user.id,
    fields: {
      departmentName: true,
    },
  });

  // 3. Catch missing records
  if (!department) {
    throw new Error("Department not found.");
  }

  return department;
}
