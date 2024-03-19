import { default as axiosCreate } from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';

const axiosGenerativeAI = axiosCreate.create({
  baseURL: process.env.GENERATIVE_AI_URL, // TODO: change to the generative AI URL
  headers: {
    'Content-Type': 'application/json',
    //ApiKey: process.env.SK_API_KEY,
  },
});

export default async function serverSideCall(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    console.log(process.env.SK_API_KEY);

    // get the data from the request body
    const { language, text, type, level, category, temperature } = req.body;

    const { apikey } = req.headers; // Express normalizes all request headers to lowercase

    console.log('req.body', req.body);
    // console.log('req.body stringified', JSON.stringify(req.body));

    const url = '/QuestionExercise/generateexercise';

    try {
      const openQuestionExercise = await axiosGenerativeAI.post(
        url,
        {
          language: language,
          text: text,
          type: type,
          level: level,
          category: category,
          temperature: temperature,
        },
        {
          headers: {
            ApiKey: apikey || process.env.SK_API_KEY,
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
      res.status(200).json(openQuestionExercise?.data);
      console.log('openQuestionExercise', openQuestionExercise?.data);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error!' });
      res.status(400).json({ error: 'Bad request!' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
