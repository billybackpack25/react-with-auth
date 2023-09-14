import { json } from 'react-router-dom';

export default async function authFormAction({ request }) {
  const searchParams = new URL(request.url).searchParams;
  let mode = searchParams.get('mode') ?? 'login';

  if (!['signup', 'login'].includes(mode)) {
    mode = 'login';
  }

  const data = await request.formData();

  const authData = {
    email: data.get('email'),
    password: data.get('password'),
  };

  // mode is signup or login
  const response = await fetch(`http://localhost:8080/${mode}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(authData),
  });

  if ([422, 401].includes(response.status)) {
    // server handled errors
    return response;
  }

  if (!response.ok) {
    throw json({ message: 'Could not authenticate user' }, { status: 500 });
  }

  const resData = await response.json();
  const token = resData.token;

  return { token };
}
