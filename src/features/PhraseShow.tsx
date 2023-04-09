/* eslint-disable @next/next/no-html-link-for-pages */
import Link from "next/link";
import React, { createContext, useContext, useRef, useState } from "react";
import JoinTheProject from "~/components/JoinTheProject";
import Word from "~/interfaces/word";
import { api } from "~/utils/api";
import {
  GetServerSideProps,
  GetServerSidePropsContext,
  GetServerSidePropsResult,
} from "next";

interface Props {
  id: string;
}

const PhraseShow = ({ id }: Props) => {
  console.log({ id });
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isShowingCard, setIsShowingCard] = useState<boolean>(false);
  const [data, setData] = useState<SentenceType | null>(null);
  const [words, setWords] = useState<Word[]>([]);
  const [currentWord, setCurrentWord] = useState<number>(0);

  api.example.getPhrases.useQuery(
    { uid: id },
    {
      onSuccess: (data) => {
        setIsLoading(false);
        setWords(data.words);
        setData(data as SentenceType);
        setIsShowingCard(true);
      },
    }
  );

  return (
    <div className="flex w-full flex-col lg:rounded-lg lg:bg-white/20 lg:px-2 lg:py-4">
      <div className="grid grid-cols-12 gap-y-4 lg:gap-x-12 lg:gap-y-0 lg:px-2">
        <div className="col-span-12 flex flex-col space-y-2 lg:col-span-6">
          <div className="flex flex-col items-center justify-start rounded-md bg-blue-50 px-2 py-4 text-center shadow-md">
            <a
              href="/"
              className="flex h-12 w-full cursor-pointer items-center justify-center rounded-md border border-blue-200 bg-white px-6 text-center font-light text-blue-600 hover:border-blue-500"
            >
              Create Anki Card
            </a>
          </div>
          {isLoading && <Loader />}
          {isShowingCard && (
            <div className="h-auto w-full">
              <div className="flex flex-col items-center justify-center pb-6 pt-4 text-center">
                <div className="w-12 border border-t border-blue-300"></div>
              </div>
              <div className="flex flex-col items-center justify-start">
                <Card
                  words={words}
                  currentWord={currentWord}
                  sentence={data?.sentence as string}
                />
              </div>
            </div>
          )}
          {isShowingCard && (
            <div className="flex w-full flex-col pt-2">
              <div className="flex flex-row justify-between">
                <div
                  onClick={() => {
                    console.log({ currentWord });
                    if (currentWord - 1 < 0) {
                      setCurrentWord(words.length - 1);
                    } else {
                      setCurrentWord((currentWord - 1) % words.length);
                    }
                  }}
                  className="flex h-12 w-40 cursor-pointer items-center justify-center rounded-l-md bg-blue-600 px-6 text-center text-white shadow-md hover:bg-blue-700"
                >
                  Previous
                </div>
                <div
                  onClick={() => {
                    setCurrentWord((currentWord + 1) % words.length);
                  }}
                  className="flex h-12 w-40 cursor-pointer items-center justify-center rounded-r-md bg-blue-600 px-6 text-center text-white shadow-md hover:bg-blue-700"
                >
                  Next
                </div>
              </div>
            </div>
          )}
        </div>
        <div className="col-span-12 lg:col-span-6">
          <div className="flex flex-col items-center justify-center pb-6 pt-4 text-center lg:hidden">
            <div className="w-12 border border-t border-blue-300"></div>
          </div>
          <div className="flex flex-col items-center justify-start">
            <Phrases />
          </div>
        </div>
      </div>
    </div>
  );
};

export const Loader = () => {
  return (
    <div className="flex w-full flex-col">
      <div className="flex h-72 flex-col items-center justify-center rounded-md border border-slate-200 bg-blue-50 text-center shadow-md">
        <div className="flex flex-col space-y-2">
          <div className="text-light text-sm capitalize text-slate-500">
            Generating Anki Card...
          </div>
          <progress className="progress progress-info w-56"></progress>
          <div className="text-light py-1 text-xs capitalize text-slate-400">
            (Sorry this might take up to 20 seconds...)
          </div>
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

export const Phrases = () => {
  const { isLoading, data: phrases } = api.example.getAllPhrases.useQuery();

  if (isLoading) {
    return <div className="flex flex-col">loading data</div>;
  }

  return (
    <div className="flex w-full flex-col">
      <p className="w-full py-1 text-center font-medium uppercase text-white lg:text-start">
        Recent Phrases
      </p>
      <div className="flex flex-col rounded-md border border-blue-200 bg-blue-100 p-2">
        <div className="flex flex-col space-y-2">
          {phrases &&
            phrases.map(
              (phrase: {
                sentenceUID: string;
                sentence: string;
                words: Word[];
              }) => (
                <Link
                  href={`/phrase/${phrase.sentenceUID}`}
                  className="flex flex-col rounded-md border border-slate-200 bg-blue-50 px-4 py-2  hover:border-blue-500"
                  key={phrase.sentenceUID}
                >
                  <div className="">{phrase.sentence}</div>
                  <div className="text-sm text-blue-600">
                    {phrase.words.map((word) => word.original).join("")}
                  </div>
                </Link>
              )
            )}
        </div>
      </div>
    </div>
  );
};

type CardProps = {
  sentence: string;
  words: Word[];
  currentWord: number;
};
export const Card = ({ words, currentWord, sentence }: CardProps) => {
  if (words) {
    const word = words[currentWord] as Word;
    return (
      <div className="flex w-full flex-col space-y-2">
        <div className="flex min-h-16 w-full flex-col items-center justify-between rounded-md bg-blue-50 px-2 py-4 text-center shadow-md">
          <div className="text-lg">{sentence}</div>
          <div className="text-sm text-blue-600">
            {words.map((word) => word.original).join("")}
          </div>
        </div>
        <div className="flex h-72  w-full flex-col items-center justify-between rounded-md bg-blue-50 px-2 py-4 text-center shadow-md">
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

          <div className="flex flex-row items-center justify-center space-x-2 px-2 text-center">
            {word.translated.map((a) => (
              <div
                key={a}
                className="flex h-full items-center justify-center rounded-md border border-slate-200 bg-blue-50 px-4 py-2 text-center text-base text-slate-600"
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

export default PhraseShow;

type SentenceType = {
  pinyin: string;
  sentence: string;
  sentenceUID: string;
  translatedDirection: string;
  words: Word[];
};
