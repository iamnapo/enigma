import * as crypto from "node:crypto";

import test from "ava";

import { encrypt, decrypt } from "../index.js";

test("main", (t) => {
	t.not(encrypt("yo", { encryptionKey: "123" }), encrypt("yo", { encryptionKey: "123" }));
	const randomText = crypto.randomBytes(20).toString("hex");
	const randomEncryptionKey = crypto.randomBytes(20).toString("hex");
	t.is(decrypt(encrypt(randomText, { encryptionKey: randomEncryptionKey }), { encryptionKey: randomEncryptionKey }), randomText);
});

