/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect } from 'react';
import * as d3 from 'd3';
import { Simulation, SimulationNodeDatum } from 'd3-force';
import styles from './Dataviz.module.scss';
import useWindowSize from '../../utils/useWindowSize';

type DatavizProps = {
  data: any,
}

const Dataviz = ({ data }: DatavizProps): JSX.Element => {
  console.log(data);
  const [width, height] = useWindowSize();

  const simulation : Simulation<SimulationNodeDatum, undefined> = d3.forceSimulation()
    .force('link', d3.forceLink()
      .id((d: any) => d.id))
    .force('charge', d3.forceManyBody().strength(3))
    .force('center', d3.forceCenter(width, height));

  function drawNodes(initData : any) {
    const dataset = { ...initData };
    d3.select('#graph').selectAll('.link').remove();
    d3.select('#container').selectAll(`.${styles.node}`).remove();

    d3.select('#graph').selectAll('.link')
      .data(dataset.links, (link: any) => link._id)
      .join(
        (enter) => (
          enter.append('line')
            .attr('class', 'link')
            .attr('id', (d : any) => d._id)
            .attr('stroke-width', 1)
            .attr('stroke', 'red')
        ),
        (update) => (
          update.exit().remove()
        ),
        (exit) => (
          exit.exit().remove()
        ),
      );

    const createNodes = d3.select('#container').selectAll(`.${styles.node}`)
      .data(dataset.nodes, (node : any) => node._id)
      .join(
        (enter) => (
          enter.append('div')
            .attr('id', (d: any) => d._id)
            .attr('class', `${styles.node}`)
        ),
        (update) => (
          update.exit()
            .remove()
        ),
        (exit) => (
          exit.exit()
            .remove()
        ),
      );

    createNodes.append('div')
      .attr('class', `${styles.border}`)
      .style('border', (d: any) => `1px solid ${d.color}`);

    simulation
      .nodes(dataset.nodes);
    if (!dataset.links.length) {
      return;
    }

    // simulation.force('link')
    //   .links(dataset.links);

    const numberOfTicks = Math.ceil(Math.log(simulation.alphaMin())
      / Math.log(1 - simulation.alphaDecay()));
    for (let i = 0, n = numberOfTicks; i < n; ++i) {
      simulation.tick();
    }

    updateGraph();
  }

  useEffect(() => {
    drawNodes(data);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, height, width]);

  function updateGraph() {
    const container = d3.select('#container');

    container.selectAll(`.${styles.node}`)
      .style('transform', `translate(${width / 2}px,${height / 2}px) scale(0)`)
      .style('opacity', 0)
      .transition()
      .delay((d, i) => i * 50)
      .duration(300)
      .style('opacity', 1)
      .style('transform', (d : any) => `translate(${d.x}px,${d.y}px) scale(1)`);

    const graph = d3.select('#graph');

    graph.selectAll('.link')
      .style('opacity', 0)
      .attr('x1', width / 2)
      .attr('y1', height / 2)
      .attr('x2', width / 2)
      .attr('y2', height / 2)
      .transition()
      .delay((d, i) => 250 + i * 50)
      .duration(300)
      .style('opacity', 1)
      .attr('x1', (d: any) => d.source.x)
      .attr('y1', (d: any) => d.source.y)
      .attr('x2', (d: any) => d.target.x)
      .attr('y2', (d: any) => d.target.y);
  }

  return (
    <div id='container' className={styles.container}>
      <svg width={width} height={height}>
        <g id='graph' ></g>
      </svg>
    </div>
  );
};

export default Dataviz;
