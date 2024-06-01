import axios from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function serverSideCall(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'GET') {
    // Get the url
    const { url } = req.query || '';
    if (!url) {
      return res.status(400).json({ error: 'Missing URL parameter' });
    }
    console.log('URL: ', url);

    // get the data from the request body
    // const { responseType } = req.body;
    const responseType = req.headers['x-response-type'];
    console.log('responseType', responseType);

    console.log('req.body', req.body);
    // console.log('req.body stringified', JSON.stringify(req.body));

    //const analyzedMaterial = await post('/MaterialAnalyzer', {

    try {
      const resp = await axios.get(
        url.toString()
        // {
        //   responseType: responseType || undefined,
        // }
        // {
        //   headers: {
        //     //Accept: 'application/json',
        //     'Content-Type': 'application/json',
        //     //'API-Key': process.env.SK_API_KEY,
        //   },
        // }
      );
      res.status(200).json(resp?.data);
      //   console.log('string text url', resp?.data);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error!' });
      res.status(400).json({ error: 'Bad request!' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
