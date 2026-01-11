import { useQuery } from "@tanstack/react-query";
import { getDepartmentWithAuth } from "@/actions/get-auth-department-actions";

export function useDepartmentAuth() {
  return useQuery({
    queryKey: ["department-with-auth"],
    queryFn: () => getDepartmentWithAuth(),
    staleTime: 5 * 60 * 1000,
  });
}
