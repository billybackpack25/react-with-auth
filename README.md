# Authentication with React Cookie and React Router Dom

Simple implementation of authentication from the backend using JWT with `jsonwebtoken`,
and then logging in the user on the frontend, storing the token into a cookie with an expiration.

Using that cookie on the frontend to prevent access to pages, add the token into backend requests to show authenticated, etc.

## How to run

- `cd backend`, `npm i`, `npm start`
- `cd frontend`, `npm i`, `npm start`

# Authentication

2 ways:

- Server-side sessions: not ideal for react. Store UID on the server, sent back to the client, the client sends that ID with future requests to access protected resources. Required tight coupling between frontend/backend.

- Authentication tokens: After user was authenticated on the server, create but don't store a permission token, send it to the client, can only be validated by the backend (using a private key), in future requests, token is attached and the backend is able to validate it.

  - In the react app, the token must be stored against the user, in order to attach it to future requests.

```js
// using json web token to create/validate key
const { sign, verify } = require('jsonwebtoken');
const { compare } = require('bcryptjs');
const { NotAuthError } = require('./errors');

// Dummy key used for demo, wouldn't normally include in repo
const KEY = 'supersecret';

function createJSONToken(email) {
  return sign({ email }, KEY, { expiresIn: '1h' });
}

function validateJSONToken(token) {
  return verify(token, KEY);
}
```

# New routing concepts

Using query parameters to display different things on the same page. For e.g. if path is `/auth?mode=signup`, then show the sign up component, or `/auth?mode=login` to show the login component.

`useSearchParams` is an alternative to using state, but it also means we can use `Link` to send people to that specific page, with the component we want to show.

```js
// const [searchParams, setSearchParams] = useSearchParams();
const [searchParams] = useSearchParams();

const isLogin = searchParams.get('mode') === 'login';
```

## How to get access to the search param from the route action function

Built in browser `new URL(url).searchParams`.

```js
export async function authFormAction({ request }) {
  const searchParams = new URL(request.url).searchParams;
}
```

## Protected Routes

Checkout the useRequireLogin hook, which implements a simple solution using cookies, to check whether the use ris logged in, otherwise redirect to the auth page.

## Submitting requests to the backend authenticated

In order to submit a protected route, you'll need to pass along the authorization header.

When the user logs in, the `useCookies` package is used to set the `token` cookie.
If a react router action is used to request the backend, I've created a FormData object, and programmatically added the cookie in order to retrieve it from the request. e.g.

```js
// Using a normal form component, pass in the onSubmit={handleSubmit}
const handleSubmit = (event) => {
  event.preventDefault();
  const formData = new FormData(event.target);
  formData.append('token', userToken);
  submit(formData, { method: method ?? 'POST' });
};
```

```js
export async function action({ request, params }) {
  const data = await request.formData();

  ...

  const response = await fetch(url, {
    method: method,
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + data.get('token'),
    },
    body: JSON.stringify(eventData),
  });
  ...
```
