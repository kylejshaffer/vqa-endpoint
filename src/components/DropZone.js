import React, { useCallback, useContext, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Button, Image } from '@chakra-ui/react';
import { LMServiceContext } from '../context/LMServiceContext';

function FileDropzone() {
  const [files, setFiles] = useState([]);
  const lmApp = useContext(LMServiceContext);

  const setupImage = async () => {
    if (files) {
        console.log("Got the image");
        console.log(files[0]);
        const result = await lmApp.predict("/upload_img", [
          files[0], 	// blob in 'Upload an image to start' Image component		
          [], // undefined  in 'Chat with MiniCPM-V 2.0' Chatbot component
        ])
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

  return (
    <section>
      <div {...getRootProps()}>
        <input {...getInputProps()}/>
        {files.length === 0 ? <p>Drag Files Here</p> : null}
      </div>
        {files.length > 0 ? <Button onClick={setupImage}>Upload Image</Button> : null}
        {files.length > 0 ? <Image src={files[0].preview} width="60%" alt="input-image"/> : undefined}
    </section>
  );
}

export default FileDropzone;