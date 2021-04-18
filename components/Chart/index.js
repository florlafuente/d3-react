import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import * as d3 from 'd3';

const Wrapper = styled.div`
  margin: 0 auto;
  max-width: 700px;
  text-align: center;
`;

const ChartWrapper = styled.div`
  border: 1px solid gray;
`;

const svg = {
  width: 600,
  height: 500,
  margin: 10,
}

const Chart = ({ data }) => {
  const { width, height, margin } = svg;
  const [state, setState] = useState(null);


  const generateBars = (data) => {
    // Genera escalas para el eje X
    const xExtent = d3.extent(data, d => new Date(d.fecha));
    const xScale = d3.scaleTime()
      .domain(xExtent)
      .range([0, width])
    
    // Genera escalas para eje Y
    // Obtengo el minimo y el maximo de casos x dia
      const [min, max] = d3.extent(data, d => d.casos_fa);  
    // Genero la escala linear
    const yScale = d3.scaleLinear()
      .domain([Math.min(min, 0), max])
      .range([height, 0]);

    return data.map((d) => ({
      x: xScale(new Date(d.fecha)),
      y: yScale(d.casos_fa),
      fill: 'red',
      height: height - yScale(d.casos_fa)
    }));
  }

  useEffect(() => {
    if (data?.length) {
      const bars = generateBars(data);
      setState({
        bars,
      });
    }
    return(() => setState(null));
  }, [data]);


  return (
    <Wrapper>
      <h1>D3 para React devs</h1>
      <h2>Casos COVID x dia CABA</h2>
      <span>Fuente: <a href="https://covidstats.com.ar/" target="_blank">https://covidstats.com.ar/</a></span>

      <ChartWrapper>
        <svg height={height} width={width}>
          <g>
            { state?.bars?.map((bar, i) => (
              <rect key={`chart_bar_${i}`} 
                x={bar.x}
                y={bar.y}
                width={3}
                height={bar.height}
                fill="#4056FF"
              />
            ))}
          </g>
        </svg>
      </ChartWrapper>
    </Wrapper>
  )
};

export default Chart;