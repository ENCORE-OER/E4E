import { Stack, Text } from '@chakra-ui/react';
import { useMemo, useState } from 'react';
import tinycolor from 'tinycolor2';
import { APIV2 } from '../../../data/api';
import { EncoreConceptMap } from '../../../types/encore';
//mport BubbleChart from '../../BubbleChart/BubbleChart';


import {
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LineElement,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
} from 'chart.js';
import { Bubble } from 'react-chartjs-2';
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
)

export type TabTypesOfResourcesProps = {
  oers?: any[];
  searchCallBack: (domainIds: String[]) => Promise<void>;
};

const data = [
  { id: 1, name: 'JSS', size: 350, fillColor: '#d3d3d3', label: 'Label 1' },
  { id: 2, name: 'Typescript', size: 100, fillColor: '#9d9a9f', label: 'Label 1' },
  { id: 3, name: 'SCSS', size: 75, fillColor: '#605f62', label: 'Label 1' },
  { id: 4, name: 'Recoil', size: 150, fillColor: '#D3D3D3', label: 'Label 1' },
  { id: 5, name: 'Redux', size: 150, fillColor: '#D3D3D3', label: 'Label 1' },
  { id: 6, name: 'Material-UI', size: 125, fillColor: '#c6c5c6', label: 'Label 1' }
]


export const TabTypesOfResources = (props: TabTypesOfResourcesProps) => {


  const { oers, searchCallBack } = props;

  const [graph, setGraph] = useState<EncoreConceptMap | null>();
  const API = useMemo(() => new APIV2(undefined), []);


  const resourceTypes: any[] = [];

  // generate colors
  const baseColors = ['#FF7E21', '#37940F',];
  const similarColors: any[] = [];

  baseColors.forEach((color) => {
    const baseColor = tinycolor(color);

    for (let i = 0; i < 20; i++) {
      const similarColor = baseColor.spin(30 * (i + 1)).toHexString();
      similarColors.push(similarColor);
    }
  });

  //retrieve resourse types
  oers?.forEach(oer => oer.media_type.map((item: any) => resourceTypes.push(item.name)));


  const transformedObject = resourceTypes.reduce((result, element) => {
    result[element] = (result[element] || 0) + 1;
    return result;
  }, {});




  const newData = Object.entries(transformedObject).map(([name, size], index) => ({
    id: index + 1,
    name: name,
    size: Number(size as string),
    fillColor: similarColors[index],
  }));



  const onClickDiagram = async (selection: any) => {
    //console.log(selection.sets);
    if (!selection) return;
    const domainIds = [...selection.sets].map((set) => set.domainId);
    await searchCallBack(domainIds);
  }


  const data1 = {
    datasets: [
      {
        label: 'Type of Resources',
        data: newData.map((item) => ({
          x: item.id,
          y: 0,
          r: item.size,
        })),
        //backgroundColor: data.map((item) => item.fillColor),
        //borderColor: '#000000',
        backgroundColor: ['red', 'blue', 'green'], // Assign different colors to each bubble
        borderColor: 'rgba(75, 192, 192, 1)', // Border color
      },
    ],
  };






  const options = {
    plugins: {
      title: {
        display: true,
        text: 'Types of Resources',
        font: {
          size: 20,
        },
        grid: {
          display: false, // Remove grid lines
        },
      },
      legend: {
        display: true,
        labels: {
          color: 'black',
        },
        filler: {
          propagate: false,
        },
      },
      zoom: {
        zoom: {
          wheel: {
            enabled: true,
          },
          pinch: {
            enabled: true,
          },
          mode: 'xy',
        },
      },
      datalabels: {
        display: true,
        align: 'center',
        anchor: 'center',
        color: 'black',
        font: {
          weight: 'bold',
        },
        formatter: (value: { dataset: { data: { [x: string]: { label: any; }; }; }; dataIndex: string | number; }) => {
          return value.dataset.data[value.dataIndex].label;
        },
      },
    },
    scales: {
      x: {
        display: false, // Remove x-axis
      },
      y: {
        display: false, // Remove y-axis
      },
    },
    elements: {
      point: {
        radius: 10, // Customize bubble point size
      },
    },
  };




  return (
    <>
      <Stack spacing={0}>
        <Text color="primary">
          The Bubble Chart shows the types of resources available for the searched keywords.
          Click on a circle to filter resources according to the selected types.
        </Text>

      </Stack>

      <div>
        <Bubble data={data1} options={options} />
      </div>


    </>
  );
};
