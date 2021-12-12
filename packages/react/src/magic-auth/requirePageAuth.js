// usage (in a pages component)
//   export const getServerSideProps = requirePageAuth;
// should return an object with props et al.
// see https://nextjs.org/docs/basic-features/data-fetching#getserversideprops-server-side-rendering
export function requirePageAuth(handleAuth) {
  return async (context) => {
    let session;

    // use context.req to setup auth session
    // const session = await getSession(context.req);
    // console.debug('requirePageAuth', context.req);

    if (!session) {
      return {
        props: {},
        redirect: {
          destination: '/',
          permanent: false,
        },
      };
    }

    if (typeof handleAuth === 'function') {
      return handleAuth(context, session);
    }

    return {
      props: { session },
    };
  };
}
