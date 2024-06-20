import { Button, Flex, Stack, Text } from '@chakra-ui/react';
import { ArcElement, Chart as ChartJS, Legend, Tooltip } from 'chart.js';
import { useRouter } from 'next/router';
import { useContext, useEffect, useMemo, useState } from 'react';
import { Doughnut } from 'react-chartjs-2';
import { DiscoveryContext } from '../../../Contexts/discoveryContext';
import { APIV2 } from '../../../data/api';
import { OerMediaTypeInfo } from '../../../types/encoreElements';
import { useHasHydrated } from '../../../utils/utils';
ChartJS.register(ArcElement, Tooltip, Legend);

export type TabTypesOfResourcesProps = {};

type DataObjectProps = {
  id: number[];
  labels: string[];
  datasets: {
    data: (number | undefined)[]; // count
    backgroundColor: string[];
  }[];
};

export const TabTypesOfResources = ({ }: TabTypesOfResourcesProps) => {
  const { filtered, setCurrentPage } = useContext(DiscoveryContext);
  const hydrated = useHasHydrated();
  const router = useRouter();
  const API = useMemo(() => new APIV2(undefined), []);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [resourceTypes, setResourceTypes] = useState<OerMediaTypeInfo[]>([]);
  const [filteredDataObject, setFilteredDataObject] = useState<DataObjectProps | undefined>(undefined);
  const [selectedSlice, setSelectedSlice] = useState<number | null>(null);
  const [typesSelected, setTypesSelected] = useState<string[]>([])

  const getRandomColor = () => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  const updateQuery = async (newType: number | number[], isFilter?: boolean) => {
    // Get search data from the localStorage
    const searchData = localStorage.getItem('searchData');
    if (!searchData) {
      console.error('searchData not found in localStorage');
      router.push({ pathname: '/' });
      return;
    }

    // Convert the data in a JSON format
    const convertedData = JSON.parse(searchData);
    let types = convertedData['types'] || [''];
    if (types.length > 0 && Array.isArray(newType)) {
      types = newType;
    } else {
      const updatedTypes = [...types, newType.toString()];
      types = updatedTypes;
    }
    convertedData['types'] = types;
    convertedData['isTypesFilter'] = isFilter;
    localStorage.setItem('searchData', JSON.stringify(convertedData));

    // Update the query with the selected domains
    const updatedQuery = { ...router.query, domains: types, isTypesFilter: isFilter };
    await router.push({
      pathname: '/discover',
      query: updatedQuery,
    });
  };

  const handleResetClick = async () => {
    setSelectedSlice(null);
    setTypesSelected([]);
    setCurrentPage(1);
    await updateQuery([], false);
  };

  const handleSliceClick = async (event: any, elements: any) => {
    if (elements.length > 0 && elements[0].index !== undefined) {
      const clickedIndex = elements[0].index;
      if (clickedIndex >= 0 && clickedIndex < resourceTypes.length) {
        const clickedSliceId = resourceTypes[clickedIndex].id;
        const clickedSliceLabel = resourceTypes[clickedIndex].name;
        if (selectedSlice === clickedIndex || (typesSelected.length === 1 && typesSelected[0] === clickedSliceLabel)) {
          await handleResetClick();
        } else if (typesSelected.includes(clickedSliceLabel)) {
          return;
        } else if (clickedSliceId) {
          setSelectedSlice(clickedIndex);
          setTypesSelected((prevTypes: string[]) => [
            ...prevTypes,
            clickedSliceLabel
          ]);
          setCurrentPage(1);
          await updateQuery(clickedSliceId, true);
        }
      }
    }
  };

  const filterData = (data: DataObjectProps) => {
    if (selectedSlice !== null && resourceTypes[selectedSlice]) {
      const { id, name, count } = resourceTypes[selectedSlice];
      return {
        id: [id],
        labels: [name],
        datasets: [
          {
            data: [count],
            backgroundColor: data.datasets[0].backgroundColor,
          },
        ],
      };
    } else {
      return data;
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Get the search data from the localStorage
        const searchData = localStorage.getItem('searchData');
        if (!searchData) {
          router.push({ pathname: '/' });
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
        // TODO: Check if this is useful (20/06/2024 => the API doesn't work differently adding this logic)
        const isTypesFilter = convertedData['isTypesFilter'];

        const respAPI = await API.getTypesFreeSearch(
          keywords,
          domains,
          types,
          audience,
          operator,
          concepts,
          isDomainsFilter,
          isTypesFilter
        );

        if (respAPI.length > 0) {
          setResourceTypes(respAPI);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    setIsLoading(true);
    fetchData();
  }, [API,
    router.query.concepts,
    router.query.keywords,
    router.query.domains,
    router.query.types,
    router.query.audience,
  ]);

  useEffect(() => {
    if (resourceTypes.length > 0) {

      resourceTypes.sort((a, b) => (b.count ?? 0) - (a.count ?? 0));

      const datasets = resourceTypes.map((item: OerMediaTypeInfo) => ({
        label: `${item.name} (Size: ${item.count})`,
        data: [{ id: item.id, r: item.count, type: item.name }],
        backgroundColor: getRandomColor(),
      }));

      const jsonData = { datasets: datasets };

      const transformedData = jsonData.datasets.flatMap((dataset) =>
        dataset.data.map((item) => ({
          id: item.id,
          label: item.type,
          value: item.r,
          backgroundColor: dataset.backgroundColor,
        }))
      );

      const data: DataObjectProps = {
        id: transformedData.map((item) => item.id),
        labels: transformedData.map((item) => item.label),
        datasets: [
          {
            data: transformedData.map((item) => item.value),
            backgroundColor: transformedData.map((item) => item.backgroundColor),
          },
        ],
      };

      const newData = filterData(data);
      setFilteredDataObject(newData);
    }
  }, [resourceTypes]);

  return (
    <>
      <Stack spacing={0}>
        <Text color="primary">
          The Pie Chart shows the types of resources available for the searched
          keywords. Click on a portion to filter resources according to the
          selected types.
        </Text>
      </Stack>
      {isLoading && (
        <div className="loading-spinner">
          <div className="spinner"></div>
          <p>Loading...</p>
        </div>
      )}
      {!isLoading && filtered.length > 0 && hydrated && (
        <Stack spacing={0}>
          <Doughnut
            data={filteredDataObject || { id: [], labels: [], datasets: [] }}
            options={{ onClick: handleSliceClick }}
          />
        </Stack>
      )}
      {filtered.length > 0 && typesSelected.length > 0 && (
        <Flex direction="column" textAlign="center" pt={5} pb={0}>
          <Text variant="label">
            Types selected: {typesSelected.join(', ')}
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
              Reset resource types
            </Text>
          </Button>
        </Flex>
      )}
    </>
  );
};
