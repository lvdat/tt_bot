import handler from '../modules/level/message.event.js'
import redis from '../database/redis.js'

export default (client) => {
	client.on('messageCreate', (msg) => handler(msg, redis))
}
