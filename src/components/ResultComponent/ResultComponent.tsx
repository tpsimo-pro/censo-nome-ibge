import React, { useCallback, useEffect, useState } from 'react';
import { BarChart } from '@mui/x-charts/BarChart';
import { DataFormat } from '../../types';
import { PieChart } from '@mui/x-charts';

type ResultComponentProps = {
  data: DataFormat[]
}

// Definition for type data structure in PieChart
type PieChartData = {
  id: number;
  value: number;
  label: string;
}

// Definition for type data structure in BarChart
const BarChartData = {
  yAxis: [
    {
      label: 'Frequência',
      width: 60
    }
  ],
  height: 300
}

const ResultComponent = ({ data }: ResultComponentProps) => {
  // useState for data used in BarChart
  const [barChartData, setBarChartData] = useState<Record<string, any>[]>([])
  // useState for data used in PieChart
  const [pieChartData, setPieChartData] = useState<PieChartData[]>([]);
  // used to remove "[" present in the periodos inside res
  const cleantText = (text: string) => text.replaceAll("[", "")

  const handleData = useCallback(() => {
    // Implementation for getting data necessary to display in BarChart:
    if (data && data.length > 0) {
      const periodos = new Set()
      data.forEach(({ res }) => {
        res.forEach(({ periodo }) => periodos.add(cleantText(periodo)))
      })

      // Formatting dataSet to use in BarChartComponent
      const response = Array.from(periodos).map((p) => {
        const newObject = { periodos: p }
        data.forEach(value => {
          const nome = value.nome
          const res = value.res.find(({ periodo }) => cleantText(periodo) === p)

          newObject[nome] = res ? res.frequencia : 0
        })
        return newObject
      })
      setBarChartData(response)
      console.log(data)
    }
  }, [data])

  useEffect(() => {
    handleData()

    // Implementation for getting data necessary to display in PieChart: 
    if (data && data.length > 0) {
      const aggregatedData = data.map(item => {
        const totalFrequencia = item.res.reduce((sum, current) => sum + current.frequencia, 0);
        return {
          nome: item.nome,
          total: totalFrequencia
        };
      });

      const topTres = aggregatedData.sort((a, b) => b.total - a.total).slice(0, 3);

      // Formatting to use in PieChart Component:
      const formatoPizza = topTres.map((item, index) => ({
        id: index,
        value: item.total,
        label: `${item.nome}`,
      }));
      
      setPieChartData(formatoPizza);
    }
  }, [handleData]) 
  
  // Formatting series to use in BarChart Component
  const series = useCallback(() => {
    return data.map(({ nome }) => ({ dataKey: nome, label: nome }))
  }, []) 

  return (
    <div>
      <h2>Resultado em Gráfico</h2>
      {barChartData.length > 0 ? (<>
        <h3>Frequência por Período</h3>
        <BarChart
          dataset={barChartData}
          xAxis={[{ scaleType: 'band', dataKey: 'periodos' }]}
          series={series()}
          {...BarChartData}
        />
        
        <h3>Top 3 Nomes por Frequência Total</h3>
        <PieChart
          series={[
            {
              data: pieChartData
            },
          ]}
          height={200}
          width={200}
        />

      </>) : (
        <p>Digite um ou mais nomes e clique em buscar para ver o gráfico.</p>
      )}
    </div>
  )
};

export default ResultComponent;