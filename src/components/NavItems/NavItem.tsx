/* NavItems for the SideBar */

import { Flex, FlexProps, Icon, Text } from '@chakra-ui/react';
import { useRouter } from 'next/router';

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
  const router = useRouter();

  const handleClick = () => {
    setIsSelected(!isSelected);
    if (link) {
      // Change page
      link !== router.pathname
        ? router.replace({
            pathname: link,
          })
        : // Reload actual page to re-rendering the page and re-fetch the query params
          router.reload();
    }
  };
  return (
    // <Link
    //   href={link}
    //   style={{ textDecoration: 'none' }}
    //   //_focus={{ boxShadow: 'none' }}
    // >
    <Flex onClick={handleClick} {...rest}>
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
    // </Link>
  );
};

export default NavItem;
