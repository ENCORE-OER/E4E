import { Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react';
import { useCreateOERsContext } from '../../Contexts/CreateOERsContext';
import FillGapsPanel from './FillGapsPanel';
import MultipleChoicePanel from './MultipleChiocePanel';
import OpenQuestionPanel from './OpenQuestionPanel';
//import { useLocalStorage } from 'usehooks-ts';

type TabsCreateMenuProps = {
  isSmallerScreen?: boolean;
};

export default function TabsCreateMenu({
  isSmallerScreen,
}: TabsCreateMenuProps) {
  const { handleIsGenerateButtonClicked, handleExercise, exercise } =
    useCreateOERsContext();

  // const [selectedIndex, setSelectedIndex] = useLocalStorage<number>(
  //   'selectedIndex',
  //   0
  // );

  const handleChangeTab = (index: number) => {
    handleExercise(index);
    handleIsGenerateButtonClicked(false);
    console.log('exercise: ', exercise);
  };

  return (
    <Tabs
      colorScheme="yellow"
      size={'lg'}
      onChange={(index) => handleChangeTab(index)}
      // defaultIndex={selectedIndex}
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
