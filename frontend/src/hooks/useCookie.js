import { useCallback } from 'react';
import { useCookies } from 'react-cookie';
import { useActionData, useNavigate, useSearchParams } from 'react-router-dom';

const useCookie = () => {
  const [cookie, setCookie, removeCookie] = useCookies(['token']);
  const data = useActionData();
  const navigate = useNavigate();

  const [searchParams] = useSearchParams();
  const isLogin = searchParams.get('mode') === 'login';

  const userLoggedIn = useCallback(() => cookie?.token, [cookie?.token]);
  const userLoggingIn = () => data?.token;

  const setUserCookie = () => {
    if (userLoggedIn() && isLogin) navigate('/');
    if (userLoggingIn()) {
      setCookie('token', data.token, {
        expires: addHours(1),
      });
    }
  };

  const isAuthorised = () => !!cookie?.token;

  const clearToken = () => removeCookie('token');

  const redirectIfNotLoggedIn = useCallback(() => {
    if (!userLoggedIn()) navigate('/auth');
  }, [navigate, userLoggedIn]);

  return {
    setUserCookie,
    isAuthorised,
    clearToken,
    redirectIfNotLoggedIn,
    userToken: cookie.token,
  };
};

export default useCookie;

function addHours(h) {
  const copy = new Date();
  copy.setTime(copy.getTime() + h * 60 * 60 * 1000);
  return copy;
}
