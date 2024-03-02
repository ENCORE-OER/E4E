import { default as axiosCreate } from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';

const axiosGenerativeAI = axiosCreate.create({
  baseURL: process.env.GENERATIVE_AI_URL, // TODO: change to the generative AI URL
  headers: {
    'Content-Type': 'application/json',
    ApiKey: process.env.SK_API_KEY,
  },
});

// Server side call
export default async function generateLearningObjective(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    console.log(process.env.SK_API_KEY);

    // get the data from the request body
    const {
      language,
      educatorExperience,
      learnerExperience,
      dimension,
      educationContext,
      learningContext,
      skills,
      bloomLevel,
      verbs,
      temperature,
    } = req.body;

    console.log('req.body', req.body);
    // console.log('req.body stringified', JSON.stringify(req.body));

    const url = '/LOGenerator/generatelearningobjective';

    try {
      const respLearningObjective = await axiosGenerativeAI.post(
        url,
        {
          language: language,
          educatorExperience: educatorExperience,
          learnerExperience: learnerExperience,
          dimension: dimension,
          educationContext: educationContext,
          learningContext: learningContext,
          skills: skills,
          bloomLevel: bloomLevel,
          verbs: verbs,
          temperature: temperature,
        }
        // {
        //   headers: {
        //     //Accept: 'application/json',
        //     'Content-Type': 'application/json',
        //     //'API-Key': process.env.SK_API_KEY,
        //   },
        // }
      );
      res.status(200).json(respLearningObjective?.data);
      console.log('respLearningObjective', respLearningObjective?.data);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error!' });
      res.status(400).json({ error: 'Bad request!' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
