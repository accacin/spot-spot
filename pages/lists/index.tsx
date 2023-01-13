import Head from 'next/head';
import { authOptions } from '../api/auth/[...nextauth]';
import { unstable_getServerSession } from 'next-auth/next';
import type { GetServerSideProps, NextPage } from 'next';

import { ListCard, CreateList } from '../../components/common';

const Lists: NextPage = ({ data }: any) => {
  return (
    <>
      <Head>
        <title>Your Lists</title>
        <meta name="description" content="Create a Map" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="container mx-auto">
        <section className="flex w-full mx-auto px-4 py-4 md:px-6 lg:px-8 ">
          <h1 className="mt-4 text-4xl font-normal leading-normal mt-0 mb-2">
            My Location Lists
          </h1>
        </section>
        <section className="flex w-full flex-col mx-auto px-4 pb-4 md:px-6 lg:px-8 ">
          <CreateList />
        </section>
        <section className="p-4 lg:p-8">
          <div className="grid gap-4 grid-cols-1 md:grid-cols-3 lg:grid-cols-4 lg:gap-6 xl:grid-cols-5">
            {data.map((list: any) => (
              <ListCard
                key={list.name}
                title={list.name}
                description={list.description}
              />
            ))}
          </div>
        </section>
      </div>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  /*
      TODO: This needs to be called often
      Is there a better way to do it?
    */
  const session = await unstable_getServerSession(
    context.req,
    context.res,
    authOptions
  );

  if (!session) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }

  const res = await fetch('http://localhost:3000/api/lists');
  const data = await res.json();

  return { props: { data } };
};

export default Lists;
