import RegisterAgentForm from "@/components/custom/agent-registration/RegisterAgentForm";
import { Card, CardContent } from "@/components/ui/card";
import { getHtmlCMS } from "@/services/cms-page";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Registrasi Agent",
};

const RegisterAgentPage = async () => {
  const dataHTML = await getHtmlCMS('syarat-dan-ketentuan');

  return (
    <div className="flex justify-center items-center p-0 md:p-8">
      <div className="w-full max-w-3xl h-full">
        <Card className="h-full md:h-auto rounded-none md:rounded-2xl">
          <CardContent className="py-6 px-8">
            <RegisterAgentForm termContent={dataHTML.Data.Content} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default RegisterAgentPage;
