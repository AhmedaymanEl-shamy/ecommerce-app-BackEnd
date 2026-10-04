import { Injectable } from "@nestjs/common";
import * as crypto from 'crypto';


@Injectable()
export class EncryptionService{

  private readonly algorithm = 'aes-256-cbc';
  private readonly key = Buffer.from(
    '6d67dcb94efc2c64d0d2c0d4d15d2f7bfa1bcb0fdb5a8f4f7a45c5c80c3c90b8',
    'hex',
  );

    encrypt(text:string): string{

    const iv = crypto.randomBytes(16);

    const cipher = crypto.createCipheriv(
      this.algorithm,
      this.key,
      iv,
    );

    const encrypted = Buffer.concat([
      cipher.update(text),
      cipher.final(),
    ]);

    return `${iv.toString('hex')}:${encrypted.toString('hex')}`;
  }

  deCrypt(encryptedText:string):string{
     const [ivHex, encryptedHex] = encryptedText.split(':');

    const decipher = crypto.createDecipheriv(
      this.algorithm,
      this.key,
      Buffer.from(ivHex, 'hex'),
    );

    const decrypted = Buffer.concat([
      decipher.update(Buffer.from(encryptedHex, 'hex')),
      decipher.final(),
    ]);

    return decrypted.toString();
  }

    }

