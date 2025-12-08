import { getUserInfo } from "@/actions/user-action";
import LogoutWrapper from "@/components/custom/LogoutWrapper";
import UserInfoTable from "@/components/custom/UserInfoTable";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard Public Member",
};

const VisitorDashboardPage = async () => {
  const user = await getUserInfo();
  if (!user) return <div>No data user.</div>;
  return (
    <div className="flex justify-center items-center h-screen">
      <Card className="w-96">
        <CardHeader>
          <CardTitle>Dashboard Visitor</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <UserInfoTable user={user} />
          <LogoutWrapper>
            <Button variant="secondary">Logout</Button>
          </LogoutWrapper>
        </CardContent>
      </Card>
    </div>
  );
};

export default VisitorDashboardPage;
