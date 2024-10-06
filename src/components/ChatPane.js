import { useContext, useRef, useState } from 'react';
import { Button, Flex, HStack, Input, Spinner, VStack } from "@chakra-ui/react";
import { LMServiceContext } from '../context/LMServiceContext';
import Message from "./Message";

function ChatPane() {
    const userInput = useRef(null);
    const [messageList, setMessageList] = useState([]);
    const lmApp = useContext(LMServiceContext);

    const getResponse = async () => {
        if (!userInput.current.value) {
          alert("You need to input some text!");
        }
        const userChat = userInput.current.value;
        userInput.current.value = "";
        setMessageList((prevList) => [...prevList, {agent: "user", text: userChat}]);
        const response = await lmApp.predict("/respond", [
            userChat,
            [], // undefined  in 'Chat with MiniCPM-V 2.0' Chatbot component		
            "Sampling", // string  in 'Decode Type' Radio component		
            3, // number (numeric value between 0 and 5) in 'Num Beams' Slider component		
            1.2, // number (numeric value between 0 and 3) in 'Repetition Penalty' Slider component		
            1.05, // number (numeric value between 0 and 3) in 'Repetition Penalty' Slider component		
            0.8, // number (numeric value between 0 and 1) in 'Top P' Slider component		
            100, // number (numeric value between 0 and 200) in 'Top K' Slider component		
            0.7, // number (numeric value between 0 and 2) in 'Temperature' Slider component
        ]);
        const botResponse = response.data[1][0][1];
        // const botResponse = "I am a chatbot.";
        setMessageList((prevList) => [...prevList, {agent: "bot", text: botResponse}]);
        console.log(messageList);
      }

    return (
        <Flex w="xl" m="auto" h="full" borderWidth="1px" roundedTop="lg">
            <VStack
             px={4}
             py={8}
             overflow="auto"
             flex={1}
             css={{
               '&::-webkit-scrollbar': {
                 width: '4px',
               },
               '&::-webkit-scrollbar-track': {
                 width: '6px',
               },
               '&::-webkit-scrollbar-thumb': {
                 background: '#d5e3f7',
                 borderRadius: '24px',
               },
             }}>
                <Message text="Upload an image to get started." actor="bot" />
                {messageList.length > 0 ? messageList.map((m) => <Message text={m.text} actor={m.agent}/>) : null}
                <HStack width="100%" p={4} bg="gray.100">
                    <Input bg="white" placeholder="Enter your text" ref={userInput} />
                    {console.log(messageList.slice(-1))}
                    {messageList.slice(-1).agent === "bot" ? <Spinner thickness='4px' speed='0.65s' emptyColor='gray.200' color='blue.500' size='xl'/> : <Button colorScheme="blue" onClick={getResponse}>Send</Button>}
                </HStack>
            </VStack>
        </Flex>
    )
}

export default ChatPane;