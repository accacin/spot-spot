import Link from "next/link";
import Head from "next/head";
import type { NextPage } from "next";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Spot Spot</title>
        <meta name="description" content="Interesting Locations for Friends" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <section className="pt-20 w-full">
        <div className="flex flex-col items-center justify-center">
          <h1 className="text-gray-800 text-8xl w-1/2 max-w-3xl text-center mb-4">
            Plot Locations with Friends
          </h1>
          <p className="text-gray-700 text-2xl w-2/3 text-center mb-10">
            Found an interesting location when discovering a new city?{" "}
          </p>
          {/* This could be a component */}
          <Link href="/lists">
            <a className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-xl px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
              Plot for Free
            </a>
          </Link>
        </div>
      </section>
    </>
  );
};

export default Home;
