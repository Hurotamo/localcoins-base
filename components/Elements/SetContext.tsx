import { AppContext } from '@/utils/context';
import Cookies from 'js-cookie';
import { usePathname, useRouter } from 'next/navigation';
import { useContext, useEffect } from 'react';
import { gql, useQuery } from 'urql';

export const GET_USER = gql`
  query User {
    user {
      id
      name
      publicKey
    }
  }
`;

function SetContext() {
  const [{ fetching: fetchingCurrentUser, data: userData }] = useQuery({
    query: GET_USER,
    pause: !Cookies.get('token'),
  });
  const { setUser } = useContext(AppContext);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!fetchingCurrentUser && userData?.user) {
      setUser?.(userData.user);
      if (!userData?.user?.name && pathname !== '/profile') {
        router.push('/profile');
      }
    }
  }, [fetchingCurrentUser, userData]);

  return null;
}

export default SetContext;
