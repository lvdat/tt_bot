import createClient from './core/client.js'
import config from './config/index.js'

import mongo from './database/mongo.js'
import redis from './database/redis.js'

import { flushXP } from './modules/level/buffer.js'
import { addXP } from './modules/level/level.service.js'

// events
import messageEvent from './events/messageCreate.js'
import voiceEvent from './events/voiceStateUpdate.js'
import interactionEvent from './events/interactionCreate.js'
import readyEvent from './events/ready.js'

// commands
import rank from './commands/rank.js'
import leaderboard from './commands/leaderboard.js'

import setLevelChannel from './commands/config/set-level-channel.js'
import addLevelRole from './commands/config/add-level-role.js'
import removeLevelRole from './commands/config/remove-level-role.js'
import configView from './commands/config/config-view.js'

const client = createClient()

// 📦 command registry
const commands = new Map([
	[rank.data.name, rank],
	[leaderboard.data.name, leaderboard],

	[setLevelChannel.data.name, setLevelChannel],
	[addLevelRole.data.name, addLevelRole],
	[removeLevelRole.data.name, removeLevelRole],
	[configView.data.name, configView],
])
client.commands = commands

// 🗄️ connect DB
await mongo()

// ⚡ start Redis XP buffer worker
flushXP(redis, addXP, client)

// 🔌 bind events
messageEvent(client)
voiceEvent(client)
interactionEvent(client, commands)
readyEvent(client)

// 🚀 login
client.login(config.token)
