import { CloudUploadIcon } from 'lucide-react';
import { DropzoneState } from 'react-dropzone';

export default function ArchiveInput({ dropzone }: { dropzone: DropzoneState }) {
  const { getRootProps, getInputProps, isDragActive } = dropzone;

  return (
    <div { ...getRootProps() } className={ `m-auto w-full sm:w-1/2 h-60 rounded-lg border-dashed border-4 hover:border-gray-500 bg-gray-700 hover:bg-gray-500 transition-all ${isDragActive ? 'border-blue-500' : 'border-gray-600'} ` }>
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
      <input { ...getInputProps() } type="file" className="hidden" />
    </div>
  );
}
