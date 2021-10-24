/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { IoClose } from 'react-icons/io5';
import Link from 'next/link';
import { FacebookProvider, EmbeddedPost, Comments } from 'react-facebook';
import styles from './Panel.module.scss';
import Comment from '../Comment/Comment';

export default function Panel({ post, data }: {
  post: any;
  data: any;
}): JSX.Element {
  console.log(data);
  return (
    <div className={`${styles.panel} ${post ? styles['is-open'] : ''}`}>

      <div className={styles.close} >
        <Link href="/">
          <a >
            FERMER <IoClose size={22}/>
          </a>
        </Link>
      </div>
      {post?.id
       && <>
          <div className={styles.post}>
          <FacebookProvider appId="406497424294475">
            <EmbeddedPost href={`https://www.facebook.com/140301286056129/posts/${post?.id}`} width="380" />
            <Comments href={'https://www.facebook.com/LuchadorasMX/videos/617679528920076/?comment_id=2719824454941168'} width="380" />
          </FacebookProvider>
        </div>
        <div className={styles['comment-list']}>
          {data.nodes?.filter((d: any) => d.type === 'comment').map((c : any) => <Comment key={c.id} comment={c} />)}
        </div>
        </>
      }
    </div>
  );
}
