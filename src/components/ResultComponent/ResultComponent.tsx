import React, { useCallback, useEffect, useState } from 'react';
import { BarChart } from '@mui/x-charts/BarChart';
import { DataFormat } from '../../types';
import { PieChart } from '@mui/x-charts';

type ResultComponentProps = {
  data: DataFormat[]
}

const chartSetting = {
  yAxis: [
    {
      label: 'Frequência',
      width: 60
    }
  ],
  height: 300
}

const ResultComponent = ({ data }: ResultComponentProps) => {
  const [newData, setNewData] = useState<Record<string, any>[]>([])
  const cleantText = (text: string) => text.replaceAll("[", "")
  const handleData = useCallback(() => {
    const periodos = new Set()
    data.forEach(({ res }) => {
      res.forEach(({ periodo }) => periodos.add(cleantText(periodo)))
    })
    if (data && data.length > 0) {
      const response = Array.from(periodos).map((p) => {
        const newObject = { periodos: p }
        data.forEach(value => {
          const nome = value.nome
          const res = value.res.find(({ periodo }) => cleantText(periodo) === p)

          newObject[nome] = res ? res.frequencia : 0
        })
        return newObject
      })
      console.log(response)
      setNewData(response)
    }
  }, [data])

  useEffect(() => {
    handleData()
  }, [handleData])

  const series = useCallback(() => {
    return data.map(({ nome }) => ({ dataKey: nome, label: nome }))
  }, [])

  return (
    <div>
      <h2>Resultado em Gráfico</h2>
      {newData.length > 0 ? (<>
        <BarChart
          dataset={newData}
          xAxis={[{ dataKey: 'periodos' }]}
          series={series()}
        {...chartSetting}
        />

      </>): (
        <p>Digite um ou mais nomes e clique em buscar para ver o gráfico.</p>
      )}
    </div>
  )
};




export default ResultComponent;