import { Button, Input, InputGroup, InputRightElement } from '@chakra-ui/react';
import { useState } from 'react';
import { InputGenAISetupProps } from '.';

export default function InputSetupModel({
  setupModel,
  handleSetupModel,
  ...rest
}: InputGenAISetupProps) {
  const [show, setShow] = useState<boolean>(false);
  const handleClick = () => setShow(!show);

  return (
    <InputGroup {...rest} size="sm">
      <Input
        variant="flushed"
        type={show ? 'text' : 'password'}
        placeholder="Enter your OpenAI Model Setup"
        focusBorderColor="yellow.500"
        value={setupModel}
        onChange={(e) => {
          if (handleSetupModel !== undefined) {
            handleSetupModel(e.target.value);
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
