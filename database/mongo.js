import mongoose from 'mongoose'
import config from '../config/index.js'

export default async () => {
	await mongoose.connect(config.mongo)
	console.log('MongoDB connected')
}
