import { useRouteLoaderData } from 'react-router-dom';

import EventForm from '../components/EventForm';
import { useRequireLogin } from '../hooks/useRequireLogin';

function EditEventPage() {
  const data = useRouteLoaderData('event-detail');
  useRequireLogin();

  return <EventForm method='patch' event={data.event} />;
}

export default EditEventPage;
