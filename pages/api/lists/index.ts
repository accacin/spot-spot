import { unstable_getServerSession } from 'next-auth/next';
import { authOptions } from '../auth/[...nextauth]';
import { PrismaClient } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await unstable_getServerSession(req, res, authOptions);

  try {
    const users = await prisma.spotList.findMany({
      where: {
        userId: session?.user.id,
      },
    });
    res.status(200).json(users);
  } catch (err) {
    res.status(302).json({ message: 'An error occurred' });
  }
}
