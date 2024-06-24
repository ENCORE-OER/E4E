import { useBreakpointValue } from '@chakra-ui/react';
import axios from 'axios';
import { DomHandler, DomUtils, Parser } from 'htmlparser2';
import { extractRawText } from 'mammoth';
import { getDocument } from 'pdfjs-dist';
import { TextItem, TextMarkedContent } from 'pdfjs-dist/types/src/display/api';
import { useEffect, useState } from 'react';
import {
  ArrayProps,
  GeneratedExerciseProps,
  OerConceptInfo,
  OerInCollectionProps,
  Option,
  OptionsData,
  SkillItemProps,
  UploadedFilesProps,
} from '../types/encoreElements';
import { DomainsEnum } from '../types/encoreElements/oer/enums/Domains';

// fix zust persist issue https://github.com/pmndrs/zustand/issues/324
// if an error like Extra attributes from the server appear use this hook
export const useHasHydrated = () => {
  const [hasHydrated, setHasHydrated] = useState<boolean>(false);

  useEffect(() => {
    setHasHydrated(true);
  }, []);

  return hasHydrated;
};

// Use this for the responsive design of the page
export const useIsSmallerScreen = (): boolean => {
  return useBreakpointValue({
    base: true,
    sm: true,
    md: false,
    lg: false,
  }) as boolean;
};

export const isObject = (variable: any) => {
  return (
    typeof variable === 'object' &&
    !Array.isArray(variable) &&
    variable !== null
  );
};

export const zip = <T, K>(a: T[], b: K[]) =>
  a.map((k, i) => ({ first: k, second: b[i] }));

// Method to check if is an Option object
const isOption = (obj: any): obj is Option => {
  return (
    obj &&
    typeof obj.title === 'string' &&
    (typeof obj.description === 'undefined' ||
      typeof obj.description === 'string')
  );
};

// Method to check if is an ArrayProps object
const isArrayProps = (obj: any): obj is ArrayProps => {
  return obj && (typeof obj.name === 'string' || typeof obj.title === 'string');
};

// Function to map the selected option to the corresponding index. Usually used to give a number to the API

export const mapOptionToNumber = (
  option: Option | ArrayProps | null,
  enumObject: any
): number => {
  if (!option) return -1;

  if (isOption(option)) {
    return enumObject[option.title] ?? -1;
  } else if (isArrayProps(option)) {
    return option.title
      ? enumObject[option.title] ?? -1
      : option.name
        ? enumObject[option.name] ?? -1
        : -1;
  }

  return -1;
};

export const mapNumberToString = (number: number, enumObject: any): string => {
  if (number === undefined || number === null) return '';
  return enumObject[number];
};

export const mapStringToString = (string: string, enumObject: any): string => {
  if (!string) return '';
  return enumObject[string];
};

export const stringArrayToOptionsObject = (
  apiFillGapsData: GeneratedExerciseProps
) => {
  const optionsObject: OptionsData[] = [];

  // Aggiungi tutte le stringhe da A all'array di risultato con il bool impostato su true
  apiFillGapsData.Solutions.forEach((string) =>
    optionsObject.push([string, true])
  );

  // Aggiungi tutte le stringhe da B e C all'array di risultato con il bool impostato su false
  [
    ...apiFillGapsData.Distractors,
    ...apiFillGapsData.EasilyDiscardableDistractors,
  ].forEach((string) => optionsObject.push([string, false]));

  console.log('optionsObject', optionsObject);
  return optionsObject;
};

// This method extracts text from either a file or a URL.
export const handleExtractText = async (source: string) => {
  // if the input is a copied-pasted text, return it, else extract the text from the path or the text from the url
  if (source.length > 300) {
    return source;
  } else {
    try {
      // check if the source is a url or a path
      if (source.startsWith('http')) {
        if (source.endsWith('.txt')) {
          return await extractTextFromTxtUrl(source);
        } else if (source.endsWith('.pdf')) {
          return await extractTextFromPdfUrl(source);
        } else if (source.endsWith('.docx')) {
          return await extractTextFromDocxUrl(source);
        } else {
          return await extractTextFromUrl(source);
        }
      }
      // else {
      //     // Handle local file logic here
      //     console.log('Local file handling not implemented.');
      // }
    } catch (error) {
      console.error('Error extracting text:', error);
      // setText('Error extracting text.');
      return '';
    }
  }
};

// Function to convert DOM to string
const domToString = (dom: any): string => {
  return dom.map((node: any) => DomUtils.textContent(node)).join(' ');
};

// This method asynchronously extracts text from a web page given its URL.
const extractTextFromUrl = async (url: string): Promise<string> => {
  const response = await axios({
    method: 'get',
    url: `/api/textExtraction/analyzeUrl?url=${encodeURIComponent(url)}`,
    responseType: 'json',
  });
  console.log(response);
  if (response?.data !== undefined) {
    const html = response?.data;
    console.log(html as string);
    // Extract the text from the HTML document.
    const handler = new DomHandler();
    const parser = new Parser(handler);
    parser.write(html);
    parser.end();
    const dom = handler.dom;
    const extractedText = domToString(dom);
    return extractUsefulText(extractedText || '');
  } else {
    return '';
  }
};

// This method extracts text from a text file.
const extractTextFromTxtUrl = async (url: string): Promise<string> => {
  const response = await axios({
    method: 'get',
    url: `/api/textExtraction/analyzeUrl?url=${encodeURIComponent(url)}`,
    responseType: 'arraybuffer',
  });
  console.log(response);
  return response?.data ? response?.data : '';
};

// To check if the type is TextItem
const isTextItem = (item: TextItem | TextMarkedContent): item is TextItem => {
  return (item as TextItem).str !== undefined;
};

