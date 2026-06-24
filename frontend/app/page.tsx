import { Suspense } from "react";
import DashboardContent from "./dashboard-content";
import LoadingState from "@/components/LoadingState";

export default function Page() {
  return (
    <Suspense fallback={<LoadingState/>}>
      <DashboardContent />
    </Suspense>
  );
}