import express from 'express'
import cors from 'cors'
import routes from './routes'

const server = express()
server.use(express.json())

server.use(cors())
server.use(routes)

server.listen(3000, () => {
	console.log(`[SERVER] Running at http://localhost:3000`)
})
