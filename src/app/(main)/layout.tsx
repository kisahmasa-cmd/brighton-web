import Navbar from "@/components/custom/Navbar";
import { getNav } from "@/services/nav-service";
import { getFooters, getIcons } from "@/services/homepage-service/homepage-service";
import Footer from "@/components/custom/Footer";
import { UserProvider } from "@/components/custom/UserContext";
import { getUserInfo } from "@/actions/user-action";

import { globalGenerateMetadataOptimal } from "@/lib/global-metadata-optimal";

export const generateMetadata = globalGenerateMetadataOptimal;

export default async function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [navRes, footerRes, iconsRes, user] = await Promise.all([getNav(), getFooters(), getIcons(), getUserInfo()]);
  return (
    <main>
      <UserProvider value={user}>
        <Navbar nav={navRes.Data} />
        {children}
        <Footer data={footerRes.Data} dataIcons={iconsRes.Data} />
      </UserProvider>
    </main>
  );
}
