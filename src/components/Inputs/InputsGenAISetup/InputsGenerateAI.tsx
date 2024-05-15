import { Box, Flex, Text } from '@chakra-ui/react';
import { InputGenAISetupProps } from '.';
import InputAPIKey from './InputAPIKey';
import InputSetupModel from './InputSetupModel';

interface InputsGenerateAIProps extends InputGenAISetupProps {
  isSmallerScreen?: boolean;
}

export default function InputsGenerateAI({
  apiKey,
  handleApiKey,
  setupModel,
  handleSetupModel,
  isSmallerScreen,
}: InputsGenerateAIProps) {
  return (
    <Flex
      direction={'row'}
      flexWrap={'wrap'}
      columnGap={20}
      rowGap={3}
      pb="1rem"
    >
      <Box>
        <Text pl="1" fontSize="sm" fontWeight="bold" color="gray">
          API Key
        </Text>
        <InputAPIKey
          w={
            isSmallerScreen === undefined
              ? '400px'
              : isSmallerScreen
                ? '400px'
                : '100%'
          }
          apiKey={apiKey}
          handleApiKey={handleApiKey}
        />
      </Box>
      <Box>
        <Text pl="1" fontSize="sm" fontWeight="bold" color="gray">
          Setup Model
        </Text>
        <InputSetupModel
          w={
            isSmallerScreen === undefined
              ? '400px'
              : isSmallerScreen
                ? '400px'
                : '100%'
          }
          setupModel={setupModel}
          handleSetupModel={handleSetupModel}
        />
      </Box>
    </Flex>
  );
}
