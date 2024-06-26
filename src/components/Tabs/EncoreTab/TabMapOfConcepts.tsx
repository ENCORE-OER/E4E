/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Flex, Stack, Text } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { useEffect, useMemo, useState } from 'react';
import { TagCloud } from 'react-tagcloud';
import 'reactflow/dist/style.css';
import { APIV2 } from '../../../data/api';
// import { OerConceptInfo } from '../../../types/encoreElements';
import { useDiscoveryContext } from '../../../Contexts/discoveryContext';
import { OerConceptGetAPIInfo } from '../../../types/encoreElements/oer/OerConceptGetAPI';
import { useHasHydrated } from '../../../utils/utils';

export type TabMapOfConceptsProps = {};

// type Tag = {
//   value: string;
//   count: number;
// };

export const TabMapOfConcepts = ({}: TabMapOfConceptsProps) => {
  const API = useMemo(() => new APIV2(undefined), []);
  const router = useRouter();
  const hydrated = useHasHydrated();
  const { filtered, setCurrentPage, conceptsSelected, setConceptsSelected } =
    useDiscoveryContext();
  //const [tags, setTags] = useState<Tag[]>([]);
  const [tags, setTags] = useState<OerConceptGetAPIInfo[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  //const [conceptCounts, setConceptCounts] = useState<Record<number, number>>({});
  const [visibleTags, setVisibleTags] = useState<number>(50); // Initial number of tags to show
  const loadMoreStep = 50; // Number of tags to load when clicking on "View More"

  const getBackgroundColor = (value: number) => {
    // Define a color mapping based on the size of the tag value
    const colorMap = {
      small: '#e9e6ed',
      medium: '#d3cddb',
      large: '#beb4c9',
    };

    // Determine the size category based on the value length
    let sizeCategory: string;
    if (value <= 3) {
      sizeCategory = 'small';
    } else if (value <= 6) {
      sizeCategory = 'medium';
    } else {
      sizeCategory = 'large';
    }

    // Get the background color from the color mapping
    return colorMap[sizeCategory as keyof typeof colorMap];
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  /* const options: any = {
     colors: ["#25044a", "#2a0554", "#491f78", "#5d3887"],
     enableTooltip: true,
     deterministic: true,
     fontFamily: "nunito",
     fontSizes: [15, 70],
     fontStyle: "normal",
     fontWeight: "normal",
     padding: 1,
     rotations: 3,
     rotationAngles: [0, 90],
     scale: "sqrt",
     spiral: "archimedean",
     transitionDuration: 1000
   };
 */

  const updateQuery = async (newConcepts: number | number[]) => {
    const searchData = localStorage.getItem('searchData');
    if (!searchData) {
      console.error('searchData not found in localStorage');
      // TODO: handle redirect
      router.replace({
        pathname: '/',
      });
      return;
    }
    const convertedData = JSON.parse(searchData);
    let concepts = convertedData['concepts'] || [''];

    if (concepts.length > 0 && Array.isArray(newConcepts)) {
      concepts = newConcepts;
    } else {
      const updatedConcepts = [...concepts, newConcepts.toString()];
      // Update the concepts array in the searchData object
      concepts = updatedConcepts;
    }

    // console.log(concepts);
    convertedData['concepts'] = concepts;
    localStorage.setItem('searchData', JSON.stringify(convertedData));

    await router.replace({
      pathname: '/discover',
      query: { ...router.query, concepts: concepts },
    });
  };

  const handleResetClick = async (/*event: any*/) => {
    //if (event.target === event.currentTarget) {
    // Handle click on the white space
    // Reload the current page
    //setCurrentPage(1);
    setConceptsSelected([]);
    await updateQuery([]);
    //window.location.reload();

    //}
  };

  // ====================================================================================================
  // ------------------------------  Handle tag click event  --------------------------------------------
  const handleTagClick = async (selectedTag: OerConceptGetAPIInfo) => {
    //setConceptSelected(true);
    setConceptsSelected((prevConceptsSelected: string[]) => [
      ...prevConceptsSelected,
      selectedTag.name,
    ]);
    setCurrentPage(1);
    await updateQuery(selectedTag.id);
  };

  // ====================================================================================================

  // Handle query update
  useEffect(() => {
    const fetchData = async () => {
      try {
        // ------------------------------  Get the search data from the localStorage  --------------------------------------------
        // setTags([]);
        const searchData = localStorage.getItem('searchData');
        if (!searchData) {
          // TODO: handle redirect
          router.replace({
            pathname: '/',
          });
          return;
        }
        const convertedData = JSON.parse(searchData);
        const keywords = convertedData['keywords'];
        const domains = convertedData['domains'];
        const types = convertedData['types'];
        const audience = convertedData['audience'];
        const operator = convertedData['operator'];
        const concepts = convertedData['concepts'];
        const isDomainsFilter = convertedData['isDomainsFilter'];
        const isTypesFilter = convertedData['isTypesFilter'];

        const respAPI = await API.getConceptsFreeSearch(
          keywords,
          domains,
          types,
          audience,
          operator,
          concepts,
          isDomainsFilter,
          isTypesFilter
        );
        // At the moment is useless 'cause the API return every concept only one time and the count is always 1
        // respAPI.forEach(({ id }) => {
        //   setConceptCounts((prevConceptCounts) => ({
        //     ...prevConceptCounts,
        //     [id]: (prevConceptCounts[id] || 0) + 1,
        //   }));
        // });
        //-------------------------------------------------------------------------------------------------------------------------

        // ==================================  Get the concepts from the filtered OERs  =========================================
        // const oers_ids: number[] = [];
        // filtered?.forEach((oer: OerProps | undefined | OerFreeSearchProps) => {
        //   //console.log(oer.id);
        //   if (oer !== undefined) {
        //     oers_ids.push(oer.id);
        //   }
        // });
        // const respAPI = await API.getConceptsWords(oers_ids);

        // const resultArray = Object.entries(respAPI).map(([text, value]) => ({
        //   // id: concept.id,
        //   // label: concept.label,
        //   text,
        //   value,
        // }));

        // ===============================================================================================

        // const tagsArray = resultArray

        // Populate concepts tags
        const tagsArray = respAPI.map(({ id, name }) => ({
          //value: String(text),
          //count: Number(value),
          id,
          name,
        }));
        // Filter out the concepts that appear less than N times
        //.filter((tag) => tag.count > 2); // here we set the minimum number of times a concept should appear in the OERs to be considered relevant to be shown in the map of concepts

        setTags(tagsArray);
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    // if (filtered?.length > 0) {
    //   setIsLoading(true);
    //   fetchData();
    // }

    setIsLoading(true);
    fetchData();
  }, [
    API,
    JSON.stringify({
      concepts: router.query.concepts,
      keywords: router.query.keywords,
      domains: router.query.domains,
      types: router.query.types,
      audience: router.query.audience,
    }),
  ]);

  // useEffect(() => {
  //   console.log('tags', tags);
  // }, [tags]);

  return (
    <>
      <Stack spacing={0}>
        <Text color="primary">
          The Map of concepts shows which concepts are related to the keywords
          searched. Click on a concept word to visualize resources addressing
          the concept.
        </Text>
        {conceptsSelected.length > 0 && (
          <Flex direction="column" textAlign="center" pt={5} pb={0}>
            <Text variant="label">
              {`Concepts selected: ${conceptsSelected.join(', ')}`}
            </Text>
            <Button
              variant="ghost"
              _hover={{ bg: 'none' }}
              onClick={handleResetClick}
            >
              <Text
                color="gray.500"
                borderBottom="1px"
                borderBottomColor="gray.500"
              >
                Reset concepts
              </Text>
            </Button>
          </Flex>
        )}
      </Stack>
      <br />
      {isLoading && (
        <div className="loading-spinner">
          <div className="spinner"></div>
          <p>Loading...</p>
        </div>
      )}
      {!isLoading && tags.length > 0 && filtered?.length > 0 && hydrated && (
        <Flex direction="column" p={0} m={0}>
          <Text color="gray.500" fontWeight="bold" pb={2}>
            {`${tags.length} concepts found`}
          </Text>
          <TagCloud
            tags={tags.slice(0, visibleTags) ?? []}
            minSize={12}
            maxSize={30}
            colorOptions={{ luminosity: 'light' }}
            onClick={(tag: OerConceptGetAPIInfo) => {
              handleTagClick(tag);
              // // Filter the `filtered` array based on the selected word
              // const newFilteredObjects = filtered.filter(
              //   (oer: { concepts: OerConceptInfo[] } | undefined | OerProps | OerFreeSearchProps) => {
              //     return oer?.concepts?.some(
              //       (concept) => concept?.label === tag.value
              //     );
              //   }
              // );

              // // Update the main DiscoveryContext with the new filtered OERs
              // setFiltered(newFilteredObjects);
              // // Handle tag click event here
            }}
            renderer={(tag: OerConceptGetAPIInfo, size: number) => (
              <span
                style={{
                  fontSize: size,
                  padding: '4px 8px',
                  margin: 4,
                  // backgroundColor: getBackgroundColor(tag.count),
                  //backgroundColor: getBackgroundColor(conceptCounts[tag.id]),
                  backgroundColor: getBackgroundColor(1),
                  color: '#51366e',
                  borderRadius: '4px',
                  display: 'inline-block',
                  cursor: 'pointer',
                }}
              >
                {tag?.name}
              </span>
            )}
          />
          {visibleTags < tags.length && (
            <Flex justifyContent={'center'} p={5}>
              <Button
                variant="ghost"
                _hover={{ bg: 'none' }}
                color={'gray.400'}
                onClick={() => setVisibleTags((prev) => prev + loadMoreStep)}
              >
                <Text borderBottom={1} borderBottomStyle="solid">
                  View More
                </Text>
              </Button>
            </Flex>
          )}
        </Flex>
      )}
      {!isLoading && tags.length === 0 && (
        <Flex justifyContent="center">
          <Text variant="navbar_label">No concepts found</Text>
        </Flex>
      )}
    </>
  );
};
