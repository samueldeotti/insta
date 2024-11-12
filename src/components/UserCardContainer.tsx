import React from 'react';

export default function UserCardContainer({ children }: { children: React.ReactNode }) {
  return (
    <div className="m-auto w-[460px] h-full rounded-lg bg-gray-700 hover:bg-gray-500 transition-all">
      <div className="bg-white rounded-md shadow-md flex gap-3 items-center justify-center text-black flex-col p-4 relative">
        <div className="text-center text-sm mt-4 flex flex-col gap-6">
          {children}
        </div>

      </div>
    </div>
  );
}
