import Select, { MultiValue } from 'react-select';
import { OerConceptInfo } from '../../types/encoreElements';

type SelectConceptsProps = {
  collectionLength: number;
  uniqueConcepts: OerConceptInfo[];
  conceptsSelected: OerConceptInfo[];
  handleConceptsChange: (selectedOptions: MultiValue<OerConceptInfo>) => void;
};

export default function SelectConcepts({
  collectionLength,
  uniqueConcepts,
  conceptsSelected,
  handleConceptsChange,
}: SelectConceptsProps) {
  return (
    <Select
      minMenuHeight={10000}
      isMulti
      isDisabled={!collectionLength || collectionLength === 0}
      options={uniqueConcepts}
      value={conceptsSelected}
      onChange={handleConceptsChange}
      getOptionLabel={(option) => option.label} // Specify how to get the label
      getOptionValue={(option) => option.id.toString()} // Specify how to get the value
      placeholder="Select Concepts"
      menuPortalTarget={document.body} // Different portal for the menu
      styles={{
        control: (provided) => ({
          ...provided,
          borderRadius: '5px',
          //minHeight: '30px',
          //height: '30px',
        }),
        menuPortal: (base) => ({
          ...base,
          zIndex: 9999,
        }),
        menu: (base) => ({
          ...base,
          maxHeight: 'none',
        }),
        menuList: (base) => ({
          ...base,
          maxHeight: '550px', // here to extend optionsList height
        }),
        option: (provided) => ({
          ...provided,
          //padding: '10px', // here to extend option box height
          borderRadius: '5px',
        }),
      }}
    />
  );
}
