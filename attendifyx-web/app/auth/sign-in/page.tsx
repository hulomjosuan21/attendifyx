import type {Metadata} from "next";
import AppIcon from "@/components/AppIcon";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {SignInForm} from "@/forms/SignInForm";
import Link from "next/link";
import {FieldDescription} from "@/components/ui/field";

export const metadata: Metadata = {
  title: "Sign In - AttendifyX",
  description: "Sign In page",
};

export default async function Page({searchParams}: { searchParams: any }) {
  const params = await searchParams;
  const message = params.message || "";
  const isSuccess = params.signed_up === 'success';

  return (
      <div className="bg-muted flex flex-col items-center justify-center gap-6 p-6 md:p-10">
        <div className="flex w-full max-w-sm flex-col gap-6">
          <a href="#" className="flex items-center self-center font-medium">
              <AppIcon size={28}/>
            AttendifyX.
          </a>
            <div className={"flex flex-col gap-6"}>
                <Card>
                    <CardHeader className="text-center">
                        <CardTitle className="text-xl">
                            {message ? "Welcome back" : "Sign In"}
                        </CardTitle>

                        <CardDescription>
                            {message ? message : "Login with your account"}
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <SignInForm/>
                    </CardContent>
                </Card>
                <FieldDescription className="px-6 text-center">
                    By clicking continue, you agree to our <Link href="/terms">Terms of Service</Link>{" "}
                    and <Link href="/privacy">Privacy Policy</Link>.
                </FieldDescription>
            </div>
        </div>
      </div>
  )
}
