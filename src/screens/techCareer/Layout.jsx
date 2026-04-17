import { createTheme, MantineProvider } from '@mantine/core';
import { Outlet } from 'react-router-dom';


const theme = createTheme({
          fontFamily: 'Regular',
          colors: {
            'blue': ['#fef2f2', '#fee2e2', '#fecaca', '#fca5a5', '#f87171', '#ef4444', '#dc2626', '#b91c1c', '#991b1b', '#7f1d1d'],
          },
          primaryColor:'blue'
});
const TexhCarrerLayout = () => {
  return (
   <MantineProvider theme={theme} withGlobalStyles withNormalizeCSS>
             <Outlet/>
   </MantineProvider>
  )
}

export default TexhCarrerLayout
