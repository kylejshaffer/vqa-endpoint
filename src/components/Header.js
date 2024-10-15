import { Button, HStack, VStack } from "@chakra-ui/react";
import { Menu, MenuButton, MenuList, MenuItem } from "@chakra-ui/react";

function MenuBar() {
    return (
    <HStack>
    <Menu>
        <MenuButton as={Button}><h3>What Is This App?</h3></MenuButton>
        <MenuList>
            {/* MenuItems are not rendered unless Menu is open */}
            <MenuItem>
            This is a simple interface allowing you to ask an AI system questions<br/>
            about an image that you upload. You can use the left-hand pane to<br/>
            upload your image, and enter text in the right-hand pane to ask questions<br/>
            of the AI. Note: it may take a moment for the model to process your question,<br/>
            so you may need to be patient! For more details on the model being used,<br/>
            check out the Blip-VQA from Salesforce.
            </MenuItem>
        </MenuList>
     </Menu>

    <Menu>
        <MenuButton as={Button}><h3>What Is Visual QA?</h3></MenuButton>
        <MenuList>
            {/* MenuItems are not rendered unless Menu is open */}
            <MenuItem>
            Visual Question Answering (VQA) is a set of tasks in computer<br/>
            vision and natural language processing focusing on getting machine<br/>
            learning models (typically deep learning or Transformer-based) models<br/>
            to answer questions about images in natural language.
            </MenuItem>
        </MenuList>
    </Menu>

    <Menu>
        <MenuButton as={Button}><h3>Why Did You Build This?</h3></MenuButton>
        <MenuList>
            {/* MenuItems are not rendered unless Menu is open */}
            <MenuItem>
            Great question! There are definitely lots of chat interfaces popping up<br/>
            with all the excitement around generative AI. I normally work as a Machine<br/>
            Learning Scientist, but have wanted to brush up on my frontend skills.<br/>
            This project was a great way for me to learn more about frontend tech like<br/>
            React and Chakra UI while also utilizing my knowledge about machine learning<br/>
            and NLP.
            </MenuItem>
        </MenuList>
    </Menu>
    </HStack>
    )
}

function Header() {
    return (
        <VStack>
            <h1>Visual Question Answering App</h1>
            <MenuBar />
        </VStack>
    );
}

export default Header;