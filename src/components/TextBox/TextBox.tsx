import { Box, BoxProps, Textarea } from '@chakra-ui/react';
import { ChangeEvent } from 'react';

interface TextBoxProps extends BoxProps {
  backgroundColor?: string;
  placeholder?: string;
  placeholderColor?: string;
  isHighlighted?: boolean;
  text?: string;
  rows?: number;
  resize?: 'none' | 'vertical' | 'horizontal' | 'both' | 'initial' | 'inherit';
  onTextChange: (newText: string) => void;
}

const TextBox = ({
  backgroundColor,
  placeholder,
  placeholderColor,
  isHighlighted,
  text,
  onTextChange,
  rows,
  resize,
  ...rest
}: TextBoxProps) => {
  const handleTextChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const newText = e.target.value;
    onTextChange(newText);
  };

  return (
    <Box
      w="100%"
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
        _placeholder={{ color: placeholderColor }}
        rows={rows || 1}
        resize={resize || 'vertical'}
        w="100%"
      />
    </Box>
  );
};

export default TextBox;
