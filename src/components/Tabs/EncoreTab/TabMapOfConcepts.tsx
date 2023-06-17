import { Image, Stack, Text } from '@chakra-ui/react';
import { useEffect, useMemo, useState } from 'react';
import { APIV2 } from '../../../data/api';
import conceptGraph from '../../../public/conceptGraph.png';
import { EncoreConceptMap } from '../../../types/encore';

export type TabMapOfConceptsProps = {
  skill?: string;
};

export const TabMapOfConcepts = (props: TabMapOfConceptsProps) => {
  const { skill } = props;

  const [graph, setGraph] = useState<EncoreConceptMap | null>();
  const API = useMemo(() => new APIV2(undefined), []);

  /*
    UseEffect is used to execute actions only if some states changes,
    in this case API and selected_oers
  */
  useEffect(() => {
    if (!skill) return;

    (async () => {
      try {
        const resp = await API.getConceptMapSkill(skill);
        setGraph(resp.data);
      } catch (err) {
        // TODO: handle error
        console.log(err);
      }
    })();
  }, [API, skill]);

  console.log(graph);

  return (
    <>
      <Stack spacing={0}>
        <Text color="primary">
          The Map of concepts shows which concepts are related to the keywords
          searched. Click on a concept word to visualize resources addressing
          the concept.
        </Text>
        <Text color="dark_grey">
          Concepts connected by lines are related. The number close to each
          concept indicate the number of resources addressing that concept.
        </Text>
      </Stack>

      <Image
        src={conceptGraph.src}
        alt="Concept Graph"
        width={800}
        height={650}
      />
    </>
  );
};
