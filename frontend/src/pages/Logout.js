import { redirect } from 'react-router-dom';

export function logoutAction() {
  return redirect('/');
}
