import { Box, Flex, Text } from '@chakra-ui/react';

import { useEffect } from 'react';
import {
  OerAudienceInfo,
  OerDomainInfo,
  OerMediaTypeInfo,
  OerSubjectInfo,
} from '../../types/encoreElements';
import DropDownMenu from '../DropDownMenu/DropDownMenu';

type AdvancedSearchProps = {
  //buttonWidth: string; // mi serve per impostare la 'width' fissa dei menuButton in base alla pagina in cui sono
  domain?: OerDomainInfo[];
  subject?: OerSubjectInfo[];
  resourceType?: OerMediaTypeInfo[];
  audience?: OerAudienceInfo[];
  onDomainFromDropDownMenu?: (domain: string[] | number[]) => void;
  onResourceTypeFromDropDownMenu?: (resType: string[] | number[]) => void;
  onAudienceFromDropDownMenu?: (audience: string[] | number[]) => void;
  isSmallerScreen?: boolean;
};

const ALL = { id: 0, name: 'All' };
//const ALL_string = 'All';

export default function AdvancedSearch({
  domain,
  resourceType,
  audience,
  onDomainFromDropDownMenu,
  onResourceTypeFromDropDownMenu,
  onAudienceFromDropDownMenu,
  isSmallerScreen,
}: AdvancedSearchProps) {
  // adding "All" checkbox
  useEffect(() => {
    if (!domain?.includes(ALL)) domain?.unshift(ALL);
    console.log('Domain in AdvancedSearch' + domain);
  }, [domain]);
  useEffect(() => {
    if (!resourceType?.includes(ALL)) resourceType?.unshift(ALL);
  }, [resourceType]);
  useEffect(() => {
    if (!audience?.includes(ALL)) audience?.unshift(ALL);
  }, [audience]);

  const handleDomainFromDropDownMenu = (domain: string[] | number[]) => {
    if (onDomainFromDropDownMenu) {
      onDomainFromDropDownMenu(domain);
    }
  };

  const handleResourceTypeFromDropDownMenu = (resType: string[] | number[]) => {
    if (onResourceTypeFromDropDownMenu) {
      onResourceTypeFromDropDownMenu(resType);
    }
  };

  const handleAudienceFromDropDownMenu = (audience: string[] | number[]) => {
    if (onAudienceFromDropDownMenu) {
      onAudienceFromDropDownMenu(audience);
    }
  };

  return (
    <>
      <Flex
        w="100%"
        gap={4}
        flexWrap={isSmallerScreen ? 'nowrap' : 'wrap'}
        justify={'center'}
        flexDirection={isSmallerScreen ? 'column' : 'row'}
      //pt={isSmallerScreen ? '0' : '4'}
      >
        <Box w="220px">
          <Text variant="text_field_label" py='6px'>
            Domain
          </Text>
          <DropDownMenu
            optionsObj={domain}
            onData={handleDomainFromDropDownMenu}
          />
        </Box>
        <Box w="220px">
          <Text variant="text_field_label" py="6px">
            Type of resources
          </Text>
          <DropDownMenu
            optionsObj={resourceType}
            onData={handleResourceTypeFromDropDownMenu}
          />
        </Box>
        <Box w="220px" >
          <Text variant="text_field_label" py="6px">
            Audience
          </Text>
          <DropDownMenu
            optionsObj={audience}
            onData={handleAudienceFromDropDownMenu}
          />
        </Box>
      </Flex>
    </>
  );
}
