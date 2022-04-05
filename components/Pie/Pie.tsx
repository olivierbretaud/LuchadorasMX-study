/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { ResponsivePie } from '@nivo/pie';
import styles from './Pie.module.scss';

const Pie = ({ data } : { data: any}): JSX.Element => (
    <>
        {data.length > 0
          ? <div className={styles.pie}>
            <ResponsivePie
              data={data}
              margin={{
                top: 20, right: 24, bottom: 20, left: 24,
              }}
              innerRadius={0.75}
              colors={{ datum: 'data.color' }}
              padAngle={0.2}
              sortByValue={true}
              cornerRadius={0}
              arcLabel={(d:any) => (data.slice(0, 2).find((l: any) => l.id === d.id) ? `${d.id}` : '')}
              enableArcLinkLabels={false}
              activeOuterRadiusOffset={8}
              arcLabelsTextColor={'#bfaaed'}
              borderWidth={0}
              // legends={[
              //   {
              //     anchor: 'top-left',
              //     direction: 'column',
              //     justify: false,
              //     translateX: -60,
              //     translateY: 0,
              //     itemWidth: 100,
              //     itemHeight: 20,
              //     itemsSpacing: 0,
              //     symbolSize: 20,
              //     itemDirection: 'left-to-right',
              //   },
              // ]}
            />
          </div>
          : <div className={styles.pie}>
            <p>No se han encontrado datos</p>
          </div>
        }
    </>
);

export default Pie;
