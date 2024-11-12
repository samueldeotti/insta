import React from 'react';

export default function UserCardContainer({ children }: { children: React.ReactNode }) {
  return (
    <div className="m-auto w-full sm:w-[460px] h-full rounded-lg bg-gray-700 hover:bg-gray-500 transition-all">
      <div className="bg-white rounded-md shadow-md flex items-center justify-center text-black flex-col relative">
        <div className="text-center text-sm p-4 flex items-center flex-col gap-6 w-full">
          {children}
        </div>
      </div>
    </div>
  );
}
