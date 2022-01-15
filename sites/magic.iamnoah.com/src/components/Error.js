import { styled } from '@magusn/react/src/styles';

// we are matching the API of next/error
// nextjs chose some weird prop names
// statusCode is the left side, sort of like a header
// title is the right side, sort of like the description or message
// e.g.
//    { statusCode: 404, title: 'This page could not be found' }
//    => 404 | This page could not be found

function getMessage(props) {
  switch (props.statusCode) {
    case '404':
    case 404:
      return 'This page could not be found';
    case '500':
    case 500:
    default:
      return 'Internal Server Error';
  }
}

export function Error(props) {
  const title = props.statusCode || 'Error';
  const message = props.title || getMessage(props);

  return (
    <Container>
      <div>
        <H1>{title}</H1>
        <Message>
          <H2>{message}</H2>
        </Message>
      </div>
    </Container>
  );
}

const Container = styled.div`
  font-family: -apple-system, BlinkMacSystemFont, Roboto, 'Segoe UI', 'Fira Sans', Avenir, 'Helvetica Neue',
    'Lucida Grande', sans-serif;
  height: 100vh;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const H1 = styled.h1`
  display: inline-block;
  border-right: 1px solid rgba(var(--font-color), 0.3);
  margin: 0;
  margin-right: 20px;
  padding: 10px 23px 10px 0;
  font-size: 24px;
  font-weight: 500;
  vertical-align: top;
`;

const Message = styled.div`
  display: inline-block;
  text-align: left;
  line-height: 49px;
  height: 49px;
  vertical-align: middle;
`;

const H2 = styled.h2`
  font-size: 14px;
  font-weight: normal;
  line-height: inherit;
  margin: 0;
  padding: 0;
`;
