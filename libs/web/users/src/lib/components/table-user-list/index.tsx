import { TextEmailMask } from '../text-email-mask';

interface TableUserListProps {
  users?: any[];
}

export const TableUserList = ({ users }: TableUserListProps) => {
  return (
    <table className="border-collapse table-fixed w-full text-sm">
      <thead>
        <tr>
          <th className="border-b dark:border-slate-600 font-medium p-4 pl-8 pt-0 pb-3 text-slate-400 dark:text-slate-200 text-left w-32">
            ID
          </th>
          <th className="border-b dark:border-slate-600 font-medium p-4 pt-0 pb-3 text-slate-400 dark:text-slate-200 text-left">
            User
          </th>
          <th className="border-b dark:border-slate-600 font-medium p-4 pr-8 pt-0 pb-3 text-slate-400 dark:text-slate-200 text-left">
            Email
          </th>
        </tr>
      </thead>
      <tbody className="bg-white dark:bg-slate-800">
        {users?.map((user) => (
          <tr key={user.id}>
            <td className="border-b border-slate-100 dark:border-slate-700 p-4 pl-8 text-slate-500 dark:text-slate-400">
              {user.id}
            </td>
            <td className="border-b border-slate-100 dark:border-slate-700 p-4 text-slate-500 dark:text-slate-400">
              <div className="flex items-center">
                <img
                  className="inline-block size-10 rounded-full ring-2 ring-white"
                  src={user.avatar}
                  alt=""
                />
                <p className="ml-3">
                  {user.first_name} {user.last_name}
                </p>
              </div>
            </td>
            <td className="border-b border-slate-100 dark:border-slate-700 p-4 pr-8 text-slate-500 dark:text-slate-400">
              <TextEmailMask email={user.email} />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default TableUserList;
