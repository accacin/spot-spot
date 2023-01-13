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

  if (!session) {
    res.status(401).json({ message: 'You must be logged in' });
    return;
  }

  if (req.method === 'POST') {
    try {
      const locationList = await prisma.spotList.create({
        data: {
          userId: session.user.id,
          name: req.body.name,
          description: req.body.desc,
          public: false,
        },
      });
      res.status(200).json(locationList);
    } catch (err) {
      console.error(err);
      res.status(302).json({ message: 'An error occurred' });
    }
  }
}
