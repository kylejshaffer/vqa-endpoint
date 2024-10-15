import { useEffect, useState } from "react";
import { Text } from "@chakra-ui/react";

let timer;

function TextGenerate({ inputText }) {
    const [text, setText] = useState("");

    const handleGenerate = () => {
        let i = -1;
        timer = setInterval(() => {
            i++;
            setText(inputText.slice(0, i));
            if (i === inputText.length -1) {
                clearInterval(timer);
            }
        }, 20);
    }
    return (
        <Text>{text}</Text>
    )
}

export default TextGenerate;