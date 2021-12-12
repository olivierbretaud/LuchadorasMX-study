/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { IoClose } from 'react-icons/io5';
import { useRouter } from 'next/router';
import { FacebookProvider, EmbeddedPost } from 'react-facebook';
import { MdArticle, MdPerson } from 'react-icons/md';
import styles from './Panel.module.scss';
import Post from '../Post/Post';

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

      <div className={styles.close}>
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
            {author?.banner !== 'S/I' && <span className={styles.label}>Bandera : {author.banner}<br/><br/></span>}
            {author?.gender && <span>
                <span className={styles.label}>Género :</span> {author.gender}<br/>
              </span>
            }
            {author?.age && <span>
                <span className={styles.label}>Edad :</span> {author.age}<br/>
              </span>
            }
            {author?.country && <span>
                <span className={styles.label}>País :</span> {author.country}<br/>
              </span>
            }
            {author?.region && <span>
                <span className={styles.label}>Región :</span> {author.region}<br/>
              </span>
            }
            {author?.study !== 'S/I' && <span>
              <span className={styles.label}>Estudios :</span> {author.study}<br/>
            </span>}
            {author?.job !== 'S/I' && <span>
              <span className={styles.label}>Profession :</span> {author.job}<br/>
            </span>}
          </p>
          {author?.ideologies.length > 0
            && <div className={styles.ideologies}>
              <p className={styles.label}>Ideologias</p>
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
            {data.nodes?.filter((d: any) => d.type === 'post').map((p : any) => <Post
              key={p.id}
              comments={data.nodes?.filter((c: any) => c.type === 'comment' && c.post === p.id)}
              post={p}
            />)}
          </div>
        </>
      }
      {post?.id
       && <>
          <div className={styles.post}>
            <div className={styles.name}>
              <div className={styles.icon}>
                <MdArticle />
              </div>
              {post.category}
            </div>
          <div className={styles.iframe}>
            <FacebookProvider appId={process.env.NEXT_PUBLIC_APP_ID}>
              <EmbeddedPost href={`https://www.facebook.com/140301286056129/posts/${post?.id}`} width="380" />
            </FacebookProvider>
          </div>
        </div>
        </>
      }
    </div>
  );
}
