import { Box, Grid, GridItem, Text } from '@chakra-ui/react';

import { useEffect } from 'react';
import DropDownMenu from '../DropDownMenu/DropDownMenu';

type AdvancedSearchProps = {
  //buttonWidth: string; // mi serve per impostare la 'width' fissa dei menuButton in base alla pagina in cui sono
  domain?: any[];
  subject?: any[];
  resourceType?: any[];
  audience?: any[];
  onDomainFromDropDownMenu?: (domain: any[]) => void;
  onResourceTypeFromDropDownMenu?: (resType: any[]) => void;
  onAudienceFromDropDownMenu?: (audience: any[]) => void;
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
}: AdvancedSearchProps) {
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

  const handleDomainFromDropDownMenu = (domain: any[]) => {
    if (onDomainFromDropDownMenu) {
      onDomainFromDropDownMenu(domain);
    }
  };



  const handleResourceTypeFromDropDownMenu = (resType: any[]) => {
    if (onResourceTypeFromDropDownMenu) {
      onResourceTypeFromDropDownMenu(resType);
    }
  };

  const handleAudienceFromDropDownMenu = (audience: any[]) => {
    if (onAudienceFromDropDownMenu) {
      onAudienceFromDropDownMenu(audience);
    }
  };

  return (
    <>
      <Box display="flex">
        <Grid
          w="100%"
          templateColumns="repeat(3, 1fr)"
          gap={4}
          flexWrap="nowrap"
        >
          <GridItem w="220px" h="10">
            <Text variant="text_field_label" my="6px">
              Domain
            </Text>
            <DropDownMenu
              optionsObj={domain}
              onData={handleDomainFromDropDownMenu}
            />
          </GridItem>
          <GridItem w="220px" h="10">
            <Text variant="text_field_label" my="6px">
              Type of resources
            </Text>
            <DropDownMenu
              optionsObj={resourceType}
              onData={handleResourceTypeFromDropDownMenu}
            />
          </GridItem>
          <GridItem w="220px" h="10">
            <Text variant="text_field_label" my="6px">
              Audience
            </Text>
            <DropDownMenu
              optionsObj={audience}
              onData={handleAudienceFromDropDownMenu}
            />
          </GridItem>
        </Grid>
      </Box>
    </>
  );
}
