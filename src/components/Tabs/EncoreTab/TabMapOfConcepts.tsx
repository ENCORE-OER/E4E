/* eslint-disable @typescript-eslint/no-explicit-any */
import { Box, Button, Flex, Stack, Text } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { useContext, useEffect, useMemo, useState } from 'react';
import { TagCloud } from 'react-tagcloud';
import 'reactflow/dist/style.css';
import { DiscoveryContext } from '../../../Contexts/discoveryContext';
import { APIV2 } from '../../../data/api';
import { OerConceptInfo } from '../../../types/encoreElements';
import { useHasHydrated } from '../../../utils/utils';

export type TabMapOfConceptsProps = {};

// type Tag = {
//   value: string;
//   count: number;
// };

export const TabMapOfConcepts = ({ }: TabMapOfConceptsProps) => {
  const API = useMemo(() => new APIV2(undefined), []);
  const router = useRouter();
  const hydrated = useHasHydrated();
  //const [tags, setTags] = useState<Tag[]>([]);
  const [tags, setTags] = useState<OerConceptInfo[]>([]);
  const { filtered, setCurrentPage } = useContext(DiscoveryContext);
  const [isLoading, setIsLoading] = useState(false);
  const [conceptsSelected, setConceptsSelected] = useState<string[]>([]);
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

  const handleResetClick = async (/*event: any*/) => {
    //if (event.target === event.currentTarget) {
    // Handle click on the white space
    // Reload the current page
    //setCurrentPage(1);
    setConceptsSelected([]);
    const searchData = localStorage.getItem('searchData');
    if (!searchData) {
      console.error('searchData not found in localStorage');
      // TODO: handle redirect
      router.push({
        pathname: '/',
      });
      return;
    }
    const convertedData = JSON.parse(searchData);
    if (convertedData['concepts'].length > 0) {
      convertedData['concepts'] = [];
    }
    localStorage.setItem('searchData', JSON.stringify(convertedData));

    await router.push({
      pathname: '/discover',
      query: { ...router.query, concepts: [] },
    });
    //window.location.reload();


    //}
  };

  // ====================================================================================================
  // ------------------------------  Handle tag click event  --------------------------------------------
  const handleTagClick = async (selectedTag: OerConceptInfo) => {
    //setConceptSelected(true);
    setConceptsSelected([...conceptsSelected, selectedTag.label]);
    setCurrentPage(1);

    const searchData = localStorage.getItem('searchData');
    if (!searchData) {
      console.error('searchData not found in localStorage');
      // TODO: handle redirect
      router.push({
        pathname: '/',
      });
      return;
    }

    const convertedData = JSON.parse(searchData);
    const concepts = convertedData['concepts'] || [''];
    const updatedConcepts = [...concepts, selectedTag.id.toString()];

    // Update the concepts array in the searchData object
    convertedData['concepts'] = updatedConcepts;

    console.log('convertedData - concepts', convertedData['concepts']);

    // Update the searchData in the localStorage
    localStorage.setItem('searchData', JSON.stringify(convertedData));
    // // Extract the labels and ids from the response of getConceptsFreeSearch
    // const conceptLabels = tags.map(tag => tag.label);
    // const conceptIds = tags.map(tag => tag.id);



    // // Find the index of the selected concept in the labels array
    // const selectedIndex = conceptLabels.indexOf(selectedTag.label);

    // // Get the id of the selected concept
    // const selectedConceptId = conceptIds[selectedIndex];

    // localStorage.setItem('searchData', JSON.stringify(selectedConceptId));


    // Update the query with the selected concept id
    const updatedQuery = { ...router.query, concepts: updatedConcepts };
    await router.push({
      pathname: '/discover',
      query: updatedQuery,
    });
  };

  // ====================================================================================================

  useEffect(() => {
    const fetchData = async () => {
      try {

        // ------------------------------  Get the search data from the localStorage  --------------------------------------------
        // setTags([]);
        const searchData = localStorage.getItem('searchData');
        if (!searchData) {
          // TODO: handle redirect
          router.push({
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

        const respAPI = await API.getConceptsFreeSearch(keywords, domains, types, audience, operator, concepts);
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
        const tagsArray = respAPI
          .map(({ id, label }) => ({
            //value: String(text),
            //count: Number(value),
            id,
            label
          }))
        // Filter out the concepts that appear less than N times
        //.filter((tag) => tag.count > 2); // here we set the minimum number of times a concept should appear in the OERs to be considered relevant to be shown in the map of concepts

        setTags(tagsArray);

      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    if (filtered?.length > 0) {
      setIsLoading(true);
      fetchData();
    }
  }, [API, router.query.concepts, router.query.keywords, router.query.domains, router.query.types, router.query.audience]);

  useEffect(() => {
    console.log('tags', tags);
  }, [tags]);
  return (
    <>
      <Stack spacing={0}>
        <Text color="primary">
          The Map of concepts shows which concepts are related to the keywords
          searched. Click on a concept word to visualize resources addressing
          the concept.
        </Text>
        {conceptsSelected.length > 0 && (
          <Box textAlign="center" pt={5} pb={0}>
            <Text variant="label">
              Concepts selected: {conceptsSelected.join(', ')}
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
          </Box>
        )}
      </Stack>
      <br />
      <br />
      {isLoading && (
        <div className="loading-spinner">
          <div className="spinner"></div>
          <p>Loading...</p>
        </div>
      )}
      {!isLoading &&
        tags.length > 0 &&
        //filtered?.length > 0 && 
        hydrated && (
          <div>
            <TagCloud
              tags={tags.slice(0, visibleTags) ?? []}
              minSize={12}
              maxSize={30}
              colorOptions={{ luminosity: 'light' }}
              onClick={(tag: OerConceptInfo) => {
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
              renderer={(tag: OerConceptInfo, size: number) => (
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
                  {tag?.label}
                </span>
              )}
            />
            {visibleTags < tags.length && (
              <Flex
                justifyContent={'center'}
                p={5}
              >
                <Button
                  variant="ghost"
                  _hover={{ bg: 'none' }}
                  color={"gray.400"}
                  onClick={() => setVisibleTags((prev) => prev + loadMoreStep)}
                >
                  <Text
                    borderBottom={1}
                    borderBottomStyle="solid"
                  >
                    View More
                  </Text>

                </Button>
              </Flex>
            )
            }
          </div>
        )}
      {!isLoading &&
        tags.length === 0 &&
        <Flex justifyContent="center">
          <Text variant="navbar_label">
            No concepts found
          </Text>
        </Flex>
      }
    </>
  );
};
