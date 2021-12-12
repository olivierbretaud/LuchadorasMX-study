/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useRef } from 'react';
import { MdArticle } from 'react-icons/md';
import { format } from 'date-fns';
import { IoChevronDownSharp } from 'react-icons/io5';
import { EmbeddedPost } from 'react-facebook';
import styles from './Post.module.scss';

const Post = ({ comments, post } : { comments: any, post: any }): JSX.Element => {
  const [detailIsOpen, setDetailIsOpen] = useState(false);
  const contentRef = useRef<HTMLDivElement | null>(null);
  const commentsList = comments?.sort((a : any, b: any) => {
    const aDate : any = new Date(a.date);
    const bDate : any = new Date(b.date);
    return bDate - aDate;
  });
  console.log(comments);
  return (
  <div className={styles.container}>
    <div className={styles.head}>
      <div className={styles.category}>
        <div className={styles.icon}>
          <MdArticle />
        </div>
        {post.category}
      </div>
      <button
        onClick={() => setDetailIsOpen(!detailIsOpen)}
        >
        <IoChevronDownSharp size={20}/>
      </button>
    </div>
    <div className={styles.panel}
      style={{
        height: detailIsOpen && contentRef.current ? contentRef.current?.clientHeight : 0,
      }}>
      <div className={styles.content} ref={contentRef}>
        <EmbeddedPost href={`https://www.facebook.com/140301286056129/posts/${post._id}`} width="380" />
      </div>
    </div>
    {commentsList?.map((c: any) => <div
      className={styles.comment}
      key={c.id}>
      <p className={styles.date}>{c.date && format(new Date(c.date), 'dd/MM/yyyy')}</p>
      <p>{c.comment || 'commantary vacío'}</p>
    </div>)}
  </div>
  );
};

export default Post;
