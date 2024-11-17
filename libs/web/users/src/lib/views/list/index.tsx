import { useAppSelector, useGetUsersQuery, stateIsAuthenticated } from 'web/utils';

import { TableUserList } from '../../components/table-user-list';

export function UsersList() {
  const isAuthenticated = useAppSelector(stateIsAuthenticated);
  const { data: users, isLoading } = useGetUsersQuery({ limit: 100 }, { skip: !isAuthenticated });

  return (
    <div className="flex flex-col flex-1">
      <TableUserList users={users} />
    </div>
  );
}

export default UsersList;
