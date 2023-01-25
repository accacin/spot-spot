import Head from 'next/head';
import type { GetServerSideProps, NextPage } from 'next';
import { unstable_getServerSession } from 'next-auth/next';
import { authOptions } from '../api/auth/[...nextauth]';
import { prisma } from '../../utils/db';
import { Heading } from '../../components/common';
import dynamic from 'next/dynamic';
import { useState } from 'react';

interface List {
    name: string;
    description: string;
}

const MapWithNoSSR = dynamic(() => import('../../components/map/Map'), {
    ssr: false,
});

const SingleList: NextPage<{ list: List }> = ({
    list: { name, description },
}) => {
    const [currentLocation, setCurrentLocation] = useState(null);
    return (
        <>
            <Head>
                <title>Your Lists</title>
                <meta name="description" content="Create a Map" />
            </Head>
            <div className="grid grid-cols-5 gap-0 w-full">
                <div className="col-span-4">
                    <MapWithNoSSR
                        location={currentLocation}
                        setLocation={setCurrentLocation}
                    />
                </div>
                <div className="col-span-1">
                    <section className="p-4">
                        <div className="layout pb-2">
                            <Heading headingLevel="h3">{`${name} List`}</Heading>
                        </div>
                        <div className="layout">
                            <p>{description}</p>
                        </div>
                    </section>
                </div>
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
