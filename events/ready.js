import { REST, Routes } from 'discord.js'
import config from '../config/index.js'

export default (client) => {
	client.once('clientReady', async () => {
		console.log(`Logged in as ${client.user.tag}`)

		const cmds = [...client.commands.values()].map((c) => c.data.toJSON())

		const rest = new REST({ version: '10' }).setToken(config.token)

		await rest.put(Routes.applicationCommands(config.clientId), { body: cmds })

		console.log('Slash commands registered')
	})
}
