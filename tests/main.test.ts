import * as crypto from "node:crypto";

import test from "ava";

import { encrypt, decrypt } from "../index.js";

test("main", (t) => {
	t.not(encrypt("yo", { encryptionKey: "123" }), encrypt("yo", { encryptionKey: "123" }));
	const randomText = crypto.randomBytes(20).toString("hex");
	const randomEncryptionKey = crypto.randomBytes(20).toString("hex");
	const opts = { encryptionKey: randomEncryptionKey };
	t.is(decrypt(encrypt(randomText, opts), opts), randomText);
	t.is(decrypt(encrypt(randomText, { ...opts, encoding: "hex" }), { ...opts, encoding: "hex" }), randomText);
});
