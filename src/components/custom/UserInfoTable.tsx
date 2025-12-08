import { UserData } from "../../../types/user-types";

interface UserInfoTableProps {
  user: UserData;
}

const UserInfoTable: React.FC<UserInfoTableProps> = ({ user }) => {
  return (
    <table className="w-full table-auto">
      <tbody>
        <tr>
          <td>Name</td>
          <td>: {user?.Name}</td>
        </tr>
        <tr>
          <td>Email</td>
          <td>: {user?.Email}</td>
        </tr>
        <tr>
          <td>Phone</td>
          <td>: {user?.Phone}</td>
        </tr>
        <tr>
          <td>Type</td>
          <td>: {user?.UserType}</td>
        </tr>
        <tr>
          <td>Is Verified</td>
          <td>: {user?.IsVerified ? 'Yes' : 'No'}</td>
        </tr>
      </tbody>
    </table>
  );
};

export default UserInfoTable;