// This method extracts text from a PDF file.
const extractTextFromPdfUrl = async (url: string): Promise<string> => {
  const response = await axios({
    method: 'get',
    url: `/api/textExtraction/analyzeUrl?url=${encodeURIComponent(url)}`,
    responseType: 'arraybuffer',
  });
  console.log(response);
  if (response?.data !== undefined) {
    const pdfData = new Uint8Array(response?.data);
    const pdf = await getDocument({ data: pdfData }).promise;
    let text = '';
    for (let i = 1; i <= pdf.numPages; i++) {
      const page = await pdf.getPage(i);
      const content = await page.getTextContent();
      // Append the text extracted from this page to the result.
      text += content.items
        .filter(isTextItem)
        .map((item: TextItem) => item.str)
        .join(' ');
    }
    return extractUsefulText(text);
  } else {
    return '';
  }
};

// This method extracts text from Word document (DocX) file.
const extractTextFromDocxUrl = async (url: string): Promise<string> => {
  // Read the DocX document from the response stream asynchronously.
  const response = await axios({
    method: 'get',
    url: `/api/textExtraction/analyzeUrl?url=${encodeURIComponent(url)}`,
    responseType: 'arraybuffer',
  });
  console.log(response);
  if (response?.data !== undefined) {
    const result = await extractRawText({ arrayBuffer: response.data });
    return extractUsefulText(result.value);
  } else {
    return '';
  }
};

// this method parses the text and removes all the useless characters
const extractUsefulText = (inputText: string): string => {
  // Remove line breaks, extra spaces, \n, and \r
  inputText = inputText.replace(/[\n\r\t]+/g, ' ');

  // Remove content that doesn't contain letters or numbers
  inputText = inputText.replace(/[^\p{L}\p{N}\s]+/gu, '');

  // Trim any leading or trailing spaces
  return inputText.trim();
};

// export const stringArrayToOptionsObject = (
//   apiFillGapsData: GeneratedExerciseProps
// ) => {
//   const optionsObject = {} as OptionsData;
//   apiFillGapsData.Solutions.forEach((solution) => {
//     optionsObject[solution] = true;
//   });
//   apiFillGapsData.Distractors.forEach((distractor) => {
//     optionsObject[distractor] = false;
//   });
//   apiFillGapsData.EasilyDiscardableDistractors.forEach((distractor) => {
//     optionsObject[distractor] = false;
//   });
//   console.log('optionsObject', optionsObject);

//   return optionsObject;
// };

// // Export to Excel function
// export const exportToExcel = (data: any) => {
//   const worksheet = XLSX.utils.json_to_sheet(
//     data.map((item: any, index: number) => ({
//       Nb: index + 1,
//       Type: item.lessonType,
//       Activity: item.activityType,
//       Time: item.timeDuration,
//       Description: item.activityDescription,
//       Content: item.content,
//     }))
//   );
//   const workbook = { Sheets: { data: worksheet }, SheetNames: ['data'] };
//   const excelBuffer = XLSX.write(workbook, {
//     bookType: 'xlsx',
//     type: 'array',
//   });
//   const dataBlob = new Blob([excelBuffer], {
//     type: 'application/octet-stream',
//   });
//   saveAs(dataBlob, 'learning_path_table.xlsx');
// };

export const getCurrentDate = () => {
  const currentDate = new Date();
  const day = currentDate.getDate();
  const month = currentDate.getMonth() + 1;
  const year = currentDate.getFullYear();
  const formattedDate = `${day}/${month}/${year}`; // Puoi personalizzare il formato della data secondo le tue esigenze
  return formattedDate;
};

// To extract the name of the domains when a intersection of the venn diagram is selected
export const extractSetIds = (name: string) => {
  // Regex to extract names within parentheses
  const regex = /\((.*?)\)/g;
  const matches = name.match(regex);
  console.log(matches);

  if (matches && matches.length > 0) {
    // The first match contains the text within parentheses
    const matchText = matches[0];

    // Extract names by splitting with the intersection symbol "∩"
    const setNames = matchText
      .slice(1, -1) // Remove initial and final parentheses
      .split(' ∩ ') // Split by intersection symbol
      .map((name) => name.toLowerCase()); // Convert all names to lowercase

    console.log(setNames);

    // Map domains to IDs
    const domainIds = setNames.map((domainName: string) =>
      mapOptionToNumber({ name: domainName }, DomainsEnum)
    );

    // Return list of the domains' IDs
    return domainIds;
  } else {
    // Selection of only digital, green or entrepreneurship
    return [mapOptionToNumber({ name: name.toLowerCase() }, DomainsEnum)];
  }
};

// Check if the varaible is OerInCollectionProps type
export const isOerInCollectionProps = (
  arr: any[] | any
): arr is OerInCollectionProps[] | OerInCollectionProps => {
  if (!Array.isArray(arr)) {
    return 'concepts' in arr;
  }
  return arr.length === 0 || 'concepts' in arr[0];
};

// Check if the varaible is UploadedFilesProps type
export const isUploadedFilesProps = (
  arr: any | any[]
): arr is UploadedFilesProps | UploadedFilesProps[] => {
  if (!Array.isArray(arr)) {
    return 'fileUploaded' in arr;
  }
  return arr.length === 0 || 'fileUploaded' in arr[0];
};

export const isOerConcept = (
  arr: any | any[]
): arr is OerConceptInfo | OerConceptInfo[] => {
  if (!Array.isArray(arr)) {
    return 'name' in arr;
  }
  return arr.length === 0 || 'name' in arr[0];
};

export const isSkillItem = (
  arr: any | any[]
): arr is SkillItemProps | SkillItemProps[] => {
  if (!Array.isArray(arr)) {
    return 'label' in arr;
  }
  return arr.length === 0 || 'label' in arr[0];
};
