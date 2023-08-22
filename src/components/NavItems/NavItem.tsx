/* NavItems for the SideBar */

import { Flex, FlexProps, Icon, Link, Text } from '@chakra-ui/react';

import { ReactText } from 'react';
import { IconType } from 'react-icons';

interface NavItemProps extends FlexProps {
  icon?: IconType;
  children: ReactText | string;
  link?: string;
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
        onClick={() => {
          setIsSelected(!isSelected);
        }}
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
