import { Box, Textarea } from '@chakra-ui/react';
import React, { useState, ChangeEvent } from 'react';

type TextBoxProps = {
  backgroundColor: string;
  placeholder: string;
  onTextChange: (newText: string) => void;
};

const TextBox = ({
  backgroundColor,
  placeholder,
  onTextChange,
}: TextBoxProps) => {
  const [text, setText] = useState('');

  const handleTextChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const newText = e.target.value;
    setText(newText);
    onTextChange(newText);
  };

  return (
    <Box bg={backgroundColor} p={4} borderRadius="md" boxShadow="md">
      <Textarea
        value={text}
        onChange={handleTextChange}
        placeholder={placeholder}
      />
    </Box>
  );
};

export default TextBox;
