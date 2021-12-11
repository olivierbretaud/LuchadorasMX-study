/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { useRouter } from 'next/router';
import { MdArticle, MdPerson, MdComment } from 'react-icons/md';
// import Image from 'next/image';
import styles from './tooltip.module.scss';

export default function Tooltip({ data }: {
  data: any;
}): JSX.Element {
  const router = useRouter();
  const { name } = router.query;
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
            <p className={styles.category}>categoría : {data.category}</p>
            {data?.postsCount && <p>{data.postsCount} comentarios</p>}
          </div>
        }
        {data.type === 'author'
          && <div>
                <p className={styles.name}>{name === 'true' ? data.name : data.code }</p>
            <p>
            {data?.gender && <span> Género : {data.gender}<br/></span>}
            {data?.age && <span> Edad : {data.age}<br/></span>}
            {data?.country && <span>País : {data.country}<br/></span>}
            {data?.region && <span>Región : {data.region}<br/></span>}
            </p>

            {data?.ideologies.length > 0
              && <div className={styles.ideologies}>
                <p>Ideologias</p>
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
            <p className={styles.name} style={{ color: data.color || 'transparent' }}>{name === 'true' ? data.author.name : data.author.code }</p>
            {data?.comment && <p>{data.comment}</p>}
            {/* {data?.image && <Image src={data.image} alt="emoticone" layout='fill' />}
            {data?.image && console.log(data?.image)} */}
          </div>
        }
    </div>
  );
}
