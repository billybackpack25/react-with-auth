import { useEffect } from 'react';
import useCookie from './useCookie';

export const useRequireLogin = () => {
  const { redirectIfNotLoggedIn } = useCookie();

  useEffect(() => {
    redirectIfNotLoggedIn();
  }, [redirectIfNotLoggedIn]);

  return {};
};
