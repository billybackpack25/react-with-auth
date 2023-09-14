import {
  Form,
  Link,
  useActionData,
  useNavigation,
  useSearchParams,
} from 'react-router-dom';

import { useEffect } from 'react';
import classes from './AuthForm.module.css';
import useCookie from '../hooks/useCookie';

function AuthForm() {
  const data = useActionData();
  const { state } = useNavigation();

  // const [searchParams, setSearchParams] = useSearchParams();
  const [searchParams] = useSearchParams();

  const isSubmitting = state === 'submitting';

  const isLogin = searchParams.get('mode') === 'login';

  const { setUserCookie } = useCookie();

  useEffect(() => {
    setUserCookie();
  }, [setUserCookie, data?.token]);

  const errors = data?.errors && (
    <ul>
      {Object.values(data.errors).map((err) => (
        <li key={err}>{err}</li>
      ))}
    </ul>
  );

  const message = data?.message && <p>{data.message}</p>;

  return (
    <>
      <Form method='post' className={classes.form}>
        <h1>{isLogin ? 'Log in' : 'Create a new user'}</h1>
        {errors}
        {message}
        <p>
          <label htmlFor='email'>Email</label>
          <input id='email' type='email' name='email' required />
        </p>
        <p>
          <label htmlFor='image'>Password</label>
          <input id='password' type='password' name='password' required />
        </p>
        <div className={classes.actions}>
          <Link to={`?mode=${isLogin ? 'signup' : 'login'}`}>
            {isLogin ? 'Create new user' : 'Login'}
          </Link>
          <button disabled={isSubmitting}>
            {isSubmitting ? 'Submitting...' : 'Save'}
          </button>
        </div>
      </Form>
    </>
  );
}

export default AuthForm;
