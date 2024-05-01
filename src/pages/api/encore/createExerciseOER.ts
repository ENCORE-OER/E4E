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
    const data: OerData = req.body;
    // const exercise_values = {
    //   question: null,
    //   fill_template:
    //     'Error: Invalid request: The request is not valid, HTTP status: 400',
    //   fill_template_with_gaps:
    //     'Error: Invalid __________: The __________ is not valid, __________ status: 400',
    //   category: null,
    //   type: null,
    //   number_of_correct_answer: null,
    //   number_of_easy_distractors: null,
    //   number_of_distractors: '1',
    //   number_of_words: 250,
    //   options: [{ HTTP: false }, { request: false }, { HTTPS: false }],
    //   solution: null,
    // };

    console.log('req.body', req.body);
    console.log('data', data);
    console.log('description', data?.description);
    console.log(data.level);

    //const url = 'https://encore-db.grial.eu/api/oer/create/';

    try {
      console.log('description', data?.description);
      const createExerciseOer = await axiosGenerativeAI.post(
        '/api/oer/create/',
        {
          title: data.title,
          description: data.description,
          publication_date: data.publication_date,
          source: data.source,
          added_externally: true,
          assessment_oer: true,
          assessment_oer_type: data.assessment_oer_type,
          generated_by_ai: true,
          level: data.level,
          temperature: data.temperature,
          question: data?.exercise_values?.question,
          fill_template: data.exercise_values?.fill_template,
          fill_template_with_gaps:
            data.exercise_values?.fill_template_with_gaps,
          category: data.exercise_values?.category,
          type: data.exercise_values?.type,
          number_of_words: data.exercise_values?.number_of_words,
          options: ['Array of strings'],
          //options: data.exercise_values?.options,
          solution: data.exercise_values?.solution,
          number_of_correct_answer:
            data.exercise_values?.number_of_correct_answer,
          number_of_easy_distractors:
            data.exercise_values?.number_of_easy_distractors,
          number_of_distractors: data.exercise_values?.number_of_distractors,
          type_of_question: data.exercise_values?.type,
          type_of_exercise: data.exercise_values?.type,
          question_response: data.exercise_values?.solution,
          language: data.language,
          quiz_questions: [
            {
              options: ['Array of strings'],
              question: data.exercise_values?.question,
              solution: data.exercise_values?.solution,
              correct_answer: data.exercise_values?.solution,
            },
          ],

          // title: '000FG',
          // description: '000FG',
          // publication_date: '2024-03-20',
          // language: 'English',
          // generated_by_ai: true,
          // assessment_oer: true,
          // assessment_oer_type: 'Fill the gaps',
          // source: 'https://it.wikipedia.org/wiki/Vulcano',
          // level: 'Middle School',
          // temperature: 0.2,
          // exercise_values: exercise_values,
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
