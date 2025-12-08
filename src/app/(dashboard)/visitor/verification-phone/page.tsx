import { getUserInfo } from "@/actions/user-action";
import VerificationPhoneForm from "@/components/custom/VerificationPhoneForm";
import { Card, CardContent } from "@/components/ui/card";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Verifikasi Phone",
};

const VerificationPhonePage = async () => {
  const user = await getUserInfo();

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <Card className="w-96">
        <CardContent>
          <VerificationPhoneForm user={user!} />
        </CardContent>
      </Card>
    </div>
  );
};

export default VerificationPhonePage;
