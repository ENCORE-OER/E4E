import { Flex, Image, Text } from '@chakra-ui/react';
import {
  CustomTab,
  CustomTabConfigProps,
  CustomTabStyleProps,
} from '../../Layout/CustomTab';
import { TabMapOfConcepts } from './TabMapOfConcepts';

// TODO: find correct icon
import typeResIcon from '../../../public/Icons/icon_bubble_outlined.svg';
import mapOfConceptIcon from '../../../public/Icons/icon_map_outlined.svg';

export type EncoreTabProps = {
  // TODO: add type EncoreOers
  selected_oers?: any[];
  skill?: string;
} & CustomTabStyleProps;

export type EncoreTabLabelProps = {
  name: string;
  spacing?: number;
  iconSrc?: string;
};

export const EncoreTab = (props: EncoreTabProps) => {
  const { skill, ...other } = props;
  const config = getConfig(skill);

  return (
    <CustomTab
      config={config}
      isLazy={true}
      _selected={{
        fontWeight: 'bold',
        borderBottom: '3px solid',
        color: 'primary',
      }}
      color="primary"
      {...other}
    />
  );
};

const getConfig = (skill?: string) => {
  const config: CustomTabConfigProps = [
    {
      label: (
        <EncoreTabLabel iconSrc={typeResIcon.src} spacing={2} name="Domain" />
      ),
      child: <Text align="center">Domains</Text>,
      pt: '3%',
    },
    {
      label: (
        <EncoreTabLabel
          iconSrc={mapOfConceptIcon.src}
          spacing={2}
          name="Map Of Concepts"
        />
      ),
      child: <TabMapOfConcepts skill={skill} />,
      pt: '3%',
    },
    {
      label: (
        <EncoreTabLabel
          iconSrc={typeResIcon.src}
          spacing={2}
          name=" Types of Resources"
        />
      ),
      child: <Text align="center">Types of Resources</Text>,
      pt: '3%',
    },
  ];

  return config;
};

const EncoreTabLabel = (props: EncoreTabLabelProps) => {
  const { name, spacing, iconSrc } = props;
  return (
    <Flex gap={spacing} justifyContent="center" alignItems="center">
      <Image src={iconSrc} alt={name} w={30} />
      <Text>{name}</Text>
    </Flex>
  );
};
