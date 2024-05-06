import React, { useState } from "react";
import { Checkbox, Menu, MenuButton, MenuItem, MenuList, Button, Box } from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";

type CheckboxDropdownProps = {
    options: string[];
    title: string;
    onChange: (selectedOptions: string[]) => void;
    isHighlighted?: boolean;
}

const CheckboxDropdown = ({ options, onChange, title, isHighlighted }: CheckboxDropdownProps) => {
    const [selectAll, setSelectAll] = useState(false);
    const [selectedOptions, setSelectedOptions] = useState<string[]>([]);

    const handleCheckboxChange = (value: string) => {
        const newSelectedOptions = selectedOptions.includes(value)
            ? selectedOptions.filter(option => option !== value)
            : [...selectedOptions, value];

        setSelectedOptions(newSelectedOptions);
        onChange(newSelectedOptions);

        const allSelected = options.every(option => newSelectedOptions.includes(option));
        setSelectAll(allSelected);
    };

    const handleSelectAllChange = () => {
        const newSelectedOptions = selectAll ? [] : options;

        setSelectedOptions(newSelectedOptions);
        setSelectAll(!selectAll);
        onChange(newSelectedOptions);
    };

    return (
      <Box
        w="100%"
        flex="1"
        border={
          isHighlighted
            ? '1.5px solid #bf5521ff'
            : '1px solid #CED4DA'
        }
        borderRadius="7px"
      >
        <Menu closeOnSelect={false}>
            <MenuButton
                w="100%"
                as={Button}
                rightIcon={<ChevronDownIcon />}
                _expanded={{ bg: 'yellow.400' }}
                textAlign="left"
            >
             {title}    
            </MenuButton>
            <MenuList>
                <MenuItem>
                    <Checkbox
                      colorScheme='yellow'
                      isChecked={selectAll}
                      onChange={handleSelectAllChange}
                    >
                      select all
                    </Checkbox>
                </MenuItem>
                {options.map((option) => (
                    <MenuItem key={option}>
                        <Checkbox
                          colorScheme='yellow'
                          isChecked={selectedOptions.includes(option)}
                          onChange={() => handleCheckboxChange(option)}
                        >
                          {option}
                        </Checkbox>
                    </MenuItem>
                ))}
            </MenuList>
        </Menu>
      </Box>
    );
};

export default CheckboxDropdown;
