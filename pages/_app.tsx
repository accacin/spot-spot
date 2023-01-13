import '../styles/globals.css';
import { SessionProvider } from 'next-auth/react';
import type { AppProps } from 'next/app';
import { Page } from '../components/layout';
<link
  rel="stylesheet"
  href="https://unpkg.com/leaflet@1.9.2/dist/leaflet.css"
  integrity="sha256-sA+zWATbFveLLNqWO2gtiw3HL/lh1giY/Inf1BJ0z14="
/>;

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <SessionProvider>
      <Page>
        <Component {...pageProps} />
      </Page>
    </SessionProvider>
  );
}

export default MyApp;
