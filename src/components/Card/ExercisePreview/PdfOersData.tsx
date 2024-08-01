import {
  Box,
  Card,
  CardBody,
  //CardHeader,
  Stack,
  //StackDivider,
  Text,
} from '@chakra-ui/react';
import { useCollectionsContext } from '../../../Contexts/CollectionsContext/CollectionsContext';
import { useCreateOERsContext } from '../../../Contexts/CreateOERsContext';
import { useLearningPathDesignContext } from '../../../Contexts/LearningPathDesignContext/LearningPathDesignContext';
//import { ExerciseDescriptionData } from '../../../types/encoreElements';
import axios from 'axios';
import { useEffect, useState } from 'react';
import ExerciseCard from './ExerciseCard';
import TheoreticalOerInfo from './TheoreticalOerInfo';
import { OerData, OerProps } from '../../../types/encoreElements';

type PdfOerDataProps = {
};

export default function PdfOerData({ }: PdfOerDataProps) {
  const {
  } = useCreateOERsContext();

  const { collections } = useCollectionsContext();
  const { selectedCollectionIndex: collectionIndex, } = useLearningPathDesignContext();

  const [exerciseOerData, setExerciseOerData] = useState<OerData[]>();
  const [lessonOerData, setLessonOerData] = useState<OerProps[]>();
  const [dataLoaded, setDataLoaded] = useState(false);

  const fetchOerData = async () => {
    setDataLoaded(false);
    console.log('fetching oer data');
    const collection = collections[collectionIndex];
    if (collection && collection.oers) {
      const oerIds = collection.oers.map((oer: any) => oer.id);
      if (oerIds.length > 0) {
        try {
          const responses = await Promise.all(oerIds.map(async (id: string) => {
            const response = await axios.get('/api/encore/getOerById', { params: { id } });
            return response.data;
          }));
          console.log(responses);
          const allData = responses.flatMap(response => response.data);

          const exercises = allData.filter((item: OerData) => item.assessment_oer === true);
          const lesson = allData.filter((item: OerData) => item.assessment_oer === false);


          console.log(exercises);
          console.log(lesson);
          setExerciseOerData(exercises);
          setLessonOerData(lesson);
          setDataLoaded(true);
        } catch (error) {
          console.error('Error fetching OER data:', error);
        } finally {
        }
      }
    }
  };
  useEffect(() => {
    fetchOerData();
  }, []);

  return (
    <>
      <Card variant="outline">
        <CardBody>
          <Stack spacing="6">
            <Box>
              {dataLoaded && lessonOerData && lessonOerData.length > 0 && (
                lessonOerData?.map((oer: any) => (
                  <TheoreticalOerInfo key={oer.id} oerData={oer} />
                ))
              )}
              {dataLoaded && lessonOerData?.length === 0 && (
                <Text>No lessons available</Text>
              )}
            </Box>
            <Box>
              {dataLoaded && exerciseOerData && exerciseOerData.length > 0 && (
                exerciseOerData?.map((oer: any) => (
                  <ExerciseCard key={oer.id} oerData={oer} />
                ))
              )}
              {dataLoaded && exerciseOerData?.length === 0 && (
                <Text>No exercises available</Text>
              )}
            
            </Box>
          </Stack>
        </CardBody>
      </Card>
      
    </>
  );
}
