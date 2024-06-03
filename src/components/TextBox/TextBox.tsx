import { Box, BoxProps, Textarea } from '@chakra-ui/react';
import { ChangeEvent, useEffect, useRef } from 'react';

export interface TextBoxProps extends BoxProps {
  bgTextArea?: string;
  placeholder?: string;
  placeholderColor?: string;
  isHighlighted?: boolean;
  text?: string;
  rows?: number;
  resize?: 'none' | 'vertical' | 'horizontal' | 'both' | 'initial' | 'inherit';
  index?: number;
  onTextChange: (newText: string, index?: number) => void;
  isDisabled?: boolean;
  isBoldText?: boolean;
  isLargeFontSize?: boolean;
  minHTextArea?: string | number;
}

const TextBox = ({
  bgTextArea,
  placeholder,
  placeholderColor,
  isHighlighted,
  text,
  index,
  onTextChange,
  rows,
  resize,
  isDisabled,
  isBoldText,
  isLargeFontSize,
  minHTextArea,
  ...rest
}: TextBoxProps) => {
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  const handleTextChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const newText = e.target.value;
    if (index != undefined) {
      onTextChange(newText, index);
    } else {
      onTextChange(newText);
    }
    adjustHeight();
  };

  const adjustHeight = () => {
    if (textAreaRef.current) {
      textAreaRef.current.style.height = 'auto';
      textAreaRef.current.style.height = textAreaRef.current.scrollHeight + 'px';
    }
  };

  useEffect(() => {
    adjustHeight();
  }, [text]);

  return (
    <Box
      w="100%"
      {...rest}
      border={
        isHighlighted && text === ''
          ? '2.5px solid #bf5521ff'
          : '1px solid #CED4DA'
      }
      borderRadius={'lg'}
    >
      <Textarea
        ref={textAreaRef}
        css={{ ':hover': { backgroundColor: '#E2E8F0' } }}
        bg={bgTextArea}
        variant="solid"
        value={text}
        onChange={handleTextChange}
        placeholder={placeholder}
        _placeholder={{ color: placeholderColor }}
        rows={rows || 1}
        resize={resize || 'vertical'}
        w="100%"
        isDisabled={isDisabled}
        fontSize={isLargeFontSize ? 'x-large' : undefined}
        fontWeight={isBoldText ? 'bold' : undefined}
        minH={minHTextArea}
      />
    </Box>
  );
};

export default TextBox;
