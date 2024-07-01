import { Flex } from '@chakra-ui/react';
import { RefObject, useRef, useState } from 'react';
import { useReactToPrint } from 'react-to-print';
import { useLearningPathDesignContext } from '../../../Contexts/LearningPathDesignContext/LearningPathDesignContext';
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
import PDFContent from '../../PDFContent/PDFContent';
import LearningPathTabLabel from './LearningPathTabLabel';
import TabGraph from './TabGraph';
import { default as TabTable } from './TabTable';
import TabTiles from './TabTiles';

export type LearningPathTabsProps = {
  handleSaveOnDB?: () => Promise<void>;
  // isSmallerScreen?: boolean;
} & CustomTabStyleProps;

export default function LearningPathTabs(props: LearningPathTabsProps) {
  const { isSmallerScreen, handleSaveOnDB, ...rest } = props;
  const { titleLearningPath } = useLearningPathDesignContext();
  // const { addToast } = CustomToast();
  const [isPrinting, setIsPrinting] = useState(false); // State to know if we're exporting data
  const tableRef = useRef<HTMLDivElement>(null);
  // Method to export the table in PDF
  const exportToPDF = useReactToPrint({
    // content: () => tableRef.current,
    content: () => document.getElementById('printContent'),
    documentTitle: titleLearningPath,
    // onBeforePrint: () => setIsPrinting(true),
    onAfterPrint: () => {
      setIsPrinting(false);
      // addToast({
      //   message: 'Learning path successfully exported in PDF',
      //   type: 'success',
      // });
    },
  });
  const exportLearningPath = () => {
    setIsPrinting(true);
    setTimeout(() => {
      exportToPDF();
    });
  };
  const config = getConfig(
    exportLearningPath,
    tableRef,
    isPrinting,
    isSmallerScreen,
    handleSaveOnDB
  );

  return (
    <Flex>
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
        minW="100%"
        minH="100%"
      />
      <Flex
        id="printContent"
        style={{ display: 'none' }}
        className="hidden printable"
      >
        <PDFContent
          titleLearningPath={titleLearningPath}
          isPrinting={isPrinting}
        />
      </Flex>
    </Flex>
  );
}

const getConfig = (
  exportToPDF: () => void,
  tableRef: RefObject<HTMLDivElement>,
  isPrinting: boolean,
  isSmallerScreen?: boolean,
  handleSaveOnDB?: () => Promise<void>
) => {
  // const digitalIdsoers = oers?.filter((oer) => oer.skills?.some((skill: { domain: any[]; }) => skill.domain.some((domain) => domain.name === "Digital"))).map((oer) => oer.id);

  const config: CustomTabConfigProps = [
    {
      label: (
        <LearningPathTabLabel iconTab={IconTable} spacing={2} name="Table" />
      ),
      child: <TabTable ref={tableRef} isPrinting={isPrinting} />,
      pt: '3%',
      // isDisabled: true,
    },
    {
      label: (
        <LearningPathTabLabel iconTab={IconTiles} spacing={2} name="Tiles" />
      ),
      child: <TabTiles />,
      pt: '3%',
      // isDisabled: true,
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
          name="Edit"
          isSmallerScreen={isSmallerScreen}
        // isDisabled={true}
        />
      ),
      isButton: true,
      pt: '3%',
    },
    {
      label: (
        <AddActivityLessonPlanButton
          name="Add activity"
          isSmallerScreen={isSmallerScreen}
        />
      ),
      isButton: true,
      pt: '3%',
    },
    {
      label: (
        <ExportLessonPlanButton
          name="Export"
          // isDisabled={true}
          isSmallerScreen={isSmallerScreen}
          handleExportToPDF={exportToPDF}
        />
      ),
      isButton: true,
      pt: '3%',
    },
    {
      label: (
        <SaveLessonPlanButton name="Save" isSmallerScreen={isSmallerScreen} handleSaveOnDB={handleSaveOnDB} />
      ),
      isButton: true,
      pt: '3%',
    },
    {
      label: (
        <PublishLessonPlanButton
          name="Publish"
          isDisabled={true}
          isSmallerScreen={isSmallerScreen}
        />
      ),
      isButton: true,
      pt: '3%',
    },
  ];

  return config;
};
