import createClient from './core/client.js'
import mongo from './database/mongo.js'
import redis from './database/redis.js'
import { flushXP } from './modules/level/buffer.js'
import { addXP } from './modules/level/level.service.js'

import messageEvent from './events/messageCreate.js'
import voiceEvent from './events/voiceStateUpdate.js'
import interactionEvent from './events/interactionCreate.js'

import rank from './commands/rank.js'
import leaderboard from './commands/leaderboard.js'

const client = createClient()

const commands = new Map()
commands.set('rank', rank)
commands.set('leaderboard', leaderboard)

await mongo()

flushXP(redis, addXP, client)

messageEvent(client)
voiceEvent(client)
interactionEvent(client, commands)

client.login(process.env.DISCORD_TOKEN)
