/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { FacebookProvider, EmbeddedPost } from 'react-facebook';
import styles from './Panel.module.scss';

export default function Panel({ post }: {
  post: any;
}): JSX.Element {
  return (
    <div className={`${styles.panel} ${post ? styles['is-open'] : ''}`}>
      {post?.id
       && <div className={styles.post}>
          <FacebookProvider appId="406497424294475">
            <EmbeddedPost href={`https://www.facebook.com/140301286056129/posts/${post?.id}`} width="380" />
          </FacebookProvider>
        </div>
      }
    </div>
  );
}
