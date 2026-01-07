import VisitorProfileForm from "@/components/custom/VisitorProfileForm";
import { info } from "@/services/user-service";

export default async function EditProfilePage() {
  const userInfo = await info();
  const userInfoData = userInfo?.Data;

  if (!userInfoData) return <div>No data user.</div>;

  return (
    <div>
      <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4 md:mb-6">
        Edit Profile
      </h1>
      <div className="bg-white rounded-2xl shadow-sm p-4 md:p-8 max-w-2xl">
        <VisitorProfileForm user={userInfoData} />
      </div>
    </div>
  );
}