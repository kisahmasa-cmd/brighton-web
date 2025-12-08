
import { checkLogin } from "@/actions/check-login-action";
import { redirect } from "next/navigation";

export default async function DashboardVisitorLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const result = await checkLogin();
  if (!result) {
    redirect("/visitor/login");
  }

  return (
    <main>
      {children}
    </main>
  );
}
