import {
  Flex,
  HTMLChakraProps,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  TabPanelsProps,
  Tabs,
  ThemingProps,
  UseTabsProps,
} from '@chakra-ui/react';

export type CustomTabStyleProps = ThemingProps<'Tabs'> &
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
    return config.findIndex(tab => !tab.isDisabled && !tab.isButton);
  };

  const firstEnabledTabIndex = getFirstEnabledTabIndex(config);

  return (
    <Tabs {...style} index={firstEnabledTabIndex}>
      <TabList>
        {/* {config.map((tab, id) => (
            <Tab key={id} _selected={_selected}>
              {tab.label}
            </Tab>
          ))} */}

        <Flex w="100%">
          {config
            .filter((elem) => !elem.isButton)
            .map((tab, id) => (
              <Tab key={id} _selected={_selected} isDisabled={tab.isDisabled}>
                {tab.label}
              </Tab>
            ))}
        </Flex>

        <Flex justify="flex-end" gap={5}>
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
