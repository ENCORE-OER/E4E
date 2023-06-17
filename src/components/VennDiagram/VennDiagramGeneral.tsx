import { Box } from '@chakra-ui/react';
import { select } from 'd3';
import { useEffect, useRef } from 'react';

interface VennDiagramProps {
  data: number[];
  width: number;
  height: number;
}

const VennDiagram: React.FC<VennDiagramProps> = ({ data, width, height }) => {
  const chartRef = useRef<SVGSVGElement | null>(null);

  useEffect(() => {
    if (chartRef.current) {
      const svg = select(chartRef.current);

      // Dimensioni e posizioni dei cerchi
      const circle1 = { x: width / 2 - 100, y: height / 2, radius: 80 };
      const circle2 = { x: width / 2 + 100, y: height / 2, radius: 80 };
      const circle3 = { x: width / 2, y: height / 2 - 120, radius: 80 };

      // Disegno dei cerchi
      svg
        .append('circle')
        .attr('cx', circle1.x)
        .attr('cy', circle1.y)
        .attr('r', circle1.radius)
        .style('fill', 'red');

      svg
        .append('circle')
        .attr('cx', circle2.x)
        .attr('cy', circle2.y)
        .attr('r', circle2.radius)
        .style('fill', 'green');

      svg
        .append('circle')
        .attr('cx', circle3.x)
        .attr('cy', circle3.y)
        .attr('r', circle3.radius)
        .style('fill', 'blue');

      // Disegno delle intersezioni
      const intersection1 = getIntersection(circle1, circle2);
      const intersection2 = getIntersection(circle1, circle3);
      const intersection3 = getIntersection(circle2, circle3);
      const intersection123 = getIntersection(intersection1, circle3);

      svg
        .append('path')
        .attr(
          'd',
          getPathData(
            intersection1,
            intersection123,
            intersection2,
            circle3.radius
          )
        )
        .style('fill', 'purple');

      svg
        .append('path')
        .attr(
          'd',
          getPathData(
            intersection2,
            intersection123,
            intersection3,
            circle3.radius
          )
        )
        .style('fill', 'orange');

      svg
        .append('path')
        .attr(
          'd',
          getPathData(
            intersection1,
            intersection123,
            intersection3,
            circle3.radius
          )
        )
        .style('fill', 'cyan');

      svg
        .append('path')
        .attr(
          'd',
          getPathData(
            intersection1,
            intersection2,
            intersection3,
            circle3.radius
          )
        )
        .style('fill', 'yellow');

      // Aggiunta delle etichette
      svg
        .append('text')
        .attr('x', circle1.x)
        .attr('y', circle1.y)
        .attr('dy', '0.35em')
        .attr('text-anchor', 'middle')
        .style('fill', 'white')
        .text('Set 1');

      svg
        .append('text')
        .attr('x', circle2.x)
        .attr('y', circle2.y)
        .attr('dy', '0.35em')
        .attr('text-anchor', 'middle')
        .style('fill', 'white')
        .text('Set 2');

      svg
        .append('text')
        .attr('x', circle3.x)
        .attr('y', circle3.y)
        .attr('dy', '0.35em')
        .attr('text-anchor', 'middle')
        .style('fill', 'white')
        .text('Set 3');
    }
  }, [data]);

  // Funzione per calcolare l'intersezione tra due cerchi
  const getIntersection = (circle1: any, circle2: any) => {
    const d = Math.sqrt(
      (circle2.x - circle1.x) ** 2 + (circle2.y - circle1.y) ** 2
    );
    const a = (circle1.radius ** 2 - circle2.radius ** 2 + d ** 2) / (2 * d);
    const h = Math.sqrt(circle1.radius ** 2 - a ** 2);
    const x = circle1.x + (a * (circle2.x - circle1.x)) / d;
    const y = circle1.y + (a * (circle2.y - circle1.y)) / d;
    const intersectionX1 = x + (h * (circle2.y - circle1.y)) / d;
    const intersectionY1 = y - (h * (circle2.x - circle1.x)) / d;
    const intersectionX2 = x - (h * (circle2.y - circle1.y)) / d;
    const intersectionY2 = y + (h * (circle2.x - circle1.x)) / d;
    return {
      x1: intersectionX1,
      y1: intersectionY1,
      x2: intersectionX2,
      y2: intersectionY2,
    };
  };

  // Funzione per ottenere il percorso SVG per disegnare un'intersezione
  const getPathData = (p1: any, p2: any, p3: any, radius: number) => {
    return `M ${p1.x1},${p1.y1} L ${p2.x1},${p2.y1} A ${radius},${radius} 0 0,1 ${p3.x1},${p3.y1} Z`;
  };

  return (
    <Box
      ref={chartRef as React.RefObject<HTMLDivElement>}
      width={width}
      height={height}
    />
  );
};

export default VennDiagram;
