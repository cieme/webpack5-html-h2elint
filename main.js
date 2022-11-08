import '@/styles/index.scss'
import { encrypt, decrypt } from './utils/index'
const str = encrypt('皮卡丘')
console.log(str)
console.log(decrypt(str))
const a = 1
const b = Math.random()
console.log(a + b)
class XX {
  constructor() {
    this.tt = 1
  }
}
const yy = new XX()
console.log(yy?.xx)
