/* NavItems for the SideBar */

import { Flex, FlexProps, Icon, Link, Text } from '@chakra-ui/react';

import { ReactText } from 'react';
import { IconType } from 'react-icons';

interface NavItemProps extends FlexProps {
  icon: IconType;
  children: ReactText | string;
  link: string;
  isSelected: boolean;
  setIsSelected: (value: boolean) => void;
}

const NavItem = ({
  link,
  icon,
  children,
  isSelected,
  setIsSelected,
  ...rest
}: NavItemProps) => {
  return (
    <Link
      href={link}
      style={{ textDecoration: 'none' }}
      //_focus={{ boxShadow: 'none' }}
    >
      <Flex
        gap={3}
        height="45px"
        width="196px"
        ml="1px"
        pl="20px"
        my="15px"
        align="center"
        //p="4"
        role="group"
        cursor="pointer"
        onClick={() => {
          setIsSelected(!isSelected);
        }}
        borderLeft="5px"
        borderLeftColor={isSelected ? 'accent.900' : 'white'}
        borderLeftStyle={'solid'}
        _hover={{
          bg: 'white',
          color: 'accent.900',
        }}
        bg={isSelected ? 'accent.200' : ''}
        color={'primary'}
        {...rest}
      >
        {icon && (
          <Icon
            // ALL THIS PARAMETERS ARE USELESS FOR SVG ICON IMPORTED MANUALLY
            //width="20px"
            //height="20px"
            //mr="3"
            //fontSize="16"
            /*_hover={{
              color: 'accent.900',
            }}*/
            as={icon}
          />
        )}
        <Text variant="navItem_sidebar_label">{children}</Text>
      </Flex>
    </Link>
  );
};

export default NavItem;
