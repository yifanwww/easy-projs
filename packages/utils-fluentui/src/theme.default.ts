// The default theme fluentui sets, DO NOT CHANGE IT.
// For more information:
// https://fluentuipr.z22.web.core.windows.net/heads/master/theming-designer/index.html

import { createTheme, IPalette, ISemanticColors } from '@fluentui/react';

export const palette: Partial<IPalette> = {
    // theme colors

    themeDarker: '#004578',
    themeDark: '#005a9e',
    themeDarkAlt: '#106ebe',
    themePrimary: '#0078d4',
    themeSecondary: '#2b88d8',
    themeTertiary: '#71afe5',
    themeLight: '#c7e0f4',
    themeLighter: '#deecf9',
    themeLighterAlt: '#eff6fc',

    // neutral colors

    neutralDark: '#201f1e',
    neutralPrimary: '#323130',
    neutralPrimaryAlt: '#3b3a39',
    neutralSecondary: '#605e5c',
    neutralSecondaryAlt: '#8a8886',
    neutralTertiary: '#a19f9d',
    neutralTertiaryAlt: '#c8c6c4',
    neutralQuaternary: '#d2d0ce',
    neutralQuaternaryAlt: '#e1dfdd',
    neutralLight: '#edebe9',
    neutralLighter: '#f3f2f1',
    neutralLighterAlt: '#faf9f8',
    black: '#000000',
    white: '#ffffff',

    // accent colors

    accent: '#3a96dd',
    yellowDark: '#d29200',
    yellow: '#ffb900',
    yellowLight: '#fff100',
    orange: '#d83b01',
    orangeLight: '#ea4300',
    orangeLighter: '#ff8c00',
    redDark: '#a4262c',
    red: '#d13438',
    magentaDark: '#5c005c',
    magenta: '#b4009e',
    magentaLight: '#e3008c',
    purpleDark: '#32145a',
    purple: '#5c2d91',
    purpleLight: '#b4a0ff',
    blueDark: '#002050',
    blueMid: '#00188f',
    blue: '#0078d4',
    blueLight: '#00bcf2',
    tealDark: '#004b50',
    teal: '#008272',
    tealLight: '#00B294',
    greenDark: '#004b1c',
    green: '#107c10',
    greenLight: '#bad80a',
};

export const semanticColors: Partial<ISemanticColors> = {
    // bodyBackground: '',
    // bodyBackgroundHovered: '',
    // bodyBackgroundChecked: '',
    // bodyStandoutBackground: '',
    // bodyFrameBackground: '',
    // bodyFrameDivider: '',
    // bodyDivider: '',
    // disabledBackground: '',
    // disabledBorder: '',
    // focusBorder: '',
    // cardStandoutBackground: '',
    // cardShadow: '',
    // cardShadowHovered: '',
    // variantBorder: '',
    // variantBorderHovered: '',
    // defaultStateBackground: '',
    // infoBackground: '',
    // errorBackground: '',
    // blockingBackground: '',
    // warningBackground: '',
    // severeWarningBackground: '',
    // successBackground: '',
    // infoIcon: '',
    // errorIcon: '',
    // blockingIcon: '',
    // warningIcon: '',
    // severeWarningIcon: '',
    // successIcon: '',
    // messageLink: '',
    // messageLinkHovered: '',
    // inputBorder: '',
    // smallInputBorder: '',
    // inputBorderHovered: '',
    // inputBackground: '',
    // inputBackgroundChecked: '',
    // inputBackgroundCheckedHovered: '',
    // inputPlaceholderBackgroundChecked: '',
    // inputForegroundChecked: '',
    // inputFocusBorderAlt: '',
    // inputIconDisabled: '',
    // inputIcon: '',
    // inputIconHovered: '',
    // buttonBackground: '',
    // buttonBackgroundChecked: '',
    // buttonBackgroundHovered: '',
    // buttonBackgroundCheckedHovered: '',
    // buttonBackgroundDisabled: '',
    // buttonBackgroundPressed: '',
    // buttonBorder: '',
    // buttonBorderDisabled: '',
    // primaryButtonBackground: '',
    // primaryButtonBackgroundHovered: '',
    // primaryButtonBackgroundPressed: '',
    // primaryButtonBackgroundDisabled: '',
    // primaryButtonBorder: '',
    // accentButtonBackground: '',
    // menuBackground: '',
    // menuDivider: '',
    // menuIcon: '',
    // menuHeader: '',
    // menuItemBackgroundHovered: '',
    // menuItemBackgroundPressed: '',
    // menuItemText: '',
    // menuItemTextHovered: '',
    // listBackground: '',
    // listText: '',
    // listItemBackgroundHovered: '',
    // listItemBackgroundChecked: '',
    // listItemBackgroundCheckedHovered: '',
    // listHeaderBackgroundHovered: '',
    // listHeaderBackgroundPressed: ''
};

export const defaultTheme = createTheme({ palette, semanticColors });
