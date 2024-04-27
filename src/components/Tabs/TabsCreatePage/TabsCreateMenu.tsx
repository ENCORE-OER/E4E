import { Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react';
import { useCreateOERsContext } from '../../../Contexts/CreateOERsContext';
import FillGapsPanel from './FillGapsPanel';
import MultipleChoicePanel from './MultipleChiocePanel';
import OpenQuestionPanel from './OpenQuestionPanel';
import CreateExerciseButton from '../../Buttons/ButtonsCreateOerPage/CreateExerciseButton';

type TabsCreateMenuProps = {
  isSmallerScreen?: boolean;
};

export default function TabsCreateMenu({
  isSmallerScreen,
}: TabsCreateMenuProps) {
  const { handleIsGenerateButtonClicked, handleTypeOfExercisePanel } =
    useCreateOERsContext();

  const handleChangeTab = (index: number) => {
    handleTypeOfExercisePanel(index);
    handleIsGenerateButtonClicked(false);
  };

  return (
    <>
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
            <OpenQuestionPanel isSmallerScreen={isSmallerScreen} />
          </TabPanel>
          <TabPanel>
            <FillGapsPanel />
          </TabPanel>
          <TabPanel>
            <MultipleChoicePanel />
          </TabPanel>
        </TabPanels>
      </Tabs>
      <CreateExerciseButton //here the api call
        isSmallerScreen={isSmallerScreen}
      />
    </>
  );
}
