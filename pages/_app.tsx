import { AppProps } from 'next/app'
import { ChakraProvider } from '@chakra-ui/react'
import { extendTheme } from '@chakra-ui/react'

const theme = extendTheme({
  colors: {
    externalLink: '#3182CE',
    lightText: '#666',
  },
  styles: {
    global: {
      a: {
        _hover: {
          textDecoration: 'none',
        },
      },
    },
  },
  components: {
    Text: {
      baseStyle: {
        color: 'gray.800',
      },
    },
  },
})

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <Component {...pageProps} />
    </ChakraProvider>
  )
}
