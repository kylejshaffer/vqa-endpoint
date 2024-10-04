import { Client } from "@gradio/client";
import { useRef, useState } from 'react';
import { Button, ChakraProvider, Flex, HStack, Input, VStack } from '@chakra-ui/react'
import Dropzone from "./components/DropZone";
import { LMServiceContext } from "./context/LMServiceContext";
import Message from "./components/Message";
import './App.css';

const lmApp = await Client.connect("openbmb/MiniCPM-V-2");

function App() {
  // const [result, setResult] = useState(null);
  const userInput = useRef(null);

  const getResponse = async () => {
    if (!userInput.current.value) {
      alert("You need to input some text!");
    }
    const response = await lmApp.predict("/respond", [
        // "What object is in the input image?", // string  in 'Input text' Textbox component		
        userInput.current.value,
        [], // undefined  in 'Chat with MiniCPM-V 2.0' Chatbot component		
        "Sampling", // string  in 'Decode Type' Radio component		
        3, // number (numeric value between 0 and 5) in 'Num Beams' Slider component		
        1.2, // number (numeric value between 0 and 3) in 'Repetition Penalty' Slider component		
        1.05, // number (numeric value between 0 and 3) in 'Repetition Penalty' Slider component		
        0.8, // number (numeric value between 0 and 1) in 'Top P' Slider component		
        100, // number (numeric value between 0 and 200) in 'Top K' Slider component		
        0.7, // number (numeric value between 0 and 2) in 'Temperature' Slider component
    ]);
    console.log(response.data[1][0][1]);
  }

  return (
    <ChakraProvider>
      <LMServiceContext.Provider value={ lmApp }>
      <Flex h="100vh" py={12}>
        <HStack>
          <VStack w="2xl" m="auto" h="full" borderWidth="1px" roundedTop="lg">
            <Dropzone />
          </VStack>
          <VStack w="2xl" m="auto" h="full" borderWidth="1px" roundedTop="lg">
            <Message text="Hi" actor="user" />
            <Message text="How may I help you?" actor="bot" />
            <Message text="Hi" actor="user" />
            <Message text="How may I help you?" actor="bot" />
            <Message text="Hi" actor="user" />
            <Message text="How may I help you?" actor="bot" />
            <HStack width="100%" p={4} bg="gray.100">
              <Input bg="white" placeholder="Enter your text" ref={userInput} />
              <Button colorScheme="blue" onClick={getResponse}>Send</Button>
            </HStack>
          </VStack>
        </HStack>
      </Flex>
      </LMServiceContext.Provider>
    </ChakraProvider>
  );
}

export default App;
