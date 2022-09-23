import type { NextPage } from "next";
import Head from "next/head";
import { Button } from "../components";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Spot Spot</title>
        <meta name="description" content="Interesting Locations for Friends" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <section className="pt-20">
        <div className="flex flex-col items-center justify-center">
          <h1 className="text-gray-800 text-8xl w-2/3 text-center mb-4">
            Plot Locations with Friends
          </h1>
          <p className="text-gray-700 text-2xl w-2/3 text-center mb-10">
            Found an interesting location when discovering a new city?{" "}
          </p>
          <Button text="Plot for Free" />
        </div>
      </section>
    </>
  );
};

export default Home;
