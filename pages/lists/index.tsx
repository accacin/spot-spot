import Script from "next/script";
import Head from "next/head";

import type { NextPage } from "next";

const Lists: NextPage = () => {
  return (
    <>
      <Head>
        <title>Your Lists</title>
        <meta name="description" content="Create a Map" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <section className="flex w-full flex-col flex-grow-1 justify-center items-center">
        <h1 className="mt-4 text-4xl font-normal leading-normal mt-0 mb-2">
          My Lists
        </h1>
        <p>You have no lists? Create one here: </p>
        <button>Create</button>
      </section>
    </>
  );
};

export default Lists;
