import { useEffect, useRef } from 'react';
import { Box, VStack } from "@chakra-ui/react";
import Message from "./Message";

function ChatPane({ messageList }) {
    const AlwaysScrollToBottom = () => {
        const elementRef = useRef();
        useEffect(() => elementRef.current.scrollIntoView());
        return <div ref={elementRef} />;
      };

    return (
        <Box>
            <VStack
                px={4}
                py={8}
                overflow="auto"
                flex={1}
                h="66vh"
                w="xl"
                borderWidth="1px"
                roundedTop="lg"
                backgroundColor='white'
            >
                <Message text="Upload an image to get started." actor="bot" />
                {messageList.length > 0 ? messageList.map((m) => <Message text={m.text} actor={m.agent}/>) : null}
                <AlwaysScrollToBottom />
            </VStack>
        </Box>
    )
}

export default ChatPane;