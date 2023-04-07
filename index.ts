import { createCipheriv, createDecipheriv, randomBytes, scryptSync } from "node:crypto";

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
	const salt = randomBytes(16);

	const password = scryptSync(options.encryptionKey, salt, 32, { N: 2 ** 14, r: 8, p: 1 });
	const cipher = createCipheriv("aes-256-gcm", password, initializationVector);

	const encryptedText = Buffer.concat([cipher.update(Buffer.from(text)), cipher.final()]);

	const authTag = cipher.getAuthTag();

	return Buffer.concat([initializationVector, salt, authTag, encryptedText]).toString(options.encoding);
};

export const decrypt = (text: string, options: Options) => {
	options = {
		encoding: "base64",
		...options,
	};

	const encryptedData = Buffer.from(text, options.encoding);
	const initializationVector = encryptedData.subarray(0, 16);
	const salt = encryptedData.subarray(16, 32);
	const authTag = encryptedData.subarray(32, 48);
	const encryptedContent = encryptedData.subarray(48);

	const password = scryptSync(options.encryptionKey, salt, 32, { N: 2 ** 14, r: 8, p: 1 });
	const decipher = createDecipheriv("aes-256-gcm", password, initializationVector);

	decipher.setAuthTag(authTag);

	return Buffer.concat([decipher.update(encryptedContent), decipher.final()]).toString();
};

export const generateEncryptionKey = (length = 32) => randomBytes(length).toString("base64");
