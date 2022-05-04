/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { useRouter } from 'next/router';
import { MdArticle, MdPerson, MdComment } from 'react-icons/md';
// import Image from 'next/image';
import styles from './tooltip.module.scss';

type DateTimeFormatOptions = {
  weekday: string;
  year: string;
  month: string;
  day: string;
}

export default function Tooltip({ data }: {
  data: any;
}): JSX.Element {
  const router = useRouter();
  const { name } = router.query;
  const dateOptions : any = {
    year: 'numeric', month: '2-digit', day: '2-digit',
  };
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
            {data.date && <p>{Intl.DateTimeFormat('es', dateOptions).format(new Date(data.date))}</p>}
            {data?.postsCount && <p>{data.postsCount} comentarios</p>}
          </div>
        }
        {data.type === 'author'
          && <div>
                <p className={styles.name}>{name === 'true' ? data.name : data.code }</p>
            <p>
              {data?.banner !== 'S/I' && <span className={styles.label}>Bandera : {data.banner}<br/><br/></span>}
              {data?.gender && <span>
                  <span className={styles.label}>Género :</span> {data.gender}<br/>
                </span>
              }
              {data?.age && <span>
                  <span className={styles.label}>Edad :</span> {data.age}<br/>
                </span>
              }
              {data?.country && <span>
                  <span className={styles.label}>País :</span> {data.country}<br/>
                </span>
              }
              {data?.region && <span>
                  <span className={styles.label}>Región :</span> {data.region}<br/>
                </span>
              }
              {data?.study !== 'S/I' && <span>
                <span className={styles.label}>Estudios :</span> {data.study}<br/>
              </span>}
              {data?.job !== 'S/I' && <span>
                <span className={styles.label}>Profession :</span> {data.job}<br/>
              </span>}
            </p>

            {data?.ideologies.length > 0
              && <div className={styles.ideologies}>
                <p className={styles.label}>Ideologias</p>
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
            {data.date && <p>{Intl.DateTimeFormat('es', dateOptions).format(new Date(data.date))}</p>}
            {data?.comment && <p>{data.comment}</p>}
            {/* {data?.image && <Image src={data.image} alt="emoticone" layout='fill' />}
            {data?.image && console.log(data?.image)} */}
          </div>
        }
    </div>
  );
}
