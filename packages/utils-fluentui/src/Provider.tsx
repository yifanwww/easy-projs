import { makeStyles, ThemeProvider } from '@fluentui/react';

import { defaultTheme } from './theme.default';

const useStyles = makeStyles({
    fluentuiThemeProvider: {
        display: 'grid',
        overflow: 'hidden',
        userSelect: 'none',
    },
});

export const FluentuiProvider: React.FC = (props) => {
    const classes = useStyles();

    return (
        <ThemeProvider className={classes.fluentuiThemeProvider} theme={defaultTheme}>
            {props.children}
        </ThemeProvider>
    );
};
