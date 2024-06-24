import { Button, Flex, Progress, Text } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { IoMdClose } from 'react-icons/io';
import IconDocument from '../Icons/IconDocuments/IconDocument';

type BoxUploadedFileProps = {
  handleRemoveClick: () => void;
  fileName: string;
  urlFile: string;
};

export default function BoxUploadedFile({
  fileName,
  urlFile,
  handleRemoveClick,
}: BoxUploadedFileProps) {
  const [progress, setProgress] = useState<number>(0);

  const simulateUpload = () => {
    let tempProgress = 0;
    const interval = setInterval(() => {
      tempProgress += 1; // Simulate progress increase
      if (tempProgress > 100) {
        clearInterval(interval);
        tempProgress = 100;
      }
      setProgress(tempProgress);
    }, 0); // Simulate progress update every t seconds
  };

  useEffect(() => {
    simulateUpload();
  }, []);

  return (
    <Flex
      align="center"
      border="1px solid"
      bg="white"
      borderRadius="lg"
      p={2}
      gap={1}
      w="100%"
      onClick={(e) => {
        e.preventDefault();
        console.log("url_file", urlFile);
        window?.open(urlFile, '_blank');
      }}
      cursor="pointer"
    >
      <IconDocument fontSize="xx-large" />
      <Flex direction="column" w="100%" p={0}>
        <Flex align="center" direction="row" gap={1}>
          <Text flex="1">{fileName}</Text>
          <Button
            variant="ghost"
            p={0}
            onClick={(e) => {
              e.stopPropagation();
              handleRemoveClick();
            }}
          >
            <IoMdClose fontSize="x-large" />
          </Button>
        </Flex>
        {progress < 100 ? (
          <Progress value={progress} size="sm" />
        ) : (
          <Text variant="label" fontSize={'sm'}>
            Uploaded
          </Text>
        )}
      </Flex>
    </Flex>
  );
}
