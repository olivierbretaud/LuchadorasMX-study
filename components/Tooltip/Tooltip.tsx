/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { MdArticle, MdPerson, MdComment } from 'react-icons/md';
import styles from './tooltip.module.scss';

export default function Tooltip({ data }: {
  data: any;
}): JSX.Element {
  console.log(styles[data.type]);
  return (
    <div
      className={`${styles.tooltip} ${data.type ? styles[data.type] : ''}`}
      style={{
        left: data.x,
        top: data.y,
        opacity: data.size ? 1 : 0,
      }}>
        <div className={styles.icon} style={{ backgroundColor: data.color || 'transparent' }}>
          {data.type === 'post' && <MdArticle />}
          {data.type === 'comment' && <MdComment />}
          {data.type === 'author' && <MdPerson />}
        </div>
        {data.type === 'post'
          && <div>
            <p className={styles.category}>category : {data.category}</p>
            {data?.postsCount && <p>{data.postsCount} comments</p>}
          </div>
        }
        {data.type === 'author'
          && <div>
            <p className={styles.name} style={{ color: data.color || 'transparent' }}>{data.name}</p>
            <p>
            {data?.gender && <span> Genre : {data.gender}<br/></span>}
            {data?.age && <span> Age : {data.age}<br/></span>}
            {data?.country && <span>Pays : {data.country}<br/></span>}
            {data?.region && <span>Region : {data.region}<br/></span>}
            {/* {data?.ideologies.length > 0
              && <div className={styles.list}>
              {data.ideologies.map((y : string, i :number) => <p
                className={styles.ideology}
                key={data.name + y + i}>
                {y}
              </p>)}
            </div>
            } */}
            </p>
          </div>
        }
        {data.type === 'comment'
          && <div>
            <p className={styles.name}>{data.author}</p>
            {data?.comment && <p>{data.comment}</p>}
          </div>
        }
    </div>
  );
}
