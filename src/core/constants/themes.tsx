import { Theme } from '@react-navigation/native';
import  {colors} from './colors';

export const LightTheme: Theme = {
    dark: false,
    colors: {
        primary: colors.primary500,
        background: colors.surfaceLight,
        card: colors.surfaceLight,
        text: colors.text800,
        border: 'transparent',
        notification: 'rgb(255, 59, 48)', // TODO define notification badges styling
    },
    fonts: {
        regular: {
            fontFamily: '',
            fontWeight: 'normal'
        },
        medium: {
            fontFamily: '',
            fontWeight: 'normal'
        },
        bold: {
            fontFamily: '',
            fontWeight: 'normal'
        },
        heavy: {
            fontFamily: '',
            fontWeight: 'normal'
        }
    }
};

export const DarkTheme: Theme = {
    dark: true,
    colors: {
        primary: colors.primary400,
        background: colors.surfaceDark,
        card: colors.surfaceDark,
        text: colors.white,
        border: 'transparent',
        notification: 'rgb(255, 59, 48)',
    },
    fonts: {
        regular: {
            fontFamily: '',
            fontWeight: 'normal'
        },
        medium: {
            fontFamily: '',
            fontWeight: 'normal'
        },
        bold: {
            fontFamily: '',
            fontWeight: 'normal'
        },
        heavy: {
            fontFamily: '',
            fontWeight: 'normal'
        }
    }
};