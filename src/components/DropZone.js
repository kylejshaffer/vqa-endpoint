import React from 'react';
import { BsCloudUpload } from "react-icons/bs";
import { Image, Input, Text, VStack } from '@chakra-ui/react';

function FileDropzone({ files, getInputProps, getRootProps }) {
  let innerComp;
  if (files.length > 0) {
    console.log("image is loaded - should be rendering image and upload button...")
    innerComp = (
        <>
        <Image src={files[0].preview} width="80%" alt="uploaded-image"/>
        </>
    )
  } else {
    console.log("No files loaded - should be rendering upload stack...")
    innerComp = (
        <>
        <Input {...getInputProps()}/>
        <Text>Drag or Click Here to Upload Image</Text>
        <BsCloudUpload className="upload-icon" />
        </>
    )
  }

  return (
    <VStack w="xl" m="auto" h="75vh" borderWidth="1px" roundedTop="lg" backgroundColor='white'>
        <VStack {...getRootProps()} padding="10%">
            {innerComp}
        </VStack>
    </VStack>
  );
}

export default FileDropzone;