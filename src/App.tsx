/* eslint-disable react/jsx-one-expression-per-line */
import { CloudUploadIcon, FileJsonIcon, XIcon } from 'lucide-react';
import { useCallback, useState } from 'react';
import { DropzoneState, useDropzone } from 'react-dropzone';

function Input({ dropzone }: { dropzone: DropzoneState }) {
  const { getRootProps, getInputProps, isDragActive } = dropzone;

  return (
    <div { ...getRootProps() } className={ `m-auto w-1/2 h-60 rounded-lg border-dashed border-4 hover:border-gray-500 bg-gray-700 hover:bg-gray-500 transition-all ${isDragActive ? 'border-blue-500' : 'border-gray-600'} ` }>
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
: { file: File | null, removeFile: () => void, fileContent: any | null }) {
  return (
    <div className="m-auto w-[460px] h-full rounded-lg bg-gray-700 hover:bg-gray-500 transition-all">
      <div className="bg-white rounded-md shadow-md flex gap-3 items-center justify-center text-black flex-col p-4 relative">
        <p>File Name: {file?.name}</p>
        <p>File Type: {file?.type} <FileJsonIcon /></p>
        <button type="button" onClick={ removeFile } className="absolute top-2 right-4"><XIcon /></button>

        {fileContent && (
          <div className="text-left text-sm mt-4 flex flex-col gap-6">
            {fileContent?.map((item: any, index: number) => {
              const { value, href, timestamp } = item.string_list_data[0];
              return (
                <div key={ value + index } className="flex flex-col gap-2 bg-gray-100 p-4 rounded-md shadow-sm">
                  <p><span className="font-bold">Username:</span> {value}</p>
                  <p>
                    <span className="font-bold">Link account:</span>
                    <a className="underline text-blue-900 visited:text-purple-900" href={ href }> {href.split('www.')[1]}</a>
                  </p>
                  <p>
                    <span className="font-bold">Date:</span> {new Date(timestamp * 1000).toLocaleString().split(',').reverse()
                      .join(' - ')}
                  </p>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

function FileUploader({ file, setFile, fileContent, setFileContent }: any) {
  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      const selectedFile = acceptedFiles[0];
      setFile(selectedFile);

      const reader = new FileReader();
      reader.onload = (event) => {
        const text = event.target?.result as string;
        try {
          const json = JSON.parse(text);
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
    ? <HasFile file={ file } removeFile={ removeFile } fileContent={ fileContent } />
    : <Input dropzone={ dropzone } />;
}

function App() {
  const [file1, setFile1] = useState<File | null>(null);
  const [fileContent1, setFileContent1] = useState<any | null>(null);

  const [file2, setFile2] = useState<File | null>(null);
  const [fileContent2, setFileContent2] = useState<any | null>(null);

  return (
    <div className="mt-14 flex justify-start items-center">
      <div className="w-[500px] self-start">
        <h2 className="text-center text-white mb-4">Upload File 1</h2>
        <FileUploader
          file={ file1 }
          setFile={ setFile1 }
          fileContent={ fileContent1 }
          setFileContent={ setFileContent1 }
        />
      </div>
      <div className="w-[500px] self-start">
        <h2 className="text-center text-white mb-4">Upload File 2</h2>
        <FileUploader
          file={ file2 }
          setFile={ setFile2 }
          fileContent={ fileContent2 }
          setFileContent={ setFileContent2 }
        />
      </div>
    </div>
  );
}

export default App;
