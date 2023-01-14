import Head from 'next/head';
import { authOptions } from '../api/auth/[...nextauth]';
import { unstable_getServerSession } from 'next-auth/next';
import type { GetServerSideProps, NextPage } from 'next';
import { prisma } from '../../utils/db';

import { ListCard, CreateList, Heading } from '../../components/common';

const Lists: NextPage = ({ lists }: any) => {
    return (
        <>
            <Head>
                <title>Your Lists</title>
                <meta name="description" content="Create a Map" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <div className="container mx-auto">
                <section className="flex w-full py-8">
                    <div className="layout">
                        <Heading headingLevel="h1">Location Lists</Heading>
                    </div>
                </section>
                <section className="flex w-full flex-col mx-auto pb-4">
                    <div className="layout">
                        <CreateList />
                    </div>
                </section>
                <section>
                    <div className="layout">
                        <div className="grid gap-4 grid-cols-1 md:grid-cols-3 lg:grid-cols-4 lg:gap-6 xl:grid-cols-5">
                            {lists.map((list: any) => (
                                <ListCard
                                    key={list.name}
                                    title={list.name}
                                    description={list.description}
                                />
                            ))}
                        </div>
                    </div>
                </section>
            </div>
        </>
    );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
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
    const lists = await prisma.spotList.findMany({
        where: {
            userId: session?.user.userId,
        },
    });

    return { props: { lists } };
};

export default Lists;
