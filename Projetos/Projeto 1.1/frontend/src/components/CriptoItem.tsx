import { Dispatch, SetStateAction, useContext, useEffect, useState } from 'react'
import { Cripto } from '../App'
import { CriptoContext } from '../context/CriptoContext'
import api from '../services/api'
import criptoApi from '../services/criptoApi'

interface CriptoItemProps {
	cripto: Cripto
   array: Cripto[]
   setArray: Dispatch<React.SetStateAction<Cripto[]>>
}

interface TickerData {
   ticker: {
      high: number
      low: number
      vol: number
      last: number
      buy: number
      sell: number
      date: number
   }
}

export function CriptoItem({ cripto, array, setArray }: CriptoItemProps) {
   const { newCriptoValue, setNewCriptoValue } = useContext(CriptoContext)

   const formCurrency = new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      minimumFractionDigits: 2
  })

	async function updateCripto(coin: string, id: string) {
		await criptoApi.get<TickerData>(`/${coin}/ticker`).then((response) => {
         setNewCriptoValue(response.data)
      })

      await api.put(`/cripto/${id}`, {
         "value": `${formCurrency.format(newCriptoValue.ticker.last)}`
      }).then(response => console.log(response.data.message))
	}

   async function deleteCripto(id: string) {
      await api.delete(`/cripto/${id}`).then(response => console.log(response.data.message))
      const newArray = array.filter(cri => cri.id != cri.id)

      setArray(newArray)
   }

	return (
		<div className="flex items-center flex-col border-2 p-3">
			<h1 className="font-bold text-2xl">{cripto.name}</h1>
			<p>Ano de criação: {cripto.yearCreated}</p>
			<p>Maior valor atingido: R$ {cripto.max}</p>
			<h2 className="flex flex-col items-center mt-4 text-xs">
				<span className="text-xl">{cripto.value}</span> Cotação atual
			</h2>
			<button
				onClick={() => updateCripto(cripto.coin, cripto.id)}
				className="bg-orange-400 px-8 py-1 rounded-lg border-2 border-orange-400 mt-8 hover:bg-white hover:text-black duration-200 active:bg-orange-400 outline-red-600 text-white"
			>
				Atualizar cripto
			</button>
			<button onClick={() => deleteCripto(cripto.id)} className="bg-red-500 px-8 py-1 rounded-lg border-2 border-red-500 mt-4 hover:bg-white hover:text-black duration-200 active:bg-red-500 outline-orange-400 text-white">
				Deletar cripto
			</button>
		</div>
	)
}
