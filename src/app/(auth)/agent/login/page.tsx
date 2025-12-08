import LoginPageForm from "@/components/custom/LoginPageForm";
import { Card, CardContent } from "@/components/ui/card";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Login Agent",
};

const AgentLoginPage = async () => {
  return (
    <div className="flex justify-center items-center h-screen w-screen">
      <div className=" w-full max-w-lg h-full md:h-auto">
        <Card className="h-full md:h-auto rounded-none md:rounded-2xl">
          <CardContent className="py-6 px-8">
            <LoginPageForm isMember={false} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AgentLoginPage;
