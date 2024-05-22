import { default as axiosCreate } from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';

const axiosGenerativeAI = axiosCreate.create({
  baseURL: process.env.GENERATIVE_AI_URL, // TODO: change to the generative AI URL
  headers: {
    'Content-Type': 'application/json',
    // ApiKey: process.env.SK_API_KEY,
  },
});

export default async function materialAnalyzer(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    console.log('API_KEY: ', process.env.SK_API_KEY);
    console.log('SETUP_MODEL: ', process.env.SETUP_MODEL);

    // get the data from the request body
    const { material } = req.body;

    const { apikey, setupmodel } = req.headers; // Express normalizes all request headers to lowercase

    console.log('req.body', req.body);
    // console.log('req.body stringified', JSON.stringify(req.body));

    // const url = '/Analyser/analyseMaterial';
    const url = '/MaterialAnalyser/analyseMaterial';

    try {
      const analyzeMaterial = await axiosGenerativeAI.post(
        url,
        {
          material: material,
        },
        {
          headers: {
            ApiKey: apikey || process.env.SK_API_KEY,
            SetupModel: setupmodel || process.env.SETUP_MODEL,
          },
        }
        // {
        //   headers: {
        //     //Accept: 'application/json',
        //     'Content-Type': 'application/json',
        //     //'API-Key': process.env.SK_API_KEY,
        //   },
        // }
      );
      res.status(200).json(analyzeMaterial?.data);
      console.log('fillGapsExercise', analyzeMaterial?.data);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error!' });
      res.status(400).json({ error: 'Bad request!' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
