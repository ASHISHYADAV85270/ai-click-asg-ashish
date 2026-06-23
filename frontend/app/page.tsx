import { Suspense } from "react";
import DashboardContent from "./dashboard-content";

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <DashboardContent />
    </Suspense>
  );
}