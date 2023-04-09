import React, { createContext, useContext, useRef, useState } from "react";
import JoinTheProject from "~/components/JoinTheProject";
import Word from "~/interfaces/word";
import { api } from "~/utils/api";

function HomeFeature() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isShowingCard, setIsShowingCard] = useState<boolean>(false);
  const [english, setEnglish] = useState<string>("");
  const [mandarin, setMandarin] = useState<string>("");
  const [words, setWords] = useState<Word[]>([]);
  const [currentWord, setCurrentWord] = useState<number>(0);

  return (
    <div className="flex w-full flex-col">
      <div className="grid grid-cols-12 gap-y-4 lg:gap-x-12 lg:gap-y-0 lg:px-6">
        <div className="col-span-12 flex flex-col space-y-2 lg:col-span-8">
          <div className="flex flex-col items-center justify-start rounded-md bg-blue-50 px-2 py-4 text-center shadow-md">
            <LanguagePicker />
            <PhraseBox
              setIsLoading={setIsLoading}
              setWords={setWords}
              setIsShowingCard={setIsShowingCard}
            />
          </div>
          {isLoading && <Loader />}
          {isShowingCard && (
            <div className="h-auto w-full">
              <div className="flex flex-col items-center justify-center pb-6 pt-4 text-center">
                <div className="w-12 border border-t border-blue-300"></div>
              </div>
              <div className="flex flex-col items-center justify-start rounded-md bg-blue-50 px-2 py-4 text-center shadow-md">
                <Card words={words} currentWord={currentWord} />
              </div>
            </div>
          )}
          {isShowingCard && (
            <div className="flex w-full flex-col">
              <div className="flex flex-row justify-between">
                <div
                  onClick={() => {
                    setCurrentWord(Math.abs((currentWord - 1) % words.length));
                  }}
                  className="flex h-12 w-40 cursor-pointer items-center justify-center rounded-l-md bg-blue-600 px-6 text-center text-white hover:bg-blue-700"
                >
                  Previous
                </div>
                <div
                  onClick={() => {
                    setCurrentWord(Math.abs((currentWord + 1) % words.length));
                  }}
                  className="flex h-12 w-40 cursor-pointer items-center justify-center rounded-r-md bg-blue-600 px-6 text-center text-white hover:bg-blue-700"
                >
                  Next
                </div>
              </div>
            </div>
          )}
        </div>
        <div className="col-span-12 lg:col-span-4">
          <div className="flex flex-col items-center justify-center pb-6 pt-4 text-center">
            <div className="w-12 border border-t border-blue-300"></div>
          </div>
          <div className="flex flex-col items-center justify-start rounded-md bg-blue-50 px-2 py-4 text-center shadow-md">
            <Phrases />
          </div>
        </div>
      </div>
    </div>
  );
}

export const Loader = () => {
  return (
    <div className="flex w-full flex-col">
      <div className="flex h-52 flex-col items-center justify-center rounded-md border border-slate-200 text-center bg-white">
        <div className="flex flex-col space-y-2">
          <div className="text-light text-sm capitalize text-slate-500">
            Generating Anki Card...
          </div>
          <progress className="progress w-56"></progress>
        </div>
      </div>
    </div>
  );
};
export const LanguagePicker = () => {
  return (
    <div className="flex flex-col pb-2">
      <span>Mandarin to English</span>
    </div>
  );
};

type PhraseBoxProps = {
  setIsLoading: (state: boolean) => void;
  setWords: (words: any[]) => void;
  setIsShowingCard: (state: boolean) => void;
};
export const PhraseBox = ({
  setIsLoading,
  setWords,
  setIsShowingCard,
}: PhraseBoxProps) => {
  const textBox = useRef<null | HTMLTextAreaElement>(null);
  const mutation = api.example.createAnki.useMutation();

  const onCreateAnkiCard = () => {
    console.log({ textBox: textBox.current });
    mutation.mutate({
      sentence: textBox?.current?.value as string,
      translationDirection: "EnglishToChinese",
    });
  };

  if (mutation.isLoading) {
    setIsLoading(true);
  }
  if (mutation.data) {
    setIsLoading(false);
    setWords(mutation.data.sentence.words as Word[]);
    setIsShowingCard(true);
  }

  return (
    <div className="flex w-full flex-col space-y-2">
      <textarea
        ref={textBox}
        id="message"
        lang="tw"
        rows={4}
        maxLength={100}
        className="block w-full rounded-lg border border-gray-200 bg-gray-50 p-2.5 text-sm text-gray-900 ring-0 active:ring-0"
        placeholder="Enter the sentence you'd like to translate and practice..."
      ></textarea>
      <button
        onClick={onCreateAnkiCard}
        className="flex h-12 w-full cursor-pointer items-center justify-center rounded-md border border-blue-300 bg-blue-50 px-6 text-center  text-blue-600 hover:bg-blue-500"
      >
        Create Anki Card
      </button>
    </div>
  );
};

export const Phrases = () => {
  const { isLoading, data: phrases } = api.example.getAllPhrases.useQuery();

  if (isLoading) {
    return <div className="flex flex-col">loading data</div>;
  }

  return (
    <div className="flex w-full flex-col rounded-md border border-slate-200 p-2">
      <div className="flex flex-col space-y-1 py-2">
        {phrases &&
          phrases.map(
            (phrase: {
              sentenceUID: string;
              sentence: string;
              words: Word[];
            }) => <div key={phrase.sentenceUID}>{phrase.sentence}</div>
          )}
      </div>
    </div>
  );
};

type CardProps = {
  words: Word[];
  currentWord: number;
};
export const Card = ({ words, currentWord }: CardProps) => {
  if (words) {
    const word = words[currentWord] as Word;
    return (
      <div className="flex w-full flex-col py-4">
        <div className="flex h-72  w-full flex-col items-center justify-between rounded-md border border-slate-200 px-2 py-4 text-center">
          <div className="flex flex-col space-y-1">
            <div className="text-4xl">{word.original}</div>
            <div className="text-lg text-blue-700">{word.pinyin}</div>
          </div>
          {/* <JoinTheProject /> */}
          <div
            className="rounded-full border border-blue-200 p-4 text-blue-600"
            onClick={() => {
              alert("Join the Project. Implement this feature =)");
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="h-6 w-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19.114 5.636a9 9 0 010 12.728M16.463 8.288a5.25 5.25 0 010 7.424M6.75 8.25l4.72-4.72a.75.75 0 011.28.53v15.88a.75.75 0 01-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.01 9.01 0 012.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75z"
              />
            </svg>
          </div>

          <div className="flex flex-row space-x-2">
            {word.translated.map((a) => (
              <div
                key={a}
                className="rounded-md border border-slate-200 bg-blue-50 px-4 py-2 text-base text-slate-600"
              >
                {a}
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (words) {
    return <div className="flex flex-col">No Data</div>;
  }
  return <div></div>;
};
export default HomeFeature;
