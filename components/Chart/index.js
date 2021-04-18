import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import * as d3 from 'd3';
import useMousePosition from '../../hooks/useMousePosition';

const Wrapper = styled.div`
  margin: 0 auto;
  max-width: 700px;
  text-align: center;
`;

const ChartWrapper = styled.div`
  border: 1px solid gray;
  margin-top: 10px;
`;

const Rect = styled.rect`
  fill: #4056FF;
`;

const Tooltip = styled.div`
  background-color: black;
  border-radius: 5px;
  color: white;
  font-size: 12px;
  text-align: center;
  position: absolute;
  top: ${({ y }) => `${y}px`};
  left: ${({ x }) => `${x + 20}px`};
  padding: 0.5em;
`;

const svg = {
  width: 600,
  height: 500,
  margin: 10,
}

const Chart = ({ data }) => {
  const { width, height, margin } = svg;
  const { x, y } = useMousePosition();
  const [bars, setBars] = useState(null);
  const [active, setActive] = useState(null);


  const generateBars = (data) => {
    // Genera escalas para el eje X
    const xExtent = d3.extent(data, d => new Date(d.fecha));
    const xScale = d3.scaleTime()
      .domain(xExtent)
      .range([0, width])
    
    // Genera escalas para eje Y
    // Obtengo el minimo y el maximo de casos x dia
      const [min, max] = d3.extent(data, d => d.casos_dx);  
    // Genero la escala linear
    const yScale = d3.scaleLinear()
      .domain([Math.min(min, 0), max])
      .range([height, 0]);

    return data.map((d) => ({
      x: xScale(new Date(d.fecha)),
      y: yScale(d.casos_dx),
      fill: 'red',
      height: height - yScale(d.casos_dx),
      fecha: d.fecha,
      casos: d.casos_dx,
    }));
  };

  const handleMouseEnter = (bar) => {
    setActive(bar);
  };

  useEffect(() => {
    if (data?.length) {
      const bars = generateBars(data);
      setBars(bars);
    }
    return(() => setBars(null));
  }, [data]);


  return (
    <Wrapper>
      <h1>D3 para React devs</h1>
      <h2>Casos diarios de COVID-19 en CABA</h2>
      <span>Fuente: <a href="https://covidstats.com.ar/" target="_blank">https://covidstats.com.ar/</a></span>

      <ChartWrapper>
        <svg height={height} width={width}>
          <g>
            { bars?.map((bar, i) => (
              <Rect key={`chart_bar_${i}`} 
                x={bar.x}
                y={bar.y}
                width={4}
                height={bar.height}
                onMouseEnter={() => handleMouseEnter(bar)}
                onMouseLeave={() => setActive(null)}
              />
            ))}
          </g>
        </svg>
        { active
          ? <Tooltip x={x} y={y}>
            {`Fecha: ${active.fecha}`} <br/>
            {`Casos: ${active.casos}`}
            </Tooltip>
          : null
        }
      </ChartWrapper>
    </Wrapper>
  )
};

export default Chart;