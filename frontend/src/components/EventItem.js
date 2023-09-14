import { Link, useSubmit } from 'react-router-dom';

import classes from './EventItem.module.css';
import useCookie from '../hooks/useCookie';

function EventItem({ event }) {
  const { isAuthorised: isLoggedIn, userToken } = useCookie();

  const submit = useSubmit();

  function startDeleteHandler() {
    const proceed = window.confirm('Are you sure?');

    if (proceed) {
      let formData = new FormData();
      formData.append('token', userToken);
      submit(formData, { method: 'delete' });
    }
  }

  return (
    <article className={classes.event}>
      <img src={event.image} alt={event.title} />
      <h1>{event.title}</h1>
      <time>{event.date}</time>
      <p>{event.description}</p>
      {isLoggedIn() && (
        <menu className={classes.actions}>
          <Link to='edit'>Edit</Link>
          <button onClick={startDeleteHandler}>Delete</button>
        </menu>
      )}
    </article>
  );
}

export default EventItem;
