var CryptoJS = require("crypto-js");

var key = CryptoJS.enc.Utf8.parse('b75524255a7f54d2726a951bb39204df');
var iv = CryptoJS.enc.Utf8.parse('1583288699248111');


export function encryptData(text) {
    var encryptedCP = CryptoJS.AES.encrypt(text, key, { iv: iv });
    var decryptedWA = CryptoJS.AES.decrypt(encryptedCP, key, { iv: iv });
    var cryptText = encryptedCP.toString();
    return cryptText;
}

export function decryptData(text) {
    var cipherParams = CryptoJS.lib.CipherParams.create({
        ciphertext: CryptoJS.enc.Base64.parse(text)
    });
    var decryptedFromText = CryptoJS.AES.decrypt(cipherParams, key, { iv: iv });
    // console.log(decryptedFromText.toString(CryptoJS.enc.Utf8));
    return decryptedFromText.toString(CryptoJS.enc.Utf8);
}