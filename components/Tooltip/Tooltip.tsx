/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { MdArticle, MdPerson, MdComment } from 'react-icons/md';
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
        <div className={styles.icon}>
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
            <p className={styles.name}>{data.name}</p>
            <p>
            {data?.gender && <span> Genre : {data.gender}<br/></span>}
            {data?.age && <span> Age : {data.age}<br/></span>}
            {data?.country && <span>Pays : {data.country}<br/></span>}
            {data?.region && <span>Region : {data.region}<br/></span>}
            </p>

            {data?.ideologies.length > 0
              && <div className={styles.ideologies}>
                <p>Idéologies</p>
                <div className={styles.list}>
                {data.ideologies.map((y : string, i :number) => <p
                  key={data.name + y + i}>
                  {y}
                </p>)}
              </div>
            </div>
            }
          </div>
        }
        {data.type === 'comment'
          && <div>
            <p className={styles.name} style={{ color: data.color || 'transparent' }}>{data.author.name}</p>
            {data?.comment && <p>{data.comment}</p>}
          </div>
        }
    </div>
  );
}
