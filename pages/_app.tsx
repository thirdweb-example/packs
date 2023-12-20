import type { AppProps } from "next/app";
import { ChainId, ThirdwebProvider } from "@thirdweb-dev/react";
import "../styles/globals.css";
import ThirdwebGuideFooter from "../components/ThirdwebGuideFooter";

// This is the chainId your dApp will work on.
const activeChainId = ChainId.Goerli;

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThirdwebProvider activeChain={activeChainId}>
      <Component {...pageProps} />
      <ThirdwebGuideFooter />
    </ThirdwebProvider>
  );
}

export default MyApp;
