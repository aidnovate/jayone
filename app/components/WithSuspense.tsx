import { ReactNode, Suspense } from "react";

export default function WithSuspense({ children }: { children: ReactNode }) {
  return <Suspense fallback={<div>Loading...</div>}>{children}</Suspense>;
}
