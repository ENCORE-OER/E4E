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
    console.log(data?.level);

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
          assessment_oer: data?.assessment_oer,
          added_externally: data?.added_externally,
          assessment_oer_type: data?.assessment_oer_type,
          generated_by_ai: data?.generated_by_ai,
          level: data?.level,
          number_of_distractors: data?.number_of_distractors,
          //number_of_words: data?.number_of_words,
          temperature: data?.temperature,
          type_of_exercise: data?.type_of_exercise,
          number_of_correct_answer: data?.number_of_correct_answer,
          number_of_easy_distractors: data?.number_of_easy_distractors,
          quiz_questions: data?.quiz_questions[0],
          // question: data?.question,
          // question_response: data?.question_response,
          fill_template: data?.fill_template,
          fill_template_with_gaps: data?.fill_template_with_gaps,
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
