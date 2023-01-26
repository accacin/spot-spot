import { unstable_getServerSession } from 'next-auth/next';
import { authOptions } from '../auth/[...nextauth]';
import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../../../utils/db';

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
      const [lat, lng] = req.body.coords.split(',');
      const location = await prisma.$executeRaw`
      INSERT INTO "SpotLocation" (name, description, coords)
      VALUES (${req.body.name}, ${req.body.desc}, ST_MakePoint(${parseFloat(lng)}, ${parseFloat(lat)}));`;
      res.status(200).json(location);
    } catch (err) {
      console.error(err);
      res.status(302).json({ message: 'An error occurred' });
    }
  }
}
