/* eslint-disable react/jsx-one-expression-per-line */
import { useState } from 'react';
import FileUploader from './components/FileUploader';
import UserCard from './components/UserCard';
import UserCardContainer from './components/UserCardContainer';
import Title from './components/Title';

function App() {
  const [file1, setFile1] = useState<File | null>(null);
  const [fileContent1, setFileContent1] = useState<any | null>(null);

  const [file2, setFile2] = useState<File | null>(null);
  const [fileContent2, setFileContent2] = useState<any | null>(null);

  const stopedFollowing = fileContent1?.filter((item: any) => !fileContent2
    ?.some((item2: any) => item.value === item2.value));

  const startFollowing = fileContent2?.filter((item: any) => !fileContent1
    ?.some((item2: any) => item
      .value === item2.value));

  return (
    <>
      <Title classname="text-white font-normal mt-10 text-xl">Upload two files to compare who stopped following you and who started following you</Title>
      <div className="mt-10 flex justify-start items-center">
        <div className="w-[500px] self-start">
          <Title classname="mb-4 font-normal">Upload File 1</Title>
          <FileUploader
            file={ file1 }
            setFile={ setFile1 }
            fileContent={ fileContent1 }
            setFileContent={ setFileContent1 }
          />
        </div>
        <div className="w-[500px] self-start">
          <Title classname="mb-4 font-normal">Upload File 2</Title>
          <FileUploader
            file={ file2 }
            setFile={ setFile2 }
            fileContent={ fileContent2 }
            setFileContent={ setFileContent2 }
          />
        </div>

      </div>
      {file1 && file2 && (
        <div className="my-8 flex flex-col gap-4">
          <UserCardContainer>
            <Title>Quem parou de te seguir</Title>
            {stopedFollowing?.length === 0
              ? <p>Niguem parou de te seguir</p>
              : stopedFollowing?.map((item: any, index: number) => (
                <UserCard
                  key={ item.value + index }
                  { ...item }
                />
              ))}
          </UserCardContainer>

          <UserCardContainer>
            <Title>Quem começou a te seguir</Title>
            {startFollowing?.length === 0
              ? <p className="text-center">Ninguem começou a te seguir</p>
              : startFollowing?.map((item: any, index: number) => (
                <UserCard
                  key={ item.value + index }
                  { ...item }
                />
              ))}
          </UserCardContainer>
        </div>
      )}
    </>
  );
}

export default App;
