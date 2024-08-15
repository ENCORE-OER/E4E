import { default as axiosCreate } from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';

const axiosGenerativeAI = axiosCreate.create({
  baseURL: process.env.ENCORE_OERS_DB,
  headers: {
    'Content-Type': 'application/json',
    // ApiKey: process.env.SK_API_KEY,
  },
});

export default async function serverSideCall(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'GET') {
    const { id } = req.query;

    if (!id || Array.isArray(id)) {
      return res.status(400).json({ error: 'Invalid or missing ID' });
    }

    console.log('Request ID:', id);

    try {
      const oerData = await axiosGenerativeAI.get('/api/oers/', {
        params: { id },
      });
      res.status(200).json(oerData.data);
      console.log('oerObtained: ', oerData.data);
    } catch (error) {
      console.error('Error fetching OER data:', error);
      res.status(500).json({ error: 'Internal server error!' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
