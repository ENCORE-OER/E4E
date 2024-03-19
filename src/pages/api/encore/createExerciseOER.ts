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
    const oerData: OerData = req.body;
    console.log('req.body', req.body);

    //const url = 'https://encore-db.grial.eu/api/oer/create/';

    try {
      const createExerciseOer = await axiosGenerativeAI.post(
        '/api/oer/create/',
        {
          title: oerData.title,
          description: oerData.description,
          publication_date: oerData.publication_date,
          language: oerData.language,
          generated_by_ai: oerData.generated_by_ai,
          assessment_oer: oerData.assessment_oer,
          assessment_oer_type: oerData.assessment_oer_type,
          source: oerData.source,
          level: oerData.level,
          temperature: oerData.temperature,
          exercise_values: oerData.exercise_value,
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
