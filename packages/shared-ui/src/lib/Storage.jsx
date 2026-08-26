import * as CryptoJS from 'crypto-js';

export const SetStorage = (key,value) =>{
            localStorage.setItem(key,value);
}

export const getStorageData = (key) =>{
        return localStorage.getItem(key);
}

export const clearStorage = () =>{
        localStorage.clear();
}

export const removeItemFromStorage = (key) =>{
        localStorage.removeItem(key);
}

export const EncryptText = (text) => {
        try{
                const key = CryptoJS.PBKDF2(import.meta.env.VITE_HASH_PASSWORD, 'salt', { keySize: 256/32, iterations: 100 });
                const iv = CryptoJS.enc.Utf8.parse(import.meta.env.VITE_AES_IV);
                const encrypted = CryptoJS.AES.encrypt(text, key, { iv: iv, mode: CryptoJS.mode.CBC });
                return encrypted.ciphertext.toString(CryptoJS.enc.Hex);
        }
        catch(err){
                return 'ERR';
        }
    
}

export const DcryptText =  (encrypted_text) => {
        try{
                const key = CryptoJS.PBKDF2(import.meta.env.VITE_HASH_PASSWORD, 'salt', { keySize: 256/32, iterations: 100 });
                const iv = CryptoJS.enc.Utf8.parse(import.meta.env.VITE_AES_IV);
                const decrypted = CryptoJS.AES.decrypt({ ciphertext: CryptoJS.enc.Hex.parse(encrypted_text) }, key, { iv: iv, mode: CryptoJS.mode.CBC });
                return decrypted.toString(CryptoJS.enc.Utf8);
        }
        catch(err){
                console.log(err)
                return 'ERR';
        }
       
}
