export default (client, commands) => {
	client.on('interactionCreate', async (i) => {
		if (!i.isChatInputCommand()) return

		const cmd = commands.get(i.commandName)
		if (!cmd) return

		await cmd.execute(i)
	})
}
