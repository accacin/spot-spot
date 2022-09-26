import "../styles/globals.css";
import { SessionProvider } from "next-auth/react";
import type { AppProps } from "next/app";
import { Page } from "../components/Layout";

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
