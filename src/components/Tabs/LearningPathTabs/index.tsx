import IconGraph from '../../Icons/IconGraph/IconGraph';
import IconTable from '../../Icons/IconTable/IconTable';
import {
  CustomTab,
  CustomTabConfigProps,
  CustomTabStyleProps,
} from '../../Layout/CustomTab';
import LearningPathTabLabel from './LearningPathTabLabel';
import TabGraph from './TabGraph';
import { default as TabTable } from './TabTable';
import TabTiles from './TabTiles';

export type LearningPathTabsProps = {} & CustomTabStyleProps;

export default function LearningPathTabs(props: LearningPathTabsProps) {
  const { ...rest } = props;
  const config = getConfig();

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
      {...rest}
      w="100%"
    />
  );
}

const getConfig = () => {
  // const digitalIdsoers = oers?.filter((oer) => oer.skills?.some((skill: { domain: any[]; }) => skill.domain.some((domain) => domain.name === "Digital"))).map((oer) => oer.id);

  const config: CustomTabConfigProps = [
    {
      label: (
        <LearningPathTabLabel iconTab={IconTable} spacing={2} name="Table" />
      ),
      child: <TabTable />,
      pt: '3%',
    },
    {
      label: (
        <LearningPathTabLabel
          // iconTab={}
          spacing={2}
          name="Tiles"
        />
      ),
      child: <TabTiles />,
      pt: '3%',
    },
    {
      label: (
        <LearningPathTabLabel iconTab={IconGraph} spacing={2} name="Graph" />
      ),
      child: <TabGraph />,
      pt: '3%',
    },
  ];

  return config;
};
