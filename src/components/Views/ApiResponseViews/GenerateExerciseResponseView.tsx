import { Text } from '@chakra-ui/react';
import { useCreateOERsContext } from '../../../Contexts/CreateOERsContext';
import { GeneratedExerciseProps } from '../../../types/encoreElements';

type GenerateExerciseResonseViewProps = {
    response: GeneratedExerciseProps | null;
};

export default function GenerateExerciseResponseView({
    response
}: GenerateExerciseResonseViewProps) {
    const { apiGeneratedExerciseData: apiData } = useCreateOERsContext();

    return (
        <div>
            <Text fontSize={'lg'} fontWeight={'bold'}>
                Risposta API:
            </Text>
            {/* <Text>
                {apiData.language} <br />
                {apiData.date} <br />
                {apiData.temperature} <br />
                {apiData.level} <br />
                {apiData.text} <br />
                {apiData.textWithGaps} <br />
                {apiData.wordsAndAnswers} <br />
                <br />
                risposta: <br />
                {response}
              </Text> */}
            <Text>
                Assignment: <br />
                {apiData.Assignment} <br />
                Plus: <br />
                {apiData.Plus} <br />
                Solutions: <br />
                {apiData.Solutions} <br />
                Distractors: <br />
                {apiData.Distractors} <br />
                Easily Discardable Distractors: <br />
                {apiData.EasilyDiscardableDistractors} <br />
                <br />
                risposta: <br />
                {JSON.stringify(response)}
            </Text>
        </div>
    )
}