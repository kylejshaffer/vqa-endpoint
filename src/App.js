import { Client } from "@gradio/client";
import { ChakraProvider, Flex, HStack, VStack } from '@chakra-ui/react'
import ChatPane from "./components/ChatPane";
import Dropzone from "./components/DropZone";
import Header from "./components/Header";
import { LMServiceContext } from "./context/LMServiceContext";

const lmApp = await Client.connect("openbmb/MiniCPM-V-2");

function App() {
  return (
    <ChakraProvider>
      <LMServiceContext.Provider value={ lmApp }>
        <VStack h="100vh" py={12} justify="center" align="center">
          <Header />
          <HStack spacing={8}>
            <Dropzone />
            <ChatPane />
          </HStack>
        </VStack>
      </LMServiceContext.Provider>
    </ChakraProvider>
  );
}

export default App;
