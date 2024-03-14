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
    const { oerData }: { oerData: OerData } = req.body;

    console.log('req.body', req.body);
    // console.log('req.body stringified', JSON.stringify(req.body));

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
          exercise_values: {
            question: oerData.exercise_value.question,
            category: oerData.exercise_value.category,
            type: oerData.exercise_value.type,
            number_of_correct_answer:
              oerData.exercise_value.number_of_correct_answer,
            number_of_easy_distractors:
              oerData.exercise_value.number_of_easy_distractors,
            number_of_words: oerData.exercise_value.number_of_words,
            number_of_distractors: oerData.exercise_value.number_of_distractors,
            fill_template: oerData.exercise_value.fill_template,
            fill_template_with_gaps:
              oerData.exercise_value.fill_template_with_gaps,
            options: oerData.exercise_value.options,
            solution: oerData.exercise_value.solution,
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
