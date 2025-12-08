import RecaptchaProvider from "@/components/custom/RecaptchaProvider";

export default async function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <RecaptchaProvider>
      <main>
        {children}
      </main>
    </RecaptchaProvider>
  );
}
