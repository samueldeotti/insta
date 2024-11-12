import { XIcon } from 'lucide-react';
import UserCard from './UserCard';

export default function FileContent({ file, removeFile, fileContent }
: { file: File | null, removeFile: () => void, fileContent: any | null }) {
  return (
    <div className="m-auto w-full sm:w-[460px] rounded-lg bg-gray-700 hover:bg-gray-500 transition-all">
      <div className="bg-white rounded-md shadow-md flex gap-3 items-center justify-center text-black flex-col p-4 relative">
        <div className="text-center w-80 ">
          <p className="font-bold mb-1">File Name:</p>
          <p className="text-ellipsis overflow-hidden whitespace-nowrap">{file?.name}</p>
        </div>
        <div className="text-center ">
          <p className="font-bold mb-1">File Type:</p>
          <p>{file?.type}</p>
        </div>
        <button type="button" onClick={ removeFile } className="absolute top-2 right-4"><XIcon /></button>

        {fileContent && (
          <div className="text-sm mt-4 flex flex-col gap-6 h-96 overflow-auto pr-2">
            {fileContent?.map((item: any, index: number) => (
              <UserCard
                key={ item.value + index }
                { ...item }
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
