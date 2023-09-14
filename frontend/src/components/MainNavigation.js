import { NavLink, useSubmit } from 'react-router-dom';

import classes from './MainNavigation.module.css';
import NewsletterSignup from './NewsletterSignup';
import useCookie from '../hooks/useCookie';

function MainNavigation() {
  const { isAuthorised: isLoggedIn, clearToken } = useCookie();
  const submit = useSubmit();

  const links = [
    { to: '/', title: 'Home' },
    { to: '/events', title: 'Events' },
    { to: '/newsletter', title: 'Newsletter' },
    { to: '/auth?mode=login', title: 'Login', show: !isLoggedIn() },
    {
      to: '/logout',
      show: isLoggedIn(),
      custom: ({ to }) => (
        <button
          key={to}
          onClick={() => {
            clearToken();
            // handle redirect
            submit(null, { action: to, method: 'POST' });
          }}
        >
          Logout
        </button>
      ),
    },
  ].map(({ to, title, custom = null, show = true }) => {
    if (!show) return null;
    if (custom) return custom({ to });
    return (
      <li key={to}>
        <NavLink
          to={to}
          className={({ isActive }) => (isActive ? classes.active : undefined)}
          end
        >
          {title}
        </NavLink>
      </li>
    );
  });

  return (
    <header className={classes.header}>
      <nav>
        <ul className={classes.list}>{links}</ul>
      </nav>
      <NewsletterSignup />
    </header>
  );
}

export default MainNavigation;
