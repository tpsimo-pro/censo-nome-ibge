import React from 'react';
import { BarChart } from '@mui/x-charts/BarChart';



const ResultComponent = ({ data }) => {


  const newDataSet = [];
  if (data && data.length > 0) {
    data.forEach(nameObject => {
      const nome = nameObject.nome;
      if (nameObject.res) {
        nameObject.res.forEach(periodoData => {
          newDataSet.push({
            [nome]: periodoData.frequencia,
            periodo: periodoData.periodo,
          });
        });
      }
    });
  }


  let chartConfig;

  if (newDataSet.length === 0) {
    
    chartConfig = { series: [], xAxis: [{ data: [], scaleType: 'band' }] };
  } else {
    
    const dataByPeriod = {};
    newDataSet.forEach(item => {
      const periodo = item.periodo;
      if (!dataByPeriod[periodo]) {
        dataByPeriod[periodo] = { periodo };
      }
      const nomeKey = Object.keys(item).find(key => key !== 'periodo');
      dataByPeriod[periodo][nomeKey] = item[nomeKey];
    });

    
    const xAxisLabels = Object.keys(dataByPeriod).sort();
    
    
    const uniqueNames = data.map(item => item.nome);

    
    const series = uniqueNames.map(nome => {
      return {
        label: nome,
        data: xAxisLabels.map(periodo => dataByPeriod[periodo][nome] || 0),
        valueFormatter: (value) => value.toLocaleString('pt-BR'),
      };
    });

    
    chartConfig = {
      xAxis: [{
        data: xAxisLabels,
        scaleType: 'band',
        label: 'Períodos'
      }],
      series: series,
    };
  }


  
  return (
    <div>
      <h2>Resultado em Gráfico</h2>
      {newDataSet.length > 0 ? (
        <BarChart
          {...chartConfig}
          height={400}
          margin={{ top: 60, bottom: 60, left: 80, right: 20 }}
          slotProps={{
            legend: {
              direction: 'row',
              position: { vertical: 'top', horizontal: 'middle' },
              padding: 0,
            },
          }}
        />
      ) : (
        <p>Digite um ou mais nomes e clique em buscar para ver o gráfico.</p>
      )}
    </div>
  );
};

export default ResultComponent;