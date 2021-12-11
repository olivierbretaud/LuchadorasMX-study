/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { IoClose } from 'react-icons/io5';
import { useRouter } from 'next/router';
import { FacebookProvider, EmbeddedPost } from 'react-facebook';
import { MdPerson } from 'react-icons/md';
import styles from './Panel.module.scss';
import Comment from '../Comment/Comment';

export default function Panel({ post, data, author }: {
  post: any;
  data: any;
  author: any;
}): JSX.Element {
  const router = useRouter();
  const { name } = router.query;

  function back() {
    router.push({
      pathname: '/',
      query: {
        ...router.query,
        author: null,
        post: null,
      },
    });
  }

  return (
    <div className={`${styles.panel} ${post || author ? styles['is-open'] : ''}`}>

      <div className={styles.close} >
        <button
          onClick={() => back()}
          >
            CERCA <IoClose size={22}/>
        </button>
      </div>
      {author?.id
        && <>
          <div className={styles.author}>
           <div className={styles.name}>
             <div className={styles.icon}>
              <MdPerson />
             </div>
            {name === 'true' ? author.name : author.code }
          </div>
          <p>
          {author?.gender && <span> Género : {author.gender}<br/></span>}
          {author?.age && <span> Edad: {author.age}<br/></span>}
          {author?.country && <span>País : {author.country}<br/></span>}
          {author?.region && <span>Región : {author.region}<br/></span>}
          </p>

          {author?.ideologies.length > 0
            && <div className={styles.ideologies}>
              <p>Ideologias</p>
              <div className={styles.list}>
              {author.ideologies.map((y : string, i :number) => <p
                key={author.name + y + i}>
                {y}
              </p>)}
            </div>
          </div>
          }
        </div>
        <div className={styles['comment-list']}>
          {data.nodes?.filter((d: any) => d.type === 'comment').map((c : any) => <Comment key={c.id} comment={c} />)}
        </div>
        </>
      }
      {post?.id
       && <>
          <div className={styles.post}>
          <FacebookProvider appId={process.env.NEXT_PUBLIC_APP_ID}>
            <EmbeddedPost href={`https://www.facebook.com/140301286056129/posts/${post?.id}`} width="380" />
          </FacebookProvider>
        </div>
        {/* <div className={styles['comment-list']}>
          {data.nodes?.filter((d: any) => d.type === 'comment')
            .map((c : any) => <Comment key={c.id} comment={c} />)}
        </div> */}
        </>
      }
    </div>
  );
}
