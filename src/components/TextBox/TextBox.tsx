import { Box, BoxProps, Textarea } from '@chakra-ui/react';
import { ChangeEvent } from 'react';

export interface TextBoxProps extends BoxProps {
  backgroundColorTextArea?: string;
  placeholder?: string;
  placeholderColor?: string;
  isHighlighted?: boolean;
  text?: string;
  rows?: number;
  resize?: 'none' | 'vertical' | 'horizontal' | 'both' | 'initial' | 'inherit';
  index?: number;
  onTextChange: (newText: string, index?: number) => void;
}

const TextBox = ({
  backgroundColorTextArea,
  placeholder,
  placeholderColor,
  isHighlighted,
  text,
  index,
  onTextChange,
  rows,
  resize,
  ...rest
}: TextBoxProps) => {
  const handleTextChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const newText = e.target.value;
    if (index != undefined) {
      onTextChange(newText, index);
    } else {
      onTextChange(newText);
    }
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
        bg={backgroundColorTextArea}
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
