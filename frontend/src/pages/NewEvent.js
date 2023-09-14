import EventForm from '../components/EventForm';
import { useRequireLogin } from '../hooks/useRequireLogin';

function NewEventPage() {
  useRequireLogin();
  return <EventForm method='post' />;
}

export default NewEventPage;
