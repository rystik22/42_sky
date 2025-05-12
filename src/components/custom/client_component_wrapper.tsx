"use client";

import { AuthProvider } from "../../app/context/auth_provider";

export default function ClientWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AuthProvider>{children}</AuthProvider>;
}