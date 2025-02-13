import { useEffect, useState } from 'react';

import { UserWithRole } from 'better-auth/plugins/admin';

import { authClient } from '@/lib/auth-client';

export default function useAdminUsers() {
  const [isSearching, setIsSearching] = useState<boolean>(false);
  const [searchValue, setSearchValue] = useState<string | undefined>('');

  const [users, setUsers] = useState<UserWithRole[]>([]);

  useEffect(() => {
    const disposeable = setTimeout(async () => await fetchUsers(), 0);

    return () => clearTimeout(disposeable);
  }, [searchValue]);

  const fetchUsers = async () => {
    setIsSearching(true);

    const { data } = await authClient.admin.listUsers({
      query: {
        searchValue,
        searchField: 'name',
        searchOperator: 'contains',
        sortBy: 'email',
        sortDirection: 'asc',
      },
    });

    setIsSearching(false);

    if (data) setUsers(data.users);
    else setUsers([]);
  };

  return { users, searchValue, setSearchValue, isSearching, fetchUsers };
}
