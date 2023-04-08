# Setup

# phraseplay

https://phraseplay.com

### Generate certs

- hosts: `127.0.0.1 phraseplay.lab`
- $: `mkcert phraseplay.lab "*.phraseplay.lab" localhost 127.0.0.1 ::1`
- `mkcert -install`

### Place certs in:

```
  cert: ../certs/phraseplay.lab+4.pem
  key: ../certs/phraseplay.lab+4-key.pem

```
deplay: 1

