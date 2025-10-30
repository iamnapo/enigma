import { strict as assert } from "node:assert";
import * as crypto from "node:crypto";
import test from "node:test";

import { decrypt, encrypt, generateEncryptionKey } from "../index.js";

await test("main", () => {
	assert.notEqual(encrypt("yo", { encryptionKey: "123" }), encrypt("yo", { encryptionKey: "123" }));
	const randomText = crypto.randomBytes(20).toString("hex");
	const randomEncryptionKey = crypto.randomBytes(20).toString("hex");
	const opts = { encryptionKey: randomEncryptionKey };
	assert.equal(decrypt(encrypt(randomText, opts), opts), randomText);
	assert.equal(decrypt(encrypt(randomText, { ...opts, encoding: "hex" }), { ...opts, encoding: "hex" }), randomText);
	assert.equal(Buffer.from(generateEncryptionKey(), "base64").length, 32);
	assert.equal(Buffer.from(generateEncryptionKey(69), "base64").length, 69);
	assert.notEqual(generateEncryptionKey(), generateEncryptionKey());
});
