import Head from 'next/head';
import { authOptions } from '../api/auth/[...nextauth]';
import { unstable_getServerSession } from 'next-auth/next';
import type { GetServerSideProps, NextPage } from 'next';
import { prisma } from '../../utils/db';

import { Heading } from '../../components/common';

interface List {
    name: string;
    description: string;
}

const SingleList: NextPage<{ list: List }> = ({
    list: { name, description },
}) => {
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
                        <Heading headingLevel="h1">{`${name} List`}</Heading>
                    </div>
                </section>
                <section className="flex w-full flex-col mx-auto pb-4">
                    <div className="layout">
                        <p>{description}</p>
                    </div>
                </section>
            </div>
        </>
    );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
    const { id } = context.query;
    const session = await unstable_getServerSession(
        context.req,
        context.res,
        authOptions
    );

    if (!session || !id || Array.isArray(id)) {
        return {
            redirect: {
                destination: '/',
                permanent: false,
            },
        };
    }
    const list = await prisma.spotList.findFirst({
        where: {
            id: parseInt(id, 10),
        },
    });

    return { props: { list } };
};

export default SingleList;
