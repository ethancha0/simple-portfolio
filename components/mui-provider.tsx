'use client';

import { ThemeProvider, createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'dark',
  },
  typography: {
    fontFamily: '"Times New Roman", Times, serif',
  },
  components: {
    MuiTypography: {
      styleOverrides: {
        root: {
          fontFamily: '"Times New Roman", Times, serif',
          '&[href]:hover': {
            color: '#4ade80',
          },
        },
      },
    },
    MuiLink: {
      defaultProps: {
        color: 'inherit',
        underline: 'none',
      },
      styleOverrides: {
        root: {
          '&:hover': {
            color: '#4ade80',
          },
        },
      },
    },
  },
});

export default function MuiProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
}
