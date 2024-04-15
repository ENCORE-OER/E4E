import { Box, Flex, Text } from '@chakra-ui/react';
import InputAPIKey from './InputAPIKey';
import InputSetupModel from './InputSetupModel';

type InputsGenerateAIProps = {
  apiKey: string | undefined;
  handleApiKey: (value: string) => void;
  setupModel: string | undefined;
  handleSetupModel: (value: string) => void;
  isSmallerScreen?: boolean;
};

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
          Insert the API Key
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
          Insert the Setup Model
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
