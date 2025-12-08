import RegisterPageForm from "@/components/custom/RegisterPageForm";
import { Card, CardContent } from "@/components/ui/card";
import { getHtmlCMS } from "@/services/cms-page";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Registrasi Public Member",
};

const RegisterPage = async () => {
  const dataHTML = await getHtmlCMS('syarat-dan-ketentuan');

  return (
    <div className="flex justify-center items-center h-screen w-screen">
      <div className=" w-full max-w-lg h-full md:h-auto">
        <Card className="h-full md:h-auto rounded-none md:rounded-2xl">
          <CardContent className="py-6 px-8">
            <RegisterPageForm termContent={dataHTML.Data.Content} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default RegisterPage;
