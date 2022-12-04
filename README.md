# @iamnapo/enigma

> Create secure ciphers easily

[![build](https://badges.iamnapo.me/ci/iamnapo/enigma)](https://github.com/iamnapo/enigma/actions) [![npm](https://badges.iamnapo.me/npm/@iamnapo/enigma)](https://www.npmjs.com/package/@iamnapo/enigma)

## Install

```sh
npm i @iamnapo/enigma
```

## Usage

```js
import { encrypt, decrypt } from "@iamnapo/enigma";

encrypt("some secret", { encryptionKey: "some-key" }); // => 91ysVc3IbexEwRigsMHTvwRwcuG5rMMWhJ6IkF3iq84=
decrypt("91ysVc3IbexEwRigsMHTvwRwcuG5rMMWhJ6IkF3iq84=", { encryptionKey: "some-key" }); // => "some secret
encrypt("some secret", { encryptionKey: "some-key", encoding: "hex" }); // => 93fd2e92833e{...}82253f9aa4f008
```

## API

### encrypt(input, options)

Encrypt text using the [aes-256-cbc](https://en.wikipedia.org/wiki/Block_cipher_mode_of_operation) encryption algorithm.

> Note: A random Initialization Vector is created and encoded inside the cipher, so each time the result is different.

### decrypt(input, options)

Decrypt text that was encrypted with [`encrypt`](#encryptinput-options).

#### input

Type: `string`

Input text.

#### options

Type: `object`

##### encryptionKey

Type: `string | Buffer | TypedArray | DataView`

Encryption key to use for encryption/decryption.

##### encoding

Type: `"utf16le" | "ucs2" | "ucs-2" | "base64" | "base64url" | "latin1" | "binary" | "hex"`\
Default: `"base64"`

Encoding to use for encryption/decryption.
