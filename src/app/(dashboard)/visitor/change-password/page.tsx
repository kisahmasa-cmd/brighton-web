import VisitorPasswordForm from "@/components/custom/VisitorPasswordForm";

export default function ChangePasswordPage() {
  return (
    <div>
      <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4 md:mb-6">
        Change Password
      </h1>
      <div className="bg-white rounded-2xl shadow-sm p-4 md:p-8 max-w-2xl">
        <VisitorPasswordForm />
      </div>
    </div>
  );
}