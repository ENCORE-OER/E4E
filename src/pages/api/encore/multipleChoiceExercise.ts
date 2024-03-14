import { default as axiosCreate } from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';

const axiosGenerativeAI = axiosCreate.create({
  baseURL: process.env.GENERATIVE_AI_URL, // TODO: change to the generative AI URL
  headers: {
    'Content-Type': 'application/json',
    // ApiKey: process.env.SK_API_KEY,
  },
});

export default async function serverSideCall(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    console.log(process.env.SK_API_KEY);

    // get the data from the request body
    const {
      language,
      type,
      text,
      level,
      category,
      temperature,
      n_o_ca,
      nedd,
      n_o_d,
    } = req.body;

    const { apikey } = req.headers; // Express normalizes all request headers to lowercase


    console.log('req.body', req.body);
    // console.log('req.body stringified', JSON.stringify(req.body));

    const url = '/QuizExercise/generateexercise';

    try {
      const multipleChoiceExercise = await axiosGenerativeAI.post(
        url,
        {
          language: language,
          type: type,
          text: text,
          level: level,
          category: category,
          temperature: temperature,
          n_o_ca: n_o_ca,
          nedd: nedd,
          n_o_d: n_o_d,
        },
        {
          headers: {
            ApiKey: apikey || process.env.SK_API_KEY,
          },
        }

      );
      res.status(200).json(multipleChoiceExercise?.data);
      console.log('multipleChoiceExercise', multipleChoiceExercise?.data);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error!' });
      res.status(400).json({ error: 'Bad request!' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
