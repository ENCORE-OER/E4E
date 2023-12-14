import { Box, Textarea } from '@chakra-ui/react';
import React, { ChangeEvent } from 'react';
import { useLearningPathDesignContext } from '../../Contexts/LearningPathDesignContext';

type TextBoxProps = {
  backgroundColor: string;
  placeholder: string;
  isHighlighted: boolean;
};

const TextBox = ({ backgroundColor, placeholder, isHighlighted }: TextBoxProps) => {
  const { text, handleSetText } = useLearningPathDesignContext();

  const handleTextChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const newText = e.target.value;
    handleSetText(newText);
  };

  return (
    <Box 
      border={(isHighlighted && text === '') ? '1.5px solid #bf5521ff' : '1px solid #CED4DA'}
      borderRadius={'lg'}
    >
      <Textarea
        css={{ ':hover': { backgroundColor: '#E2E8F0' } }}
        bg={backgroundColor}
        variant="solid"
        value={text}
        onChange={handleTextChange}
        placeholder={placeholder}
        resize="none"
        rows={1}
      />
    </Box>
  );
};

export default TextBox;
