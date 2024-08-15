import { Flex, Image, Text } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import brandLogo from '../../public/logo_encore.png';
import TabTable from '../Tabs/LearningPathTabs/TabTable';
import PdfOerData from '../../components/Card/ExercisePreview/PdfOersData';

type PDFContentProps = {
  titleLearningPath: string;
  isPrinting: boolean;
};

export default function PDFContent({
  titleLearningPath,
  isPrinting,
}: PDFContentProps) {
  const [currentDate, setCurrentDate] = useState<string>('');

  useEffect(() => {
    const date = new Date();
    const formattedDate = `${date.getDate()}/${
      date.getMonth() + 1
    }/${date.getFullYear()}`;
    setCurrentDate(formattedDate);
  }, []);

  return (
    <>
      <Flex direction="column" p={3} gap={3} className="pdf-content">
        <Flex justify="space-between" align="center">
          <Image src={brandLogo.src} alt="Encore Logo" h="70px" w="150px" />
          <Text>{currentDate}</Text>
        </Flex>
        <Text fontSize="x-large" fontWeight="bold" textAlign="center" mt={3}>
          {titleLearningPath}
        </Text>
        <TabTable isPrinting={isPrinting} />
      </Flex>
      <PdfOerData />
    </>
  );
}
