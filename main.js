import '@/styles/index.scss'
import { encryptString, decodeString } from './utils/index'
const str = encryptString('12345678900987654321')
console.log(str)
console.log(decodeString(str))
