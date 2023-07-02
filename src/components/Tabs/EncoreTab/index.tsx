import { Flex, Image, Text } from '@chakra-ui/react';
import {
  CustomTab,
  CustomTabConfigProps,
  CustomTabStyleProps,
} from '../../Layout/CustomTab';
import { TabMapOfConcepts } from './TabMapOfConcepts';
import { TabTypesOfResources } from './TabTypesOfResources';


// TODO: find correct icon
import typeResIcon from '../../../public/Icons/icon_bubble_outlined.svg';
import mapOfConceptIcon from '../../../public/Icons/icon_map_outlined.svg';
import { EncoreOer } from '../../../types/encore';
import { TabDomains } from './TabDomains';

export type EncoreTabProps = {
  oers: EncoreOer[]; domains: String[];
  searchCallBack: (domainIds: any[]) => Promise<void>;
} & CustomTabStyleProps;

export type EncoreTabLabelProps = {
  name: string;
  spacing?: number;
  iconSrc?: string;
};

export const EncoreTab = (props: EncoreTabProps) => {
  const { oers, domains, searchCallBack, ...other } = props;
  const config = getConfig(oers, domains, searchCallBack);

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

const getConfig = (oers: EncoreOer[], domains: String[], searchCallBack: (domainIds: String[]) => Promise<void>) => {

  const digitalIdsoers = oers?.filter((oer) => oer.skills?.some((skill: { domain: any[]; }) => skill.domain.some((domain) => domain.name === "Digital"))).map((oer) => oer.id);


  const config: CustomTabConfigProps = [
    {
      label: (
        <EncoreTabLabel
          iconSrc={typeResIcon.src}
          spacing={2} name="Domain" />
      ),
      child: <TabDomains oers={oers} />,
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
      child: <TabMapOfConcepts oers={oers} />,
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
      child: <TabTypesOfResources oers={oers} searchCallBack={
        searchCallBack
      } />,
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
