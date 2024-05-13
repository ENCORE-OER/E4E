import { Box, Flex, Text } from '@chakra-ui/react';
import { useEffect } from 'react';
import { useCreateOERsContext } from '../../../Contexts/CreateOERsContext';
import { GeneratedExerciseProps } from '../../../types/encoreElements';
import { stringArrayToOptionsObject } from '../../../utils/utils';
import CheckboxEditableMenu from '../../CheckboxMenu/CheckboxEditableMenu';
import TextBox from '../../TextBox/TextBox';

// type FillGapsData = {
//   language: string;
//   date: string;
//   temperature: number;
//   words: { [key: string]: boolean };
//   level: string;
//   text: string;
//   textWithGaps: string;
//   wordsAndAnswers: string;
// };

type EditFillGapsProps = {
  isSmallerScreen?: boolean;
  fillGapsData: GeneratedExerciseProps;
};

export default function EditFillGaps({ fillGapsData }: EditFillGapsProps) {
  const {
    title,
    handleTitle,
    description,
    handleDescription,
    fillTemplate,
    handleFillTemplate,
    fillTemplateWithGaps,
    handleFillTemplateWithGaps,
    options,
    handleOptions,
    handleOptionsChange,
    apiGeneratedExerciseData,
  } = useCreateOERsContext();

  const optionsObject = stringArrayToOptionsObject(fillGapsData);

  const handleGaps = (Text: string, Gap: string, words: string[]) => {
    // Utilizziamo un'espressione regolare per creare un pattern che corrisponda a tutte le stringhe in C
    let replacedText = Text;

    // Iteriamo su ogni parola o frase in C
    words.forEach((word) => {
      // Utilizziamo una regex per sostituire tutte le occorrenze della parola/frase con B
      const regex = new RegExp(word, 'gi'); // 'g' per sostituire tutte le occorrenze, 'i' per ignorare la differenza tra maiuscole e minuscole
      replacedText = replacedText.replace(regex, Gap);
    });

    handleFillTemplateWithGaps(replacedText);
  };

  useEffect(() => {
    handleOptionsChange(optionsObject);
    handleFillTemplate(fillGapsData.Plus);
    handleGaps(fillGapsData.Plus, '_____', fillGapsData.Solutions);
  }, []);

  return (
    <>
      <Flex w={'100%'}>
        <Box w={'100%'}>
          <Flex paddingBottom="0.5rem" paddingTop="1rem">
            <Text as="b">Title</Text>
          </Flex>
          <TextBox
            text={title}
            onTextChange={handleTitle}
            placeholder="Insert the title of the exercise"
            rows={1}
          />
          <Flex paddingBottom="0.5rem" paddingTop="1rem">
            <Text as="b">Description</Text>
          </Flex>
          <TextBox
            text={description}
            onTextChange={handleDescription}
            placeholder="Insert the description of the exerxise"
            rows={5}
          />
          <Flex paddingBottom="0.5rem" paddingTop="1rem">
            <Text as="b">Text</Text>
          </Flex>
          <TextBox
            text={fillTemplate}
            onTextChange={handleFillTemplate}
            placeholder="Insert the complete text, without gaps, of the exercise"
            rows={7}
          />
          <Flex paddingBottom="0.5rem" paddingTop="1rem">
            <Text as="b">Text with gaps</Text>
          </Flex>
          <TextBox
            text={fillTemplateWithGaps}
            onTextChange={handleFillTemplateWithGaps}
            placeholder="Insert the complete text with gaps of the exercise"
            rows={7}
          />
          <Flex paddingBottom="0.5rem" paddingTop="1rem">
            <Text as="b">Words</Text>
          </Flex>
          {console.log('options', options)}
          <CheckboxEditableMenu
            initialOptions={
              options.length === 0
                ? stringArrayToOptionsObject(apiGeneratedExerciseData)
                : options
            }
            onChange={handleOptions}
            onOptionsChange={handleOptionsChange}
          />
        </Box>
      </Flex>
    </>
  );
}
