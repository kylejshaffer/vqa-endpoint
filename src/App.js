import { useCallback, useRef, useState } from "react";
import { useDropzone } from 'react-dropzone';
import { Client } from "@gradio/client";
import { ChakraProvider, Button, HStack, Input, VStack } from '@chakra-ui/react'
import ChatPane from "./components/ChatPane";
import Dropzone from "./components/DropZone";
import Header from "./components/Header";

const appName = "sitammeur/PicQ";
const lmApp = await Client.connect(appName);

function App() {
  const userInput = useRef(null);
  const [files, setFiles] = useState([]);
  const [messageList, setMessageList] = useState([]);

  
  const onDrop = useCallback((acceptedFiles) => {
    setFiles(
      acceptedFiles.map((file) =>
        Object.assign(file, {
          preview: URL.createObjectURL(file),
        })
      )
    );
  }, []);

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  const getResponse = async () => {
    if (!userInput.current.value) {
      alert("You need to input some text!");
      return;
    } else if (files.length === 0) {
      alert("You need to upload an image first!");
      return;
    }

    const userChat = userInput.current.value;
    userInput.current.value = "";
    setMessageList((prevList) => [...prevList, {agent: "user", text: "👤  " + userChat}]);

    const response = await lmApp.predict("/predict", {
      image: files[0],
		  question: userChat,
    })
    const botResponse = response.data[0];
    console.log(botResponse);
    setMessageList((prevList) =>  [...prevList, {agent: "bot", text: "🤖  " + botResponse}]);
    return messageList;
  }

  return (
    <ChakraProvider>
        <VStack h="100vh" py={12} justify="center" bg="aliceblue" align="center">
          <Header />
          <HStack spacing={8}>
            <Dropzone files={files} getInputProps={getInputProps} getRootProps={getRootProps} />
            <VStack>
              <ChatPane messageList={messageList} />
              <HStack width="100%" p={4} bg="gray.100" position="absoute">
                <Input bg="white" placeholder="Enter your text"  ref={userInput} />
                <Button colorScheme="blue" onClick={getResponse}>Send</Button>
              </HStack>
            </VStack>
          </HStack>
        </VStack>
    </ChakraProvider>
  );
}

export default App;
