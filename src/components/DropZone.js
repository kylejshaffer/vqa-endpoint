import React, { useCallback, useContext, useState } from 'react';
import { BsCloudUpload } from "react-icons/bs";
import { useDropzone } from 'react-dropzone';
import { Image, Input, Spinner, Text, VStack } from '@chakra-ui/react';
import { LMServiceContext } from '../context/LMServiceContext';

function FileDropzone() {
  const [files, setFiles] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const lmApp = useContext(LMServiceContext);

  const setupImage = async () => {
    if (files) {
        console.log("Got the image");
        console.log(files[0]);
        
        /* const result = await lmApp.predict("/upload_img", [
          files[0], 	// blob in 'Upload an image to start' Image component		
          [], // undefined  in 'Chat with MiniCPM-V 2.0' Chatbot component
        ]);
        setIsLoaded(true); */
        setTimeout(() => {
            setIsLoaded(true);
        }, 1000);
        const result = "IMG";
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
    console.log("image is loaded - should be rendering image and upload button...")
    innerComp = (
        <>
        <Image src={files[0].preview} width="80%" alt="uploaded-image"/>
        </>
    )
  } else if (files.length === 0) {
    console.log("No files loaded - should be rendering upload stack...")
    innerComp = (
        <>
        <Input {...getInputProps()}/>
        <Text>Drag or Click Here to Upload Image</Text>
        <BsCloudUpload className="upload-icon" />
        </>
    )
  } else if (!isLoaded && files.length > 0) {
    console.log("File not yet loaded to API, but pushed to files - should be spinning...")
    innerComp = <Spinner size="xl" />
    setupImage();
  }

  return (
    <VStack w="xl" m="auto" h="75vh" borderWidth="1px" roundedTop="lg" backgroundColor='white'>
        <VStack {...getRootProps()} padding="10%" marginTop="5%">
            {innerComp}
        </VStack>
    </VStack>
  );
}

export default FileDropzone;