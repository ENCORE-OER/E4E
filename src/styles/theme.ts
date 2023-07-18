import { extendTheme } from '@chakra-ui/react';
//import '@fontsource/nunito';
import { transparentize } from 'polished'; // used to shade the color

// import fonts
import '@fontsource/exo';
import '@fontsource/nunito';

const config = {
  colors: {
    primary: '#000028',
    accent: {
      200: transparentize(0.8, '#FFCC49'),
      900: '#FFCC49',
    },
    secondary: '#CED4DA',
    background: '#F8F9FA',
    grey: '#8F959E',
    dark_grey: '#495057',
    green_light: {
      200: transparentize(0.8, '#BADC58'),
      900: '#BADC58',
    },
    green_dark: '#49B61A',
    digital_light: {
      200: transparentize(0.8, '#7ED6DF'),
      900: '#7ED6DF',
    },
    digital_dark: '#03A8B9',
    entrepreneurial_light: {
      200: transparentize(0.8, '#F6EC8D'),
      900: '#F6EC8D',
    },
    entrepreneurial_dark: '#FFCF24',
  },
  fonts: {
    heading: 'Exo, sans-serif',
    title: 'Exo, sans-serif',
    body: 'Nunito, sans-serif',
  },

  components: {
    Button: {
      variants: {
        primary: {
          bg: 'primary',
          color: 'white',
          borderRadius: '10px',
          py: '10px', // padding y
          px: '30px', // padding x
          gap: '10px',
        },
        secondary: {
          bg: 'secondary',
          color: 'primary',
          borderRadius: '10px',
          py: '10px', // padding y
          px: '30px', // padding x
          gap: '10px',
        },
        third: {
          bg: 'white',
          color: 'primary',
          borderRadius: '10px',
          py: '10px', // padding y
          px: '30px', // padding x
          gap: '10px',
        },
        link: {
          bg: 'transparent',
          color: 'grey',
          borderRadius: '0px',
          borderBottom: '1px',
          borderBottomColor: 'grey',
          letterSpacing: '1px',
        },
        dropdown: {
          cornerRadius: '10px',
          fillColor: 'white',
          borderColor: 'grey',
          borderWidth: '0.5px',
        },
        learningPathDesign: {
          bg: 'grey',
          color: 'white',
          borderRadius: '10px',
          py: '10px', // padding y
          px: '30px', // padding x
          gap: '10px',
        },
        concept: {
          borderRadius: '200px',
          border: '2px',
          borderColor: 'secondary',
          borderStyle: 'solid',
          py: '20px', // padding y
          px: '15px', // padding x
          letterSpacing: '1px',
        },
      },
    },
    Text: {
      variants: {
        label: {
          fontSize: '12px',
          fontWeight: '600',
          lineHeight: '16px',
          letterSpacing: '0em',
          textAlign: 'left',
          color: 'grey',
        },
        navbar_label: {
          fontSize: '14px',
          fontWeight: '300',
          lineHeight: '19px',
          letterSpacing: '0em',
          textAlign: 'left',
          color: 'grey',
        },
        text_before_venn: {
          fontFamily: 'Nunito',
          fontSize: '20px',
          color: 'grey',
          fontWeight: '600',
          lineHeight: '16px',
          letterSpacing: '0em',
          textAlign: 'left',
        },
        text_searchFor: {
          fontFamily: 'Nunito',
          fontSize: '20px',
          color: 'primary',
          fontWeight: '600',
          lineHeight: '16px',
          letterSpacing: '0em',
          textAlign: 'left',
          gap: '10px',
          marginRight: '20px',
        },
        text_searchFor_secondary: {
          fontFamily: 'Nunito',
          fontSize: '16px',
          color: 'primary',
          fontWeight: '600',
          lineHeight: '16px',
          letterSpacing: '0em',
          textAlign: 'right',
          marginRight: '20px',
          marginLeft: '5px',
        },
        text_field_label: {
          fontSize: '12px',
          fontWeight: '600',
          lineHeight: '16px',
          letterSpacing: '0em',
          textAlign: 'left',
          color: 'grey',
        },
        navItem_sidebar_label: {
          fontSize: '18px',
          fontWeight: '500',
          lineHeight: '25px',
          letterSpacing: '0em',
          textAlign: 'left',
          //color: 'primary',
        },
        label_drawer: {
          fontWeight: 'thin',
          color: 'grey',
          fontSize: 'sm',
        },
        title_card: {
          fontSize: '18px',
          fontWeight: '700',
          lineHeight: '25px',
          letterSpacing: '0em',
          textAlign: 'left',
          color: 'primary',
        },
        author_card: {
          fontSize: '14px',
          fontWeight: '600',
          lineHeight: '19px',
          letterSpacing: '0em',
          textAlign: 'left',
          color: 'grey',
        },
        description_card: {
          fontSize: '16px',
          fontWeight: '300',
          lineHeight: '22px',
          letterSpacing: '0em',
          textAlign: 'left',
          color: 'primary',
        },
        label_tag_digital: {
          fontSize: '14px',
          fontWeight: '600',
          lineHeight: '19px',
          textAlign: 'center',
          color: 'digital_dark',
        },
        label_tag_green: {
          fontSize: '14px',
          fontWeight: '600',
          lineHeight: '19px',
          textAlign: 'center',
          color: 'green_dark',
        },
        label_tag_entrepreneurial: {
          fontSize: '14px',
          fontWeight: '600',
          lineHeight: '19px',
          textAlign: 'center',
          color: 'entrepreneurial_dark',
        },
        label_tag_resType: {
          fontSize: '14px',
          fontWeight: '400',
          lineHeight: '19px',
          letterSpacing: '0.30000001192092896px',
          textAlign: 'center',
          color: 'primary',
        },
        label_dinamic_data_card: {
          fontSize: '14px',
          fontWeight: '400',
          lineHeight: '19px',
          letterSpacing: '0em',
          textAlign: 'left',
          color: 'primary',
        },
        label_checkbox: {
          whiteSpace: 'nowrap',
        },
      },
    },
    Icon: {
      icon_sidebar: {
        w: '20px',
        h: '20px',
        color: 'primary',
      },
      icon_dinamic_data_card: {
        w: '12px',
        h: '12px',
        color: 'grey',
      },
    },
  },
};

const theme = extendTheme(config);

export default theme;
