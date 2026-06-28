import { getCurrentUser } from '@/helpers/get-current-user';
import { getUsers } from '../actions/get-users';
import { UsersTable } from './users-table';

export const UsersData = async () => {
    const [rows, currentUser] = await Promise.all([getUsers(), getCurrentUser()]);
    return <UsersTable rows={rows} currentUserId={currentUser?.id ?? ''} />;
};
