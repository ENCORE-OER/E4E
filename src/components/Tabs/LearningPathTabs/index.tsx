import { FaSave } from 'react-icons/fa';
import UnderlinedButton from '../../Buttons/ButtonsDesignPage/UnderlinedButtons/UnderlinedButton';
import IconEdit from '../../Icons/IconEdit/IconEdit';
import IconExport from '../../Icons/IconExport/IconExport';
import IconGraph from '../../Icons/IconGraph/IconGraph';
import IconPlus from '../../Icons/IconPlus/IconPlus';
import IconTable from '../../Icons/IconTable/IconTable';
import IconTiles from '../../Icons/IconTiles/IconTiles';
import {
  CustomTab,
  CustomTabConfigProps,
  CustomTabStyleProps,
} from '../../Layout/CustomTab';
import LearningPathTabLabel from './LearningPathTabLabel';
import TabGraph from './TabGraph';
import { default as TabTable } from './TabTable';
import TabTiles from './TabTiles';

export type LearningPathTabsProps = {
  isSmallerScreen?: boolean;
} & CustomTabStyleProps;

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
      isDisabled: true,
    },
    {
      label: (
        <LearningPathTabLabel iconTab={IconTiles} spacing={2} name="Tiles" />
      ),
      child: <TabTiles />,
      pt: '3%',
      isDisabled: true,
    },
    {
      label: (
        <LearningPathTabLabel iconTab={IconGraph} spacing={2} name="Graph" />
      ),
      child: <TabGraph />,
      pt: '3%',
    },

    // Fixed Buttons on top-right of the Tabs
    {
      label: (
        <UnderlinedButton
          handleClick={() => console.log('Edit')}
          nameButton="Edit"
          rightIcon={<IconEdit />}
          color="primary"
          fontWeight="normal"
          isDisabled={true}
        />
      ),
      isButton: true,
      pt: '3%',
    },
    {
      label: (
        <UnderlinedButton
          handleClick={() => console.log('Add activity')}
          nameButton="Add activity"
          rightIcon={<IconPlus />}
          color="primary"
          fontWeight="normal"
          isDisabled={true}
        />
      ),
      isButton: true,
      pt: '3%',
    },
    {
      label: (
        <UnderlinedButton
          handleClick={() => console.log('Export')}
          nameButton="Export"
          rightIcon={<IconExport />}
          color="primary"
          fontWeight="normal"
          isDisabled={true}
        />
      ),
      isButton: true,
      pt: '3%',
    },
    {
      label: (
        <UnderlinedButton
          handleClick={() => console.log('Save')}
          nameButton="Save"
          rightIcon={<FaSave />}
          color="primary"
          fontWeight="normal"
          isDisabled={true}
        />
      ),
      isButton: true,
      pt: '3%',
    },
  ];

  return config;
};
