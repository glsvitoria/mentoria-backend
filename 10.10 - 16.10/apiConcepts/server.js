const express = require('express')
const app = express()
const data = require('./data.json')

/* Verbos HTTP
 * GET: Receber dados de um Resource
 * POST: Enviar dados ou informações para serem processdados por um Resource
 * PUT: Atualizar dados de um Resource
 * DELETE: Deletar um Resource
 */

app.use(express.json())

app.get('/client', (req, res) => {
	res.status(200).json(data)
})

app.get('/client/:id', (req, res) => {
	const { id } = req.params
	const client = data.find((cli) => cli.id == id)

	if (!client) return res.status(204).json()

	res.json(client)
})
app.post('/client', (req, res) => {
	const { name, email } = req.body

   // Salvar

   res.status(201).json({name, email})
})

app.put('/client/:id', (req, res) => {
   const { id } = req.params
	const client = data.find((cli) => cli.id == id)

   if (!client) return res.status(204).json()

   const { name } = req.body
   client.name = name

   res.json(client)
})

app.delete('/client/:id', (req, res) => {
   const { id } = req.params
   const clientFiltered = data.filter(client => client.id != id)

   res.json(clientFiltered)
})

app.listen(3000, () => {
	console.log('Server is running')
})
