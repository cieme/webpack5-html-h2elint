const { AES, enc } = require('crypto-js')
const key = 'PIKAQIU'
/**
 * 加密
 * @author cieme
 * @date 2022-10-31
 * @param {string} str
 * @returns {encrypted}
 */
export const encrypt = (str) => AES.encrypt(str, key).toString()
/**
 * 解密
 * @author cieme
 * @date 2022-10-31
 * @param {encrypted} encrypted
 * @returns {string}
 */
export const decrypt = (encrypted) => {
  const decry = AES.decrypt(encrypted, key)
  return decry.toString(enc.Utf8)
}
