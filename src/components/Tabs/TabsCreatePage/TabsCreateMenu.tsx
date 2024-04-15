import { Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react';
import axios from 'axios';
import { useCreateOERsContext } from '../../../Contexts/CreateOERsContext';
import { useGeneralContext } from '../../../Contexts/GeneralContext';
import FillGapsPanel from './FillGapsPanel';
import MultipleChoicePanel from './MultipleChiocePanel';
import OpenQuestionPanel from './OpenQuestionPanel';

type TabsCreateMenuProps = {
  isSmallerScreen?: boolean;
};

export default function TabsCreateMenu({
  isSmallerScreen,
}: TabsCreateMenuProps) {
  const { handleIsGenerateButtonClicked, handleTypeOfExercisePanel } =
    useCreateOERsContext();

  const { apiKey, setupModel } = useGeneralContext();

  const handleChangeTab = (index: number) => {
    handleTypeOfExercisePanel(index);
    handleIsGenerateButtonClicked(false);
  };

  // Use this function to analyze the material and get the macroSubject, title, topic, assignmentType
  const analyzeMaterial = async (material: string) => {
    console.log('Analyzing material: ');

    try {
      const resp = await axios.post(
        'api/encore/genAI/materialAnalyzer',
        {
          material: material,
        },
        {
          headers: {
            ApiKey: apiKey,
            SetupModel: setupModel,
          },
        }
      );

      return resp.data;
    } catch (error) {
      console.error('Error during the API call:', error);
    }
  };

  return (
    <Tabs
      colorScheme="yellow"
      size={'lg'}
      onChange={(index) => handleChangeTab(index)}
    >
      <TabList>
        <Tab>Open Question</Tab>
        <Tab>Fill-Gaps</Tab>
        <Tab>Multiple-Choice</Tab>
      </TabList>
      <TabPanels>
        <TabPanel>
          <OpenQuestionPanel
            isSmallerScreen={isSmallerScreen}
            analyzeMaterial={analyzeMaterial}
          />
        </TabPanel>
        <TabPanel>
          <FillGapsPanel
            isSmallerScreen={isSmallerScreen}
            analyzeMaterial={analyzeMaterial}
          />
        </TabPanel>
        <TabPanel>
          <MultipleChoicePanel
            isSmallerScreen={isSmallerScreen}
            analyzeMaterial={analyzeMaterial}
          />
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
}
