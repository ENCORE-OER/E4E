import { default as axiosCreate } from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';

const axiosGenerativeAI = axiosCreate.create({
    baseURL: process.env.GENERATIVE_AI_URL, // TODO: change to the generative AI URL
    headers: {
        'Content-Type': 'application/json',
        // ApiKey: process.env.SK_API_KEY,
    },
});

export default async function generateExercise(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method === 'POST') {
        console.log(process.env.SK_API_KEY);

        // get the data from the request body
        const {
            macroSubject,
            title,
            level,
            typeOfExercise,
            learningObjective,
            bloomLevel,
            language,
            material,
            correctAnswersNumber,
            distractorsNumber,
            easilyDiscardableDistractorsNumber,
            assignmentType,
            topic,
            temperature,
        } = req.body;

        const { apikey } = req.headers; // Express normalizes all request headers to lowercase

        console.log('req.body', req.body);
        // console.log('req.body stringified', JSON.stringify(req.body));

        const url = '/Exercises/GenerateExercise';

        try {
            const exercise = await axiosGenerativeAI.post(
                url,
                {
                    macroSubject: macroSubject,
                    title: title,
                    level: level,
                    typeOfExercise: typeOfExercise,
                    learningObjective: learningObjective,
                    bloomLevel: bloomLevel,
                    language: language,
                    material: material,
                    correctAnswersNumber: correctAnswersNumber,
                    distractorsNumber: distractorsNumber,
                    easilyDiscardableDistractorsNumber: easilyDiscardableDistractorsNumber,
                    assignmentType: assignmentType,
                    topic: topic,
                    temperature: temperature,
                },
                {
                    headers: {
                        ApiKey: apikey || process.env.SK_API_KEY,
                        SetupModel: process.env.SETUP_MODEL,
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
            res.status(200).json(exercise?.data);
            console.log('exercise: ', exercise?.data);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal server error!' });
            res.status(400).json({ error: 'Bad request!' });
        }
    } else {
        res.status(405).json({ error: 'Method not allowed' });
    }
}
