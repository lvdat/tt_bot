export default (client, commands) => {
	client.on('interactionCreate', async (interaction) => {
		if (!interaction.isChatInputCommand()) return

		const cmd = commands.get(interaction.commandName)
		if (!cmd) return

		try {
			await cmd.execute(interaction, client)
		} catch (err) {
			console.error(err)
			interaction.reply({ content: '❌ Lỗi command', ephemeral: true })
		}
	})
}
