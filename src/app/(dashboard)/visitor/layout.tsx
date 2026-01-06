import { checkLogin } from "@/actions/check-login-action";
import { redirect } from "next/navigation";
import NavbarVisitor from "@/components/custom/NavbarVisitor";

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
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-yellow-50">
      <NavbarVisitor />
      <main className="w-full p-4 md:p-6 lg:p-8 lg:pl-72">
        {children}
      </main>
    </div>
  );
}