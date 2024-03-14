import { Box, Flex, Text } from '@chakra-ui/react';
//import axios from 'axios';
import { useEffect } from 'react';
import { useCreateOERsContext } from '../../Contexts/CreateOERsCotext';
//import { CustomToast } from '../../utils/Toast/CustomToast';
import TextBox from '../TextBox/TextBox';
import CheckboxEditableMenu from '../CheckboxMenu/CheckboxEditableMenu';

type FillGapsData = {
  language: string;
  date: string;
  temperature: number;
  words: { [key: string]: boolean };
  level: string;
  text: string;
  textWithGaps: string;
  wordsAndAnswers: string;
};

type EditFillGapsProps = {
  isSmallerScreen?: boolean;
  fillGapsData: FillGapsData;
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
  } = useCreateOERsContext();

  useEffect(() => {
    handleOptionsChange(fillGapsData.words);
    handleFillTemplate(fillGapsData.text);
    handleFillTemplateWithGaps(fillGapsData.textWithGaps);
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
          <CheckboxEditableMenu
            initialOptions={options}
            onChange={handleOptions}
            onOptionsChange={handleOptionsChange}
          />
        </Box>
      </Flex>
    </>
  );
}
