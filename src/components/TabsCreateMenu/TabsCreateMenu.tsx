import { Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react';
import FillGapsPanel from './FillGapsPanel';
import OpenQuestionPanel from './OpenQuestionPanel';
import MultipleChoicePanel from './MultipleChiocePanel';
// import SegmentedButton from '../Buttons/SegmentedButton';
//import { tabsTheme } from './TabsTheme';

type TabsCreateMenuProps = {
  isSmallerScreen?: boolean;
};

export default function TabsCreateMenu({ isSmallerScreen }: TabsCreateMenuProps) {

  return (
    <Tabs colorScheme="yellow" size={"lg"} /*{...tabsTheme}*/>
      <TabList>
        <Tab>Fill-Gaps</Tab>
        <Tab>Open Question</Tab>
        <Tab>Multiple-Choice</Tab>
      </TabList>
      <TabPanels>
        <TabPanel>
          <FillGapsPanel
            isSmallerScreen={isSmallerScreen}
          />
        </TabPanel>
        <TabPanel>
          <OpenQuestionPanel
            isSmallerScreen={isSmallerScreen}
          />
        </TabPanel>
        <TabPanel>
          <MultipleChoicePanel
            isSmallerScreen={isSmallerScreen}
          />
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
}
