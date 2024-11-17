import dynamic from 'next/dynamic';
import Layout from '../../components/layout';

const UsersListView = dynamic(() => import('web/users').then((m) => m.UsersList));

export const UsersList = () => {
  return (
    <Layout title="Users List">
      <UsersListView />
    </Layout>
  );
};

export default UsersList;
