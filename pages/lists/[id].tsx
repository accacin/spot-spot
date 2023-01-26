import { useState } from 'react';
import type { GetServerSideProps, NextPage } from 'next';
import { unstable_getServerSession } from 'next-auth/next';
import Head from 'next/head';
import { prisma } from '../../utils/db';
import { authOptions } from '../api/auth/[...nextauth]';
import { Heading } from '../../components/common';
import AddLocation from '../../components/common/forms/AddLocation/AddLocation';
import { NextMap } from '../../components/map/NextMap';

interface List {
    name: string;
    description: string;
}

const SingleList: NextPage<{ list: List }> = ({
    list: { name, description },
}) => {
    const [currentLocation, setCurrentLocation] = useState(null);
    console.log(currentLocation);
    return (
        <>
            <Head>
                <title>Your Lists</title>
                <meta name="description" content="Create a Map" />
            </Head>
            <div className="grid grid-cols-5 gap-0 w-full">
                <div className="col-span-4">
                    <NextMap
                        location={currentLocation}
                        setLocation={setCurrentLocation}
                    />
                </div>
                <div className="col-span-1">
                    <section className="p-4">
                        <div className="pb-2">
                            <Heading headingLevel="h3">{`${name} List`}</Heading>
                        </div>
                        <p>{description}</p>
                        <div className="py-6">
                            {currentLocation && <AddLocation coords={currentLocation} />}
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
