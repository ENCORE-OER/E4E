import { Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react';
import FillGapsPanel from './FillGapsPanel';
import OpenQuestionPanel from './OpenQuestionPanel';
import MultipleChoicePanel from './MultipleChiocePanel';
import { useCreateOERsContext } from '../../Contexts/CreateOERsCotext';
import { useLocalStorage } from 'usehooks-ts';

type TabsCreateMenuProps = {
  isSmallerScreen?: boolean;
};

export default function TabsCreateMenu({
  isSmallerScreen,
}: TabsCreateMenuProps) {
  const {
    // handleResetOptions,
    // targetLevelFillGaps,
    // targetLevelOpenQuestion,
    // targetLevelMultipleChoice,
    // questionCategory,
    // questionType,
    // exerciseType,
    // distractors,
    // easyDistractors,
    // blanks,
    // correctAnswer,
  } = useCreateOERsContext();

  const [selectedIndex, setSelectedIndex] = useLocalStorage<number>(
    'selectedIndex',
    0
  );

  const handleChangeTab = (index: number) => {
    // Chiamare la funzione handleResetOptions qui
    // handleResetOptions();
    setSelectedIndex(index);
    // console.log('Selected index: ', index);
    // console.log(targetLevelFillGaps);
    // console.log(targetLevelOpenQuestion);
    // console.log(targetLevelMultipleChoice);
    // console.log('question category: ', questionCategory);
    // console.log('question type: ', questionType);
    // console.log('exercise type: ', exerciseType);
    // console.log('distractors: ', distractors);
    // console.log('easy distractors: ', easyDistractors);
    // console.log('blanks: ', blanks);
    // console.log('correct answer: ', correctAnswer);
  };

  return (
    <Tabs
      colorScheme="yellow"
      size={'lg'}
      onChange={(index) => handleChangeTab(index)}
      defaultIndex={selectedIndex}
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
