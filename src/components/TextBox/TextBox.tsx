import { Box, Textarea } from '@chakra-ui/react';
import React, { ChangeEvent } from 'react';
import { useLearningPathDesignContext } from '../../Contexts/LearningPathDesignContext';

type TextBoxProps = {
  backgroundColor: string;
  placeholder: string;
};

const TextBox = ({ backgroundColor, placeholder }: TextBoxProps) => {
  const { text, handleSetText } = useLearningPathDesignContext();

  const handleTextChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const newText = e.target.value;
    handleSetText(newText);
  };

  return (
    <Box border="1px" borderColor={'#CED4DA'} borderRadius={'7px'}>
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
