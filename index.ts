import { createCipheriv, createDecipheriv, pbkdf2Sync, randomBytes } from "node:crypto";

type Options = {
	encryptionKey: string;
	encoding?: Exclude<BufferEncoding, "ascii" | "utf8" | "utf-8">; // eslint-disable-line unicorn/text-encoding-identifier-case
};

export const encrypt = (text: string, options: Options) => {
	options = {
		encoding: "base64",
		...options,
	};
	const initializationVector = randomBytes(16);
	const password = pbkdf2Sync(options.encryptionKey, initializationVector.toString(), 10_000, 32, "sha512");
	const cipher = createCipheriv("aes-256-cbc", password, initializationVector);
	return Buffer.concat([initializationVector, cipher.update(Buffer.from(text)), cipher.final()]).toString(options.encoding);
};

export const decrypt = (text: string, options: Options) => {
	options = {
		encoding: "base64",
		...options,
	};
	const cipher = Buffer.from(text, options.encoding);
	const initializationVector = cipher.subarray(0, 16);
	const password = pbkdf2Sync(options.encryptionKey, initializationVector.toString(), 10_000, 32, "sha512");
	const decipher = createDecipheriv("aes-256-cbc", password, initializationVector);
	return Buffer.concat([decipher.update(cipher.subarray(16)), decipher.final()]).toString();
};
