import { default as axiosCreate } from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';

const axiosGenerativeAI = axiosCreate.create({
  baseURL: process.env.GEN_LESSON_PLAN_URL, // TODO: change to the generative AI URL
  headers: {
    'Content-Type': 'application/json',
    // SetupModel: process.env.SETUP_MODEL,
    // ApiKey: process.env.SK_API_KEY,
  },
});

// Server side call
export default async function generateLessonPlan(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    // get the data from the request body
    const {
      mainTopics,
      language,
      macroSubject,
      title,
      level,
      learningObjective,
      bloomLevel,
      context,
      temperature,
    } = req.body;

    // get the headers from the request
    const { apikey, setupmodel } = req.headers; // 'Express' normalizes all request headers to lowercase

    console.log('apiKey from context: ', apikey);
    console.log('SETUP_MODEL: ', setupmodel);

    console.log('req.body', req.body);
    // console.log(topic, context, level);
    // console.log('req.body stringified', JSON.stringify(req.body));

    const url = '/LessonPlanner/planLesson';

    try {
      const respLessonPlan = await axiosGenerativeAI.post(
        url,
        {
          mainTopics: mainTopics,
          language: language,
          macroSubject: macroSubject,
          title: title,
          level: level,
          learningObjective: learningObjective,
          bloomLevel: bloomLevel,
          context: context,
          temperature: temperature,
        },
        {
          headers: {
            ApiKey: apikey || process.env.SK_API_KEY,
            SetupModel: setupmodel || process.env.SETUP_MODEL_LESSON_PLAN,
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
      res.status(200).json(respLessonPlan?.data?.lesson_plan);
      console.log('respLearningObjective', respLessonPlan?.data?.lesson_plan);
      //console.log(respLearningObjective);
    } catch (error) {
      console.error('Error: ' + error);
      res.status(500).json({ error: 'Internal server error!' });
      res.status(400).json({ error: 'Bad request!' });
      res.status(401).json({ error: 'Unauthorized!' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
