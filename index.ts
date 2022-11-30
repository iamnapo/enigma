import * as crypto from "node:crypto";

type Options = {
	encryptionKey: string;
};

export const encrypt = (text: string, options: Options) => {
	const initializationVector = crypto.randomBytes(16);
	const password = crypto.pbkdf2Sync(options.encryptionKey, initializationVector.toString(), 10_000, 32, "sha512");
	const cipher = crypto.createCipheriv("aes-256-cbc", password, initializationVector);
	return Buffer.concat([
		initializationVector,
		Buffer.from(":"),
		cipher.update(Buffer.from(text)),
		cipher.final(),
	]).toString("hex");
};

export const decrypt = (text: string, options: Options) => {
	const cipher = Buffer.from(text, "hex");
	const initializationVector = cipher.subarray(0, 16);
	const password = crypto.pbkdf2Sync(options.encryptionKey, initializationVector.toString(), 10_000, 32, "sha512");
	const decipher = crypto.createDecipheriv("aes-256-cbc", password, initializationVector);
	return Buffer.concat([decipher.update(Buffer.from(cipher.subarray(17))), decipher.final()]).toString("utf8");
};
