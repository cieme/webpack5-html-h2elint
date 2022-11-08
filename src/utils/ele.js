import 'element-ui/lib/theme-chalk/index.css'
import { Message, MessageBox } from 'element-ui'
import axios from 'axios'
Message.success('1')
MessageBox.confirm('1', '2')
axios
  .post('/', { x: 1 })
  .then((res) => {
    console.log(res)
  })
  .catch((err) => {
    console.log(err)
  })
