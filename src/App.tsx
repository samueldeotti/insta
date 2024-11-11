/* eslint-disable react/jsx-one-expression-per-line */
import { CloudUploadIcon, FileJsonIcon, XIcon } from 'lucide-react';
import { useCallback, useState } from 'react';
import { DropzoneState, useDropzone } from 'react-dropzone';

function Input({ dropzone }: { dropzone: DropzoneState }) {
  const { getRootProps, getInputProps, isDragActive } = dropzone;

  return (
    <div { ...getRootProps() } className={ `m-auto w-1/2 h-full rounded-lg border-dashed border-4 hover:border-gray-500 bg-gray-700 hover:bg-gray-500 transition-all ${isDragActive ? 'border-blue-500' : 'border-gray-600'}` }>
      <label htmlFor="dropzone-file" className="cursor-pointer w-full h-full">
        <div className="flex flex-col items-center justify-center p-5 h-full gap-4">
          {isDragActive ? <p className="font-bold text-lg text-blue-500">Solte para adicionar</p>
            : (
              <>
                <CloudUploadIcon size="64" />
                <p className="text-lg text-gray-400">
                  <span className="font-bold">Click to upload </span>
                  or drag here
                </p>
                <p className="text-gray-400 text-sm">JSON</p>
              </>
            )}
        </div>
      </label>
      <input { ...getInputProps() } type="text" className="hidden" />
    </div>
  );
}

function HasFile({ file, removeFile, fileContent }
: { file: File | null, removeFile: () => void, fileContent: string | null }) {
  console.log(JSON.parse(fileContent as string));

  // const date = new Date(JSON.parse(fileContent as string).relationships_permanent_follow_requests[0].string_list_data[0].timestamp * 1000);
  // console.log(date.toUTCString());

  return (
    <div className="m-auto w-1/2 h-full rounded-lg bg-gray-700 hover:bg-gray-500 transition-all">
      <div className="bg-white rounded-md shadow-md flex gap-3 items-center justify-center text-black flex-col p-4 relative">

        <p>File Name: {file?.name}</p>
        <p>File Type: {file?.type} <FileJsonIcon /></p>
        <button type="button" onClick={ removeFile } className="absolute top-2 right-4"><XIcon /></button>
        {fileContent && (
          <div className="text-left mt-4 text-sm bg-gray-100 p-4 rounded-md">
            {JSON.parse(fileContent).string_list_data.map((item: any, index: number) => (
              <div key={ item + index } className="flex flex-col gap-2">
                <p>
                  <span className="font-bold">Username:</span> {item.value}
                </p>
                <p>
                  <span className="font-bold">Link account:</span> <a className="underline text-blue-900 visited:text-purple-900" href={ item.href }>{item.href.split('www.')[1]}</a>
                </p>
                <p>
                  <span className="font-bold">Date:</span> {new Date(item.timestamp * 1000).toLocaleString()}
                </p>
              </div>

            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function App() {
  const [file, setFile] = useState<File | null>(null);
  const [fileContent, setFileContent] = useState<string | null>(null);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      const selectedFile = acceptedFiles[0];
      setFile(selectedFile);

      const reader = new FileReader();
      reader.onload = (event) => {
        const text = event.target?.result as string;
        try {
          const json = JSON.parse(text);
          setFileContent(JSON.stringify(json, null, 2));
        } catch (error) {
          setFileContent('Erro ao ler o arquivo JSON.');
        }
      };
      reader.readAsText(selectedFile);
    }
  }, []);

  const removeFile = useCallback(() => {
    setFile(null);
    setFileContent(null);
  }, []);

  const dropzone = useDropzone({
    onDrop,
    accept: {
      'application/json': ['.json'],
    },
  });

  return file
    ? <HasFile file={ file } removeFile={ removeFile } fileContent={ fileContent } />
    : <Input dropzone={ dropzone } />;
}

export default App;
