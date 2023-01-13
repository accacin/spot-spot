import Script from 'next/script';
import Head from 'next/head';
import dynamic from 'next/dynamic';

import type { NextPage } from 'next';

const CreateMap: NextPage = () => {
  const MapWithNoSSR = dynamic(() => import('../../components/map/Map'), {
    ssr: false,
  });

  return (
    <>
      <Head>
        <title>Creata a Map</title>
        <meta name="description" content="Create a Map" />
        <link rel="icon" href="/favicon.ico" />
        <link
          rel="stylesheet"
          href="https://unpkg.com/leaflet@1.9.2/dist/leaflet.css"
          integrity="sha256-sA+zWATbFveLLNqWO2gtiw3HL/lh1giY/Inf1BJ0z14="
        />
      </Head>
      <section className="flex w-full flex-col flex-grow-1 justify-center items-center">
        <Script
          src="https://unpkg.com/leaflet@1.9.2/dist/leaflet.js"
          integrity="sha256-o9N1jGDZrf5tS+Ft4gbIK7mYMipq9lqpVJ91xHSyKhg="
        ></Script>
        <div id="map"></div>
        <MapWithNoSSR />
      </section>
    </>
  );
};

export default CreateMap;
