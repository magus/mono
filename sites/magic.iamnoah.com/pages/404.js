import { Error } from '@components/Error';

Page.disableAuth = true;
Page.title = 'Not Found';

export default function Page() {
  return <Error statusCode={404} />;
}
