"use client";
import { useAuth } from "@/context/AuthContext";
import SiteContent from "@/components/layout/site-content";
import { Button } from "@/components/ui/button";
import { CloudDownload, HardDriveDownload, Plus } from "lucide-react";
import { useDepartmentAuth } from "@/hooks/use-auth-department";

export default function EventClientPage() {
  return (
    <SiteContent
      title={"Event"}
      description={"Your current listed events"}
      actions={
        <>
          <Button size={"sm"} variant={"outline"}>
            <HardDriveDownload /> Export
          </Button>
          <Button size={"sm"} variant={"outline"}>
            <CloudDownload /> Import File
          </Button>
          <Button size={"sm"}>
            <Plus /> Add Event
          </Button>
        </>
      }
    >
      <pre>
        <code></code>
      </pre>
    </SiteContent>
  );
}
