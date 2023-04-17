# phraseplay
 phrase-play.vercel.app

## Name: 
PhrasePlay

## Elevator Pitch: 
Learn Mandarin or English your way by generating personalized Anki cards with sentences that truly matter to you!

## Description: 

Master Mandarin or English at your own pace by creating custom Anki cards with sentences that resonate with you! Our app enables you to hone your language skills while concentrating on phrases that hold personal significance. Simply input the English or Traditional Chinese sentence you wish to translate and practice, and our app, fueled by OpenAI, will generate bespoke Anki cards crafted to fit your needs. Each card showcases the Hanzi stroke order, the translated word, Pinyin, and audio pronunciation from Google's Cognitive API. This tailored learning experience makes language acquisition both captivating and enjoyable, helping you focus on what truly matters to you.

# Setup


### Generate certs

- hosts: `127.0.0.1 phraseplay.lab`
- $: `mkcert phraseplay.lab "*.phraseplay.lab" localhost 127.0.0.1 ::1`
- `mkcert -install`

### Place certs in:

```
  cert: ../certs/phraseplay.lab+4.pem
  key: ../certs/phraseplay.lab+4-key.pem

```
deplay: 4
