import React, { createContext, useContext } from "react";
import { api } from "~/utils/api";

function HomeFeature() {
  return (
    <div className="flex flex-col items-center justify-center px-4 py-12">
      <LanguagePicker />
      <PhraseBox />
      <Loader />
      {/* <Sentances /> */}
    </div>
  );
}

export const Loader = () => {
  return (
    <div className="flex w-full flex-col py-2">
      <div className="flex h-52 flex-col items-center justify-center rounded-md border border-slate-200 text-center">
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

export const PhraseBox = () => {
  return (
    <div className="flex w-full flex-col">
      <textarea
        id="message"
        lang="tw"
        rows={4}
        maxLength={100}
        className="block w-full rounded-lg border border-gray-200 bg-gray-50 p-2.5 text-sm text-gray-900 ring-0 active:ring-0"
        placeholder="Enter the sentence you'd like to translate and practice..."
      ></textarea>
    </div>
  );
};

// export const Sentances = () => {
//   const { data, isLoading } = api.example.getAll();

//   if (isLoading) {
//     return <div className="flex flex-col">loading...</div>;
//   }
//   return (
//     <div className="">
//       <h1>data: {JSON.stringify(data)}</h1>
//     </div>
//   );
// };
export default HomeFeature;
