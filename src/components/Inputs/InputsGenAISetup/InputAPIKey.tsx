import {
  Button,
  Input,
  InputGroup,
  InputRightElement
} from '@chakra-ui/react';
import { useState } from 'react';
import { InputGenAISetupProps } from '.';

export default function InputAPIKey({
  apiKey,
  handleApiKey,
  ...rest
}: InputGenAISetupProps) {
  const [show, setShow] = useState<boolean>(false);
  const handleClick = () => setShow(!show);

  return (
    <InputGroup {...rest} size="sm">
      <Input
        variant="flushed"
        type={show ? 'text' : 'password'}
        placeholder="Enter your OpenAI API Key"
        focusBorderColor="yellow.500"
        value={apiKey}
        onChange={(e) => {
          if (handleApiKey !== undefined) {
            handleApiKey(e.target.value)
          }
        }}
      />
      <InputRightElement width="4.5rem">
        <Button h="1.75rem" size="sm" onClick={handleClick}>
          {show ? 'Hide' : 'Show'}
        </Button>
      </InputRightElement>
    </InputGroup>
  );
}
