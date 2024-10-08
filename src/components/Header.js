import { Box, Heading, HStack, Text, VStack } from "@chakra-ui/react";

function Navbar() {
    return (
        <HStack>
            <p>What Is This?</p>
            <p>What is Visual QA?</p>
        </HStack>
    )
}

function Header() {
    return (
        <VStack>
            <h1>Visual Question Answering App</h1>
            <Navbar />
        </VStack>
    );
}

export default Header;