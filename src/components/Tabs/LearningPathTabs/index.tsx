import AddActivityLessonPlanButton from '../../Buttons/ButtonsDesignPage/UnderlinedButtons/LearningPathTabs/AddActivityLessonPlanButton';
import EditLessonPlanButton from '../../Buttons/ButtonsDesignPage/UnderlinedButtons/LearningPathTabs/EditLessonPlanButton';
import ExportLessonPlanButton from '../../Buttons/ButtonsDesignPage/UnderlinedButtons/LearningPathTabs/ExportLessonPlanButton';
import PublishLessonPlanButton from '../../Buttons/ButtonsDesignPage/UnderlinedButtons/LearningPathTabs/PublishLessonPlanButton';
import SaveLessonPlanButton from '../../Buttons/ButtonsDesignPage/UnderlinedButtons/LearningPathTabs/SaveLessonPlanButton';
import IconGraph from '../../Icons/IconGraph/IconGraph';
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
  // isSmallerScreen?: boolean;
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
      minH="100%"
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
      // isDisabled: true,
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
        <EditLessonPlanButton
        // isDisabled={true}
        />
      ),
      isButton: true,
      pt: '3%',
    },
    {
      label: <AddActivityLessonPlanButton isDisabled={true} />,
      isButton: true,
      pt: '3%',
    },
    {
      label: <ExportLessonPlanButton isDisabled={true} />,
      isButton: true,
      pt: '3%',
    },
    {
      label: <SaveLessonPlanButton isDisabled={true} />,
      isButton: true,
      pt: '3%',

    },
    {
      label: <PublishLessonPlanButton isDisabled={true} />,
      isButton: true,
      pt: '3%',
    }
  ];

  return config;
};
