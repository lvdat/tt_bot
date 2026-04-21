import mongoose from 'mongoose'

const schema = new mongoose.Schema({
	guildId: String,
	userId: String,
	xp: { type: Number, default: 0 },
	level: { type: Number, default: 1 },
})

schema.index({ guildId: 1, userId: 1 }, { unique: true })

export default mongoose.model('Level', schema)
