"use client";
"use client";

import { SessionProvider } from "next-auth/react";
import { CacheProvider } from '@chakra-ui/next-js';
import { ChakraProvider } from '@chakra-ui/react';

type Props = {
  children?: React.ReactNode;
};

export const Providers = ({ children }: Props) => {
  return <SessionProvider>
    <CacheProvider><ChakraProvider>
      {children}
    </ChakraProvider></CacheProvider>
  </SessionProvider>;
};
