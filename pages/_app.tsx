import type { AppProps } from 'next/app';

import { trpc } from '../utils/trpc';
import '../styles/globals.css'

function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}

export default trpc.withTRPC(App);