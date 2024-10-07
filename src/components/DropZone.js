import React, { useCallback, useContext, useState } from 'react';
import { BsCloudUpload } from "react-icons/bs";
import { useDropzone } from 'react-dropzone';
import { Button, Image, Input, Spinner, Text, VStack } from '@chakra-ui/react';
import { LMServiceContext } from '../context/LMServiceContext';

function FileDropzone() {
  const [files, setFiles] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const lmApp = useContext(LMServiceContext);

  const setupImage = async () => {
    if (files) {
        console.log("Got the image");
        console.log(files[0]);
        const result = await lmApp.predict("/upload_img", [
          files[0], 	// blob in 'Upload an image to start' Image component		
          [], // undefined  in 'Chat with MiniCPM-V 2.0' Chatbot component
        ]).then(setIsLoaded(true));
        console.log(result);
        console.log("Image uploaded...");
    }
  };

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

  let innerComp;
  if (isLoaded) {
    innerComp = (
        <>
        <Image src={files[0].preview} width="65%" alt="uploaded-image"/>
        <Button onClick={setupImage}>Upload Image</Button>
        </>
    )
  } else if (files.length === 0) {
    innerComp = (
        <>
        <Input {...getInputProps()}/>
        <Text>Drag or Click Here to Upload Image</Text>
        <BsCloudUpload size='100px' />
        </>
    )
  }

  return (
    <VStack w="xl" m="auto" h="75vh" borderWidth="1px" roundedTop="lg">
        <VStack {...getRootProps()} padding="10%" marginTop="5%">
            {innerComp}
        </VStack>
    </VStack>
  );
}

export default FileDropzone;