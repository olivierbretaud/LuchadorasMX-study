/* eslint-disable no-param-reassign */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useRef, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { SimulationNodeDatum, SimulationLinkDatum } from 'd3-force';
import * as d3 from 'd3';
import { cloneDeep } from 'lodash';
import useWindowSize from '../../utils/useWindowSize';
import { hexToRgba } from '../../utils/utils';
import Tooltip from '../Tooltip/Tooltip';
import styles from './Nodes.module.scss';

type DatavizProps = {
  data: any,
  post: any,
}

export default function Nodes({ data, post }: DatavizProps): JSX.Element {
  const graphContainer = useRef(null);
  const router = useRouter();
  const [width, height] = useWindowSize();
  const [tooltipData, setTooltipData] = useState({ x: width / 2, y: height / 2 });

  useEffect(() => {
    const currentGraph = graphContainer.current;
    return () => {
      d3.select(currentGraph).select('canvas').remove();
    };
    // eslint-disable-next-line
  },[]);

  useEffect(() => {
    if (data) {
      const dataset = cloneDeep(data);
      initGraph(dataset);
    }
    // eslint-disable-next-line
  },[data ,width , height]);

  function initGraph(initData: any) {
    const tempData = { ...initData };
    const dpr = window.devicePixelRatio || 1;
    const heightDpr = height * dpr;
    const widthDpr = width * dpr;

    if (d3.select(graphContainer.current).select('canvas')) d3.select(graphContainer.current).select('canvas').remove();

    const graphCanvas : HTMLCanvasElement | null = d3.select(graphContainer.current).append('canvas')
      .classed('graphCanvas', true)
      .attr('id', 'canvas')
      .attr('width', `${widthDpr}px`)
      .attr('height', `${heightDpr}px`)
      .node();

    const context : CanvasRenderingContext2D | null | undefined = graphCanvas?.getContext('2d');

    context?.scale(dpr, dpr);

    const simulation = d3.forceSimulation<
      SimulationNodeDatum,
      SimulationLinkDatum<SimulationNodeDatum>
      >()
      .force('center', d3.forceCenter((widthDpr / 2) / dpr, ((heightDpr / 2) / dpr) - 30))
      .force('x', d3.forceX(widthDpr / 2).strength(0.1))
      .force('y', d3.forceY(heightDpr / 2).strength(0.1))
      .force('charge', d3.forceManyBody().strength(post ? -290 : -100))
      .force('link', d3.forceLink().id((d :any) => d.id).distance((link: any) => {
        console.log(link);
        if (link.source.type === 'post') return 50;
        if (link.target.type === 'comment') return 2;
        return 5;
      }).strength(0.6))
      .force('collision', d3.forceCollide().strength(0.1).radius((d :any) => {
        if (!post) return d.size * 1.2;
        if (post && d.type === 'post') return 50;
        return d.size * 1.2;
      }))
      .alphaTarget(0)
      .alphaDecay(0.05);
      // .force('center', d3.forceCenter((widthDpr / 2) / dpr, ((heightDpr / 2) / dpr)))
      // .force('x', d3.forceX((widthDpr / 2) / dpr).strength(0.4))
      // .force('y', d3.forceY((heightDpr / 2) / dpr).strength(0.4))
      // .force('charge', d3.forceManyBody().strength(-55))
      // .force('link', d3.forceLink().id((d : any) => d.id))
      // .force('collision', d3.forceCollide(12).strength(1).radius((d :any) => d.size * 1.4))
      // .alphaTarget(0)
      // .alphaDecay(0.05);

    let transform = d3.zoomIdentity;

    function zoomed(event : any) {
      transform = event.transform;
      simulationUpdate();
    }

    d3.select(graphCanvas)
      .call(d3.drag()
        .subject(dragsubject)
        .on('start', dragstarted)
        .on('drag', dragged)
        .on('end', dragended))
      .call(d3.zoom().scaleExtent([1 / 10, 8]).on('zoom', zoomed));

    function dragsubject(event : any) : any {
      let i;
      const x = transform.invertX(event.x);
      const y = transform.invertY(event.y);
      let dx;
      let dy;

      for (i = tempData.nodes.length - 1; i >= 0; --i) {
        const node = tempData.nodes[i];
        dx = x - node.x;
        dy = y - node.y;

        if (dx * dx + dy * dy < node.size * node.size) {
          node.x = transform.applyX(node.x);
          node.y = transform.applyY(node.y);

          return node;
        }
      }
      return null;
    }

    function dragstarted(event : any) {
      if (!event.active) simulation.alphaTarget(0.3).restart();
      event.subject.fx = transform.invertX(event.x);
      event.subject.fy = transform.invertY(event.y);
    }

    function dragged(event : any) {
      event.subject.fx = transform.invertX(event.x);
      event.subject.fy = transform.invertY(event.y);
    }

    function dragended(event : any) {
      if (!event.active) simulation.alphaTarget(0);
      event.subject.fx = null;
      event.subject.fy = null;
    }

    simulation.nodes(tempData.nodes)
      .on('tick', () => window.requestAnimationFrame(simulationUpdate));

    simulation.force('link').links(tempData.links).strength(1);

    let closeNode : SimulationNodeDatum | null | undefined | any;

    function simulationUpdate() {
      if (!context) return;
      context.save();
      context.clearRect(0, 0, widthDpr, heightDpr);
      context.translate(transform.x, transform.y);
      context.scale(transform.k, transform.k);

      tempData.links.forEach((d : any) => {
        context.beginPath();
        context.moveTo(d.source.x, d.source.y);
        context.lineTo(d.target.x, d.target.y);
        context.lineWidth = 1.5 / transform.k;
        context.strokeStyle = hexToRgba(d.color, 0.2);
        context.stroke();
      });

      tempData.nodes.forEach((d : any) => {
        context.beginPath();
        context.arc(d.x, d.y, d.size, 0, 2 * Math.PI, true);
        context.fillStyle = d.color;
        context.strokeStyle = 'rgba(0, 0, 0, 1)';
        context.fill();
      });

      if (closeNode) {
        d3.select(`.${styles.graph}`).style('cursor', 'pointer');
        context.beginPath();
        context.arc(closeNode.x, closeNode.y, closeNode.size + 2, 0, 2 * Math.PI, true);
        context.strokeStyle = hexToRgba(closeNode.color, 0.4);
        context.lineWidth = 6;
        context.stroke();
      } else {
        d3.select(`.${styles.graph}`).style('cursor', 'auto');
      }

      context.restore();
    }

    d3.select(graphCanvas)
      .on('click', (event : any) => {
        event.preventDefault();
        event.stopPropagation();
        closeNode = foundNode(event) ? foundNode(event) : null;
        if (closeNode?.type === 'post') {
          router.push(`/?post=${closeNode.id}`);
        }
        simulationUpdate();
      })
      .on('mousemove', (event) => {
        event.preventDefault();
        event.stopPropagation();
        closeNode = foundNode(event) ? foundNode(event) : null;
        if (closeNode) {
          setTooltipData({ ...closeNode, x: event.x - 100, y: event.y + 40 });
        } else {
          setTooltipData({ x: event.x - 100, y: event.y + 40 });
        }
        simulationUpdate();
      });

    function foundNode(event : any) {
      const posX = (event.x - transform.x) / transform.k;
      const posY = (event.y - transform.y) / transform.k;
      return simulation.find(posX, posY, 10);
    }
  }

  return (
    <div ref={graphContainer} className={styles.graph}>
      <Tooltip data={tooltipData} />
    </div>
  );
}
