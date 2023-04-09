import { Html, Head, Main, NextScript } from "next/document";
import Script from "next/script";
import { env } from "~/env.mjs";

export default function Document() {
  return (
    <Html>
      <Head>
        <link rel="icon" href="/favicon.ico" />

        <meta
          name="description"
          content="Learn Mandarin or English your way by generating personalized Anki cards with sentences that truly matter to you!"
        />

        <meta
          name="keywords"
          content="Language learning app, custom Anki cards, Mandarin practice, English practice, Traditional Chinese translation, Pinyin pronunciation, Hanzi stroke order, bidirectional translation, personalized language tool, OpenAI-powered app, Google Cognitive API, language education, self-paced learning, interactive language practice"
        />

        <meta name="robots" content="all" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1"
        />
        <meta name="theme-color" content="#3b82f6" />
        <meta name="color-scheme" content="light only" />

        <link rel="icon" sizes="192x192" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/favicon.ico" />
        <link rel="mask-icon" href="/favicon.ico" color="#3b82f6" />

        {/* - Open Graph tags for social media  */}
        <meta
          property="og:title"
          content="Learn Mandarin or English by generating personalized Anki cards with sentences that truly matter to you!"
        />
        <meta
          property="og:description"
          content="Master Mandarin or English at your own pace by creating custom Anki cards with sentences that resonate with you! Our app enables you to hone your language skills while concentrating on phrases that hold personal significance. Simply input the English or Traditional Chinese sentence you wish to translate and practice, and our app, fueled by OpenAI, will generate bespoke Anki cards crafted to fit your needs. Each card showcases the Hanzi stroke order, the translated word, Pinyin, and audio pronunciation from Google's Cognitive API. This tailored learning experience makes language acquisition both captivating and enjoyable, helping you focus on what truly matters to you."
        />
        <meta
          property="og:image"
          content="https://phrase-play.vercel.app/card.png"
        />
        <meta property="og:url" content="https://phrase-play.vercel.app" />

        {/* - Twitter tags for social media  */}
        <meta name="twitter:card" content="summary" />
        <meta
          name="twitter:title"
          content="Learn Mandarin or English by generating personalized Anki cards with sentences that truly matter to you!"
        />
        <meta
          name="twitter:description"
          content="Master Mandarin or English at your own pace by creating custom Anki cards with sentences that resonate with you! Our app enables you to hone your language skills while concentrating on phrases that hold personal significance. Simply input the English or Traditional Chinese sentence you wish to translate and practice, and our app, fueled by OpenAI, will generate bespoke Anki cards crafted to fit your needs. Each card showcases the Hanzi stroke order, the translated word, Pinyin, and audio pronunciation from Google's Cognitive API. This tailored learning experience makes language acquisition both captivating and enjoyable, helping you focus on what truly matters to you."
        />
        <meta
          name="twitter:image"
          content="https://phrase-play.vercel.app/card.png "
        />
      </Head>
      <body className="bg-blue-600 text-slate-600">
        <Main />
        <NextScript />

        {/* Plugins */}
        {env.GA_MEASUREMENT_ID && (
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${env.GA_MEASUREMENT_ID}`}
            strategy="afterInteractive"
          />
        )}
        {env.GA_MEASUREMENT_ID && (
          <Script id="google-analytics" strategy="afterInteractive">
            {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){window.dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', '${env.GA_MEASUREMENT_ID}');
        `}
          </Script>
        )}
      </body>
    </Html>
  );
}
