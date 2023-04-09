import React from "react";
import {
  GetServerSideProps,
  GetServerSidePropsContext,
  GetServerSidePropsResult,
} from "next";

import LogoImage from "../../components/assets/logo.svg";
import HomeFeature from "~/features/HomeFeature";

import Link from "next/link";
import Image from "next/image";
import Head from "next/head";
import PhraseShow from "~/features/PhraseShow";

interface Props {
  id: string;
}

function Phrase({ id }: Props) {
  return (
    <>
      <Head>
        <title>PhrasePlay: {id}</title>
        <meta
          name="description"
          content="Learn Mandarin or English your way by generating personalized Anki cards with sentences that truly matter to you!"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="flex min-h-screen flex-col justify-start bg-blue-500 p-2">
        <div className="flex flex-col items-center justify-center p-2 text-center">
          <Link
            href="/"
            className="title-font mb-4 flex flex-col items-center font-medium text-gray-900 md:mb-0"
          >
            <Image
              className="h-20 w-20 rounded-md bg-white/30 p-3"
              src={LogoImage as string}
              alt="PhrasePlay Logo"
            />
            <h1 className="text-2xl font-light text-white">PhrasePlay</h1>
          </Link>
        </div>
        <main className="container mx-auto max-w-sm rounded-md sm:max-w-md md:max-w-lg lg:max-w-4xl lg:py-8 xl:max-w-5xl 2xl:max-w-6xl">
          <PhraseShow id={id} />
        </main>
      </div>
    </>
  );
}

export function getServerSideProps(
  context: GetServerSidePropsContext
): GetServerSidePropsResult<Props> {
  const { id } = context.query;
  return {
    props: { id: id as string },
  };
}

export default Phrase;
