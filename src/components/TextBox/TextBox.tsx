import { Box, BoxProps, Textarea } from '@chakra-ui/react';
import { ChangeEvent } from 'react';

interface TextBoxProps extends BoxProps {
  backgroundColor: string;
  placeholder?: string;
  isHighlighted?: boolean;
  text?: string;
  rows?: number;
  onTextChange: (newText: string) => void;
}

const TextBox = ({
  backgroundColor,
  placeholder,
  isHighlighted,
  text,
  onTextChange,
  rows,
  ...rest
}: TextBoxProps) => {
  const handleTextChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const newText = e.target.value;
    onTextChange(newText);
  };

  return (
    <Box
      {...rest}
      border={
        isHighlighted && text === ''
          ? '1.5px solid #bf5521ff'
          : '1px solid #CED4DA'
      }
      borderRadius={'lg'}
    >
      <Textarea
        css={{ ':hover': { backgroundColor: '#E2E8F0' } }}
        bg={backgroundColor}
        variant="solid"
        value={text}
        onChange={handleTextChange}
        placeholder={placeholder}
        rows={rows || 1}
      />
    </Box>
  );
};

export default TextBox;
