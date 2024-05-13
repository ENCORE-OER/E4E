import { default as axiosCreate } from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';
import { OerData } from '../../../types/encoreElements/oer/CreateOERsElement/OerData';

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
  if (req.method === 'POST') {
    // get the data from the request body
    const data: OerData = req.body.data;

    console.log('req.body', req.body);
    console.log('data', data);
    console.log('description', data?.description);
    console.log(data?.exercise_values);

    //const url = 'https://encore-db.grial.eu/api/oer/create/';

    try {
      console.log('description', data?.description);
      const createExerciseOer = await axiosGenerativeAI.post(
        '/api/oer/create/',
        {
          title: data?.title,
          description: data?.description,
          publication_date: data?.publication_date,
          source: data?.source,
          language: data?.language,
          learning_objective: data?.learning_objective,
          topic: data?.topic,
          assessment_oer: data?.assessment_oer,
          added_externally: data?.added_externally,
          generated_by_ai: data?.generated_by_ai,
          exercise_values: data?.exercise_values,
        }
        // {
        //   headers: {
        //     //Accept: 'application/json',
        //     'Content-Type': 'application/json',
        //     //'API-Key': process.env.SK_API_KEY,
        //   },
        // }
      );
      res.status(201).json(createExerciseOer?.data);
      console.log('createOer', createExerciseOer?.data);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error!' });
      res.status(400).json({ error: 'Bad request!' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
