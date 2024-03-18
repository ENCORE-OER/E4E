import { Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react';
import { useCreateOERsContext } from '../../Contexts/CreateOERsContext';
import FillGapsPanel from './FillGapsPanel';
import MultipleChoicePanel from './MultipleChiocePanel';
import OpenQuestionPanel from './OpenQuestionPanel';

type TabsCreateMenuProps = {
  isSmallerScreen?: boolean;
};

export default function TabsCreateMenu({
  isSmallerScreen,
}: TabsCreateMenuProps) {
  const { handleIsGenerateButtonClicked, handleExercise } =
    useCreateOERsContext();

  const handleChangeTab = (index: number) => {
    handleExercise(index);
    handleIsGenerateButtonClicked(false);
  };

  return (
    <Tabs
      colorScheme="yellow"
      size={'lg'}
      onChange={(index) => handleChangeTab(index)}
    >
      <TabList>
        <Tab>Fill-Gaps</Tab>
        <Tab>Open Question</Tab>
        <Tab>Multiple-Choice</Tab>
      </TabList>
      <TabPanels>
        <TabPanel>
          <FillGapsPanel isSmallerScreen={isSmallerScreen} />
        </TabPanel>
        <TabPanel>
          <OpenQuestionPanel isSmallerScreen={isSmallerScreen} />
        </TabPanel>
        <TabPanel>
          <MultipleChoicePanel isSmallerScreen={isSmallerScreen} />
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
}
