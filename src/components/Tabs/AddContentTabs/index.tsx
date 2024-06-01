import IconAttach from '../../Icons/IconAttach/IconAttach';
import IconGenerateAI from '../../Icons/IconGenerateAI/IconGenerateAI';
import IconUpload from '../../Icons/IconUpload/IconUpload';
import {
  CustomTab,
  CustomTabConfigProps,
  CustomTabStyleProps,
} from '../../Layout/CustomTab';
import AddContentTabLabel from './AddContentTabLabel';
import TabAttachOERs from './TabAttachOERs';
import TabGenerateAI from './TabGenerateAI';
import TabUploadFiles from './TabUploadFiles';

export type AddContentTabsProps = {
  isSmallerScreen?: boolean;
} & CustomTabStyleProps;

export default function AddContentTabs(props: AddContentTabsProps) {
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
      overflowY="auto"
    />
  );
}

const getConfig = () => {
  // const digitalIdsoers = oers?.filter((oer) => oer.skills?.some((skill: { domain: any[]; }) => skill.domain.some((domain) => domain.name === "Digital"))).map((oer) => oer.id);

  const config: CustomTabConfigProps = [
    {
      label: (
        <AddContentTabLabel
          iconTab={IconGenerateAI}
          spacing={2}
          name="Generate with AI"
        />
      ),
      child: <TabGenerateAI />,
      pt: '3%',
      // overflowY: 'auto'
    },
    {
      label: (
        <AddContentTabLabel
          iconTab={IconAttach}
          spacing={2}
          name="Attach OERs"
        />
      ),
      child: <TabAttachOERs />,
      pt: '3%',
    },
    {
      label: (
        <AddContentTabLabel
          iconTab={IconUpload}
          spacing={2}
          name="Upload files"
        />
      ),
      child: <TabUploadFiles />,
      pt: '3%',
    },
  ];

  return config;
};
