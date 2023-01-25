import Head from 'next/head';
import type { GetServerSideProps, NextPage } from 'next';
import { unstable_getServerSession } from 'next-auth/next';
import { authOptions } from '../api/auth/[...nextauth]';
import { prisma } from '../../utils/db';
import { Heading } from '../../components/common';
import dynamic from 'next/dynamic';
import Script from 'next/script';

interface List {
    name: string;
    description: string;
}

const SingleList: NextPage<{ list: List }> = ({
    list: { name, description },
}) => {
    const MapWithNoSSR = dynamic(() => import('../../components/map/Map'), {
        ssr: false,
    });
    return (
        <>
            <Head>
                <title>Your Lists</title>
                <meta name="description" content="Create a Map" />
                <link
                    rel="stylesheet"
                    href="https://unpkg.com/leaflet@1.9.2/dist/leaflet.css"
                    integrity="sha256-sA+zWATbFveLLNqWO2gtiw3HL/lh1giY/Inf1BJ0z14="
                />
            </Head>
            <div className="grid grid-cols-5 gap-0 w-full">
                <div className="col-span-4">
                    <Script
                        src="https://unpkg.com/leaflet@1.9.2/dist/leaflet.js"
                        integrity="sha256-o9N1jGDZrf5tS+Ft4gbIK7mYMipq9lqpVJ91xHSyKhg="
                    ></Script>
                    <div id="map"></div>
                    <MapWithNoSSR />
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
