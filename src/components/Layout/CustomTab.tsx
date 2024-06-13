import {
  Flex,
  HTMLChakraProps,
  Spacer,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  TabPanelsProps,
  Tabs,
  ThemingProps,
  UseTabsProps,
} from '@chakra-ui/react';
import { useState } from 'react';

export type CustomTabStyleProps = {
  isSmallerScreen?: boolean;
} & ThemingProps<'Tabs'> &
  UseTabsProps &
  Omit<HTMLChakraProps<'div'>, 'onChange'>;

export type CustomTabConfigProps = ({
  label: string | React.ReactElement;
  child?: React.ReactElement;
  isButton?: boolean;
  isDisabled?: boolean;
} & TabPanelsProps)[];

export type CustomTabProps = {
  config: CustomTabConfigProps;
} & CustomTabStyleProps;

/**
 * Custom Tab layer component
 *
 * The implementation is based on Tabs Chakra component and provides
 * a way to dinamically generate a Tab object with less boilerplate code
 *
 * @see Docs https://chakra-ui.com/docs/components/tabs
 */

export const CustomTab = (props: CustomTabProps) => {
  const { config, _selected, ...style } = props;

  const getFirstEnabledTabIndex = (config: CustomTabConfigProps) => {
    return config.findIndex((tab) => !tab.isDisabled && !tab.isButton);
  };

  const firstEnabledTabIndex = getFirstEnabledTabIndex(config);
  const [selectedIndex, setSelectedIndex] = useState(firstEnabledTabIndex);

  return (
    <Tabs
      {...style}
      index={selectedIndex}
      onChange={(index) => setSelectedIndex(index)}
    >
      <TabList columnGap={10} rowGap={2} w="100%" flexWrap="wrap">
        {/* {config.map((tab, id) => (
            <Tab key={id} _selected={_selected}>
              {tab.label}
            </Tab>
          ))} */}

        {/* Tabs */}
        <Flex>
          {config
            .filter((elem) => !elem.isButton)
            .map((tab, id) => (
              <Tab key={id} _selected={_selected} isDisabled={tab.isDisabled}>
                {tab.label}
              </Tab>
            ))}
        </Flex>
        <Spacer />
        {/* Buttons */}
        <Flex flex="1" justify="flex-end" columnGap={5}>
          {config
            .filter((elem) => elem.isButton)
            .map((button, id) => (
              <Flex key={id}>{button.label}</Flex>
            ))}
        </Flex>
      </TabList>
      <TabPanels>
        {config.map((tab, id) => (
          <TabPanel key={id} {...tab}>
            {tab.child}
          </TabPanel>
        ))}
      </TabPanels>
    </Tabs>
  );
};
