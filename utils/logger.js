import config from '../config/index.js'

const format = (type, msg) => {
	const time = new Date().toLocaleTimeString()
	return `[${time}] [${type}] ${msg}`
}

export const log = (msg) => {
	if (!config.debug) return
	console.log(format('INFO', msg))
}

export const warn = (msg) => {
	console.warn(format('WARN', msg))
}

export const error = (msg) => {
	console.error(format('ERROR', msg))
}
