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
  const data = await getNav();
  const dataFooter = await getFooters();
  const dataIcons = await getIcons();
  const user = await getUserInfo();
  return (
    <main>
      <UserProvider value={user}>
        <Navbar nav={data.Data} />
        {children}
        <Footer data={dataFooter.Data} dataIcons={dataIcons.Data} />
      </UserProvider>
    </main>
  );
}
