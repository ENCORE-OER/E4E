import { Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react';
import FillGapsPanel from './FillGapsPanel';
import OpenQuestionPanel from './OpenQuestionPanel';
import MultipleChoicePanel from './MultipleChiocePanel';
import { useCreateOERsContext } from '../../Contexts/CreateOERsCotext';
//import { useLocalStorage } from 'usehooks-ts';

type TabsCreateMenuProps = {
  isSmallerScreen?: boolean;
};

export default function TabsCreateMenu({
  isSmallerScreen,
}: TabsCreateMenuProps) {
  const { handleIsGenerateButtonClicked } = useCreateOERsContext();

  // const [selectedIndex, setSelectedIndex] = useLocalStorage<number>(
  //   'selectedIndex',
  //   0
  // );

  const handleChangeTab = (/*index: number*/) => {
    // handleResetOptions();
    // setSelectedIndex(index);
    handleIsGenerateButtonClicked(false);
  };

  return (
    <Tabs
      colorScheme="yellow"
      size={'lg'}
      onChange={(/*index*/) => handleChangeTab(/*index*/)}
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
