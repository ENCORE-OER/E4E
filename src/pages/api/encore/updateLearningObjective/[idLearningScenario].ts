import { default as axiosCreate } from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';

const axiosUpdateLearningScenario = axiosCreate.create({
  baseURL: process.env.ENCORE_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Server side call
export default async function updateLearningScenario(
  req: NextApiRequest,
  res: NextApiResponse
) {
  console.log('updating learning scenario...');
  if (req.method === 'PUT') {
    const { BloomLevel, Skills, LearningContext, textLearningObjective } =
      req.body;
    const { idLearningScenario } = req.query;
    console.log('idLearningScenario', idLearningScenario);

    const url = `/api/updateLearningObjective/${idLearningScenario}`;

    console.log(BloomLevel);
    console.log(Skills);
    console.log(LearningContext);
    console.log(textLearningObjective);

    try {
      const resp = await axiosUpdateLearningScenario.put(url, {
        BloomLevel: BloomLevel,
        Skills: Skills,
        LearningContext: LearningContext,
        textLearningObjective: textLearningObjective,
      });
      console.log('resp', resp);
      res.status(200).json(resp?.data);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error!' });
      res.status(400).json({ error: 'Bad request!' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
