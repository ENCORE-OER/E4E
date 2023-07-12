import { Button, Tooltip } from '@chakra-ui/react';
import React from 'react';

type DownloadButtonProps = {
  data: object;
  fileName: string;
};

const DownloadButton: React.FC<DownloadButtonProps> = ({ data, fileName }) => {
  const handleClick = () => {
    const json = JSON.stringify(data);
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = fileName;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <Tooltip label="Download the JSON file of the collection">
      <Button onClick={handleClick}>Download</Button>
    </Tooltip>
  );
};

export default DownloadButton;
