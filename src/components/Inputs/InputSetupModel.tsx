import {
  Button,
  Input,
  InputGroup,
  InputGroupProps,
  InputRightElement,
} from '@chakra-ui/react';
import { useState } from 'react';

interface InputSetupModelProps extends InputGroupProps {
  setupModel: string | undefined;
  handleSetupModel: (setupModel: string) => void;
}

export default function InputSetupModel({
  setupModel,
  handleSetupModel,
  ...rest
}: InputSetupModelProps) {
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
        onChange={(e) => handleSetupModel(e.target.value)}
      />
      <InputRightElement width="4.5rem">
        <Button h="1.75rem" size="sm" onClick={handleClick}>
          {show ? 'Hide' : 'Show'}
        </Button>
      </InputRightElement>
    </InputGroup>
  );
}
