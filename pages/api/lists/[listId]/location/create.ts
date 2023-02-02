import { unstable_getServerSession } from 'next-auth/next';
import { authOptions } from '../../../auth/[...nextauth]';
import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../../../../../utils/db';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await unstable_getServerSession(req, res, authOptions);
  const { listId } = req.query;
  console.log(listId);

  if (!session) {
    res.status(401).json({ message: 'You must be logged in' });
    return;
  }

  if (!listId || Array.isArray(listId)) return;

  if (req.method === 'POST') {
    try {
      const [lat, lng] = req.body.coords.split(',');
      // create new location
      const [result]: any[] = await prisma.$queryRaw`
      INSERT INTO "SpotLocation" (name, description, coords, "updatedAt", "createdAt")
      VALUES (${req.body.name}, ${req.body.desc}, ST_MakePoint(${parseFloat(
        lng
      )}, ${parseFloat(lat)}), now(), now()) returning id;`;
      // update junction table
      await prisma.spotListLocation.create({
        data: {
          listId: parseInt(listId, 10),
          locationId: result.id,
        },
      });
      res.status(200).json('Location created');
    } catch (err) {
      console.error(err);
      res.status(302).json({ message: 'An error occurred' });
    }
  }
}
