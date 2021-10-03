/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import styles from './tooltip.module.scss';

export default function Tooltip({ data }: {
  data: any;
}): JSX.Element {
  return (
    <div
      className={`${styles.tooltip} ${data.type ? styles[data.type] : ''}`}
      style={{
        left: data.x,
        top: data.y,
        opacity: data.size ? 1 : 0,
      }}>
        {data.type === 'post'
          && <p>
            <span className={styles.code}>{data.type} - {data.category}</span><br/>
            {data?.postsCount && <span>{data.postsCount} comments</span>}
          </p>
        }
        {data.type === 'comment'
          && <p>
            <span className={styles.code}>{data.type} - {data.category}</span><br/>
            {data?.Comment && <span>{data.Comment}</span>}
          </p>
        }
    </div>
  );
}
