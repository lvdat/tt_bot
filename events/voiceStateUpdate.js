import handler from '../modules/level/voice.event.js'
import redis from '../database/redis.js'

export default (client) => {
	client.on('voiceStateUpdate', (o, n) => handler(o, n, redis))
}
