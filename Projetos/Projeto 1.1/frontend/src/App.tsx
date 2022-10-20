import { useContext, useEffect, useState } from 'react'
import { CriptoItem } from './components/CriptoItem'
import { CriptoContext } from './context/CriptoContext'
import api from './services/api'
import './styles/global.css'

export interface Cripto {
	id: string
	name: string
	coin: string
	value: number
	max: number
	yearCreated: number
}

function App() {
	const [criptos, setCriptos] = useState<Cripto[]>([])
	const { newCriptoValue } = useContext(CriptoContext)

	useEffect(() => {
		api.get<Cripto[]>('/cripto').then((response) => {
			setCriptos(response.data)
		})
	}, [newCriptoValue, criptos])

	return (
		<>
			<header className="h-16 bg-green-600 text-gray-200 flex items-center justify-center text-4xl font-font">
				Cripto search
			</header>

			<main>
				<div className="grid grid-cols-3 max-w-[1024px] mx-auto gap-2 mt-8 relative">
					{criptos.length > 0 ? (
						criptos.map((cripto) => (
							<CriptoItem
								key={cripto.id}
								cripto={cripto}
								array={criptos}
								setArray={setCriptos}
							/>
						))
					) : (
						<div className="absolute w-[100%] flex items-center justify-center">
							<span>
								Nenhuma criptomoeda encontrada
							</span>
						</div>
					)}
				</div>
			</main>
		</>
	)
}

export default App
