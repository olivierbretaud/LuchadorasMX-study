/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect } from 'react';
import styles from './Panel.module.scss';

export default function Panel({ post }: {
  post: any;
}): JSX.Element {
  return (
    <div className={`${styles.panel} ${post ? styles['is-open'] : ''}`}>
      {post?.id
       && <div className={styles.post}>
        <iframe
        id={'iframe'}
        src={`https://www.facebook.com/plugins/post.php?href=https%3A%2F%2Fwww.facebook.com%2F140301286056129%2Fposts%2F${post.id}%2F&width=380&show_text=true&height=200&appId`}
        width="380" style={{ border: 'none', overflow: 'hidden' }} frameBorder="0" scrolling="yes" allowFullScreen={true} allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"></iframe>
      </div>
      }
      </div>
  );
}
