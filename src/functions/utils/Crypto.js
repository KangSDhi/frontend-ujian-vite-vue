import CryptoJs from "crypto-js";

const saltKey = import.meta.env.VITE_SALT_KEY;

export function encryption(value){
    return CryptoJs.Rabbit.encrypt(value, saltKey).toString();
}

export function decryption(value){
    const bytes = CryptoJs.Rabbit.decrypt(value, saltKey);
    return bytes.toString(CryptoJs.enc.Utf8);
}