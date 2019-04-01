import React from 'react';
import { ThemeProvider } from 'styled-components';

import 'typeface-montserrat';
import 'typeface-merriweather';
import 'antd/dist/antd.css';

import { theme } from './src/styles/theme';
import { provideContext } from './src/components/Blog/hooks/blogProvider';

const RootComponent = provideContext(({ element }) => (
  <ThemeProvider theme={theme}>
    {element}
  </ThemeProvider>
));

export const wrapRootElement = props => <RootComponent {...props} />;
