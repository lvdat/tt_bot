import { createClient } from 'redis'
import config from '../config/index.js'

const client = createClient({ url: config.redis })

await client.connect()

console.log('Redis connected')

export default client
