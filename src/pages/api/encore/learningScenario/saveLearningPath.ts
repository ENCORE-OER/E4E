import { default as axiosCreate } from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';

const axiosSaveLearningPath = axiosCreate.create({
  baseURL: process.env.ENCORE_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Server side call
export default async function saveLearningPath(
  req: NextApiRequest,
  res: NextApiResponse
) {
  console.log('saving learning path...');
  if (req.method === 'POST') {
    const { Context, Objective, Path } = req.body;
    const url = '/api/saveLearningPath';

    console.log(Context);
    console.log(Objective);
    console.log(Path);

    try {
      const resp = await axiosSaveLearningPath.post(url, {
        Context: Context,
        Objective: Objective,
        Path: Path,
        // Context: {
        //   EducatorExperience: Context.EducatorExperience,
        //   EducationContext: Context.EducationContext,
        //   Dimension: Context.Dimension,
        //   LearnerExperience: Context.LearnerExperience,
        // },
        // Objective: {
        //   BloomLevel: {
        //     name: Objective.BloomLevel.name,
        //     verbs: Objective.BloomLevel.verbs,
        //   },
        //   SkillsConcepts: Objective.SkillsConcepts,
        //   LearningContext: Objective.LearningContext,
        //   TextLearningObjectives: Objective.TextLearningObjectives,
        // },
        // Path: {
        //   Title: Path.Title,
        //   MacroSubject: Path.MacroSubject,
        //   LessonPlan: Path.LessonPlan,
        //   //   [
        //   //     {
        //   //       TypeOfAssignment: 'string',
        //   //       TypeOfActivity: 'string',
        //   //       Time: 0,
        //   //       Description: 'string',
        //   //       Topic: 'string',
        //   //       Content: {
        //   //         OERs: [
        //   //           {
        //   //             id_oer: 0,
        //   //             Title: 'string',
        //   //           },
        //   //         ],
        //   //         Files: [
        //   //           {
        //   //             Name: 'string',
        //   //             File: 'string',
        //   //           },
        //   //         ],
        //   //       },
        //   //       Compulsory: true,
        //   //       Conditions: {
        //   //         Pass: ['string'],
        //   //         Fail: ['string'],
        //   //       },
        //   //     },
        //   //   ],
        //   Graph: {
        //     Nodes: Path.Graph.Nodes,
        //     Edges: Path.Graph.Edges,
        //   },
        // },
      });
      console.log('resp', resp);
      res.status(200).json(resp?.data?.learningPath);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error!' });
      res.status(400).json({ error: 'Bad request!' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
