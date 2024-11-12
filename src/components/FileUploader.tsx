import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import FileContent from './FileContent';
import ArchiveInput from './ArchiveInput';

export default function FileUploader(
  { file, setFile, fileContent, setFileContent }: any,
) {
  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      const selectedFile = acceptedFiles[0];
      setFile(selectedFile);

      const reader = new FileReader();
      reader.onload = (event) => {
        const text = event.target?.result as string;
        try {
          const json = JSON.parse(text)
            .map((item: any) => item.string_list_data[0]);
          console.log(json, 'json');
          setFileContent(json);
        } catch (error) {
          setFileContent('Erro ao ler o arquivo JSON.');
        }
      };
      reader.readAsText(selectedFile);
    }
  }, [setFile, setFileContent]);

  const removeFile = useCallback(() => {
    setFile(null);
    setFileContent(null);
  }, [setFile, setFileContent]);

  const dropzone = useDropzone({
    onDrop,
    accept: {
      'application/json': ['.json'],
    },
  });

  return file
    ? <FileContent
        file={ file }
        removeFile={ removeFile }
        fileContent={ fileContent }
    />
    : <ArchiveInput dropzone={ dropzone } />;
}
