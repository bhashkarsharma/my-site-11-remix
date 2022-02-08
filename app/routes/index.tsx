import type { MetaFunction } from 'remix';
import PageTitle from '~/components/PageTitle';

export let meta: MetaFunction = () => {
  return {
    title: 'Bhashkar Sharma',
    description: 'My homepage',
  };
};

export default function Index() {
  return (
    <div className="main-wrapper">
      <PageTitle>Welcome to my website!</PageTitle>
      <p>Glad to have you here 🥳</p>
    </div>
  );
}
