import RepairPasswordForm from "@/components/custom/RepairPasswordForm";
import { Card, CardContent } from "@/components/ui/card";
import { Metadata } from "next";
import { notFound } from "next/navigation";

type SearchParams = Promise<{ token?: string }>;

interface PageProps {
  searchParams: SearchParams;
}

export const metadata: Metadata = {
  title: "Ubah Password",
};

const RepairPasswordPage: React.FC<PageProps> = async (props) => {
  const searchParams = await props.searchParams;
  const token = searchParams.token;
  if (!token) notFound();
  return (
    <div className="flex justify-center items-center h-screen w-screen">
      <div className=" w-full max-w-lg h-full md:h-auto">
        <Card className="h-full md:h-auto rounded-none md:rounded-2xl">
          <CardContent className="py-6 px-8">
            <RepairPasswordForm token={token} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default RepairPasswordPage;
