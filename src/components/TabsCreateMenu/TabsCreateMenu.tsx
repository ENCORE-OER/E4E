import { Tabs, TabList, Tab, TabPanels, TabPanel } from '@chakra-ui/react';
//import { tabsTheme } from './TabsTheme';

export default function TabsCreateMenu() {
  return (
    <Tabs colorScheme="yellow" /*{...tabsTheme}*/>
      <TabList>
        <Tab>Fill-Gaps</Tab>
        <Tab>Open Question</Tab>
        <Tab>Multiple-Choice</Tab>
      </TabList>
      <TabPanels>
        <TabPanel>
          <p>one!</p>
        </TabPanel>
        <TabPanel>
          <p>two!</p>
        </TabPanel>
        <TabPanel>
          <p>trhee!</p>
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
}
