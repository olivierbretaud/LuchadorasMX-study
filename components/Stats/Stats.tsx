/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from 'react';
import * as d3 from 'd3';
import { ResponsivePie } from '@nivo/pie';
import { IoClose } from 'react-icons/io5';
import styles from './Stats.module.scss';

interface Stats {
  genders: any[];
}

const Stats = ({ data } : { data: any}): JSX.Element => {
  const [statsIsOpen, setStatsIsOpen] = useState(false);
  const [stats, setStats] = useState<Stats>();

  // function colorScale(value: number, max: number) {
  //   const color = d3.scaleOrdinal() // D3 Version 4
  //     .domain([0, max])
  //     .range(['#FF0000', '#009933']);
  //   return color(value);
  // }

  useEffect(() => {
    if (data?.list && data?.nodes) {
      const authors = data.nodes.filter((n: any) => n.type === 'author');
      const genders : any[] = [];
      data?.list.genders.forEach((g : string) => {
        if (authors.filter((n: any) => n.gender === g)?.length > 0) {
          genders.push({
            id: g,
            label: g,
            value: authors.filter((n: any) => n.gender === g)?.length,
            // color: colorScale(
            //   authors.filter((n: any) => n.gender === g).length,
            //   100,
            // ),
          });
        }
      });
      console.log(genders);
      setStats({
        genders,
      });
    }
  }, [data?.list, data?.nodes]);

  return (
    <>
      <button
        className={styles.toggle}
        type='button'
        onClick={() => setStatsIsOpen(!statsIsOpen)}
        >
        Estadísticas
      </button>
      <div className={`${styles.container} ${statsIsOpen ? styles['is-open'] : ''}`}>
        <div className={styles.close}>
          <button
            onClick={() => setStatsIsOpen(!statsIsOpen)}
            >
              CERCA <IoClose size={22}/>
          </button>
        </div>
        {stats?.genders
          && <div className={styles.pie}>
            <ResponsivePie
              data={stats?.genders}
              margin={{
                top: 20, right: 70, bottom: 0, left: 70,
              }}
              innerRadius={0.8}
              colors={{ scheme: 'purples' }}
              // colors={{ datum: 'data.color' }}
              padAngle={0.7}
              sortByValue={true}
              cornerRadius={0}
              enableArcLinkLabels={false}
              activeOuterRadiusOffset={8}
              borderWidth={0}
              legends={[
                {
                  anchor: 'top-left',
                  direction: 'column',
                  justify: false,
                  translateX: -60,
                  translateY: 0,
                  itemWidth: 100,
                  itemHeight: 20,
                  itemsSpacing: 0,
                  symbolSize: 20,
                  itemDirection: 'left-to-right',
                },
              ]}
            />
          </div>
        }
      </div>
    </>
  );
};

export default Stats;
