import mongoose from 'mongoose'

const schema = new mongoose.Schema({
	guildId: { type: String, unique: true },

	levelUpChannel: { type: String, default: null },

	levelRoles: [
		{
			level: Number,
			roleId: String,
		},
	],
})

export default mongoose.model('LevelConfig', schema)
