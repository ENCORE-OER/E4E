import { Box, Flex, InputGroupProps } from '@chakra-ui/react';
import { useState } from 'react';
import ShowHideButton from '../../Buttons/ShowHideButton';
import InputsGenerateAI from './InputsGenerateAI';

export interface InputGenAISetupProps extends InputGroupProps {
  apiKey?: string | undefined;
  handleApiKey?: (value: string) => void;
  setupModel?: string | undefined;
  handleSetupModel?: (value: string) => void;
}

export default function InputGenAISetup({
  apiKey,
  handleApiKey,
  setupModel,
  handleSetupModel,
}: InputGenAISetupProps) {
  // API Setup
  const [showBox, setShowBox] = useState(false); // used to show the API setup boxes
  const [isClicked, setIsClicked] = useState(false); // used for the API setup button

  return (
    <Box>
      {showBox && (
        <InputsGenerateAI
          apiKey={apiKey}
          handleApiKey={handleApiKey}
          setupModel={setupModel}
          handleSetupModel={handleSetupModel}
        />
      )}
      <Flex justifyContent="center" py="10px">
        <ShowHideButton
          isClicked={isClicked}
          setIsClicked={setIsClicked}
          showBox={showBox}
          setShowBox={setShowBox}
          showButtonName="Show API Setup"
          hideButtonName="Hide"
        />
      </Flex>
    </Box>
  );
}
