import { Client } from "@gradio/client";
import { ChakraProvider, Flex, HStack } from '@chakra-ui/react'
import ChatPane from "./components/ChatPane";
import Dropzone from "./components/DropZone";
import { LMServiceContext } from "./context/LMServiceContext";
import './App.css';

const lmApp = await Client.connect("openbmb/MiniCPM-V-2");

function App() {
  return (
    <ChakraProvider>
      <LMServiceContext.Provider value={ lmApp }>
        <Flex h="100vh" py={12} alignItems="auto">
          <HStack>
            <Dropzone />
            <ChatPane />
          </HStack>
        </Flex>
      </LMServiceContext.Provider>
    </ChakraProvider>
  );
}

export default App;
