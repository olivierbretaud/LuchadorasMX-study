/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useRef } from 'react';
import { IoChevronDownSharp } from 'react-icons/io5';
import styles from './Comment.module.scss';

const Comment = ({ comment } : { comment: any }): JSX.Element => {
  const [detailIsOpen, setDetailIsOpen] = useState(false);
  const contentRef = useRef<HTMLDivElement | null>(null);
  return (
  <div className={styles.container}>
    <p>{comment.comment}</p>
    <div className={styles.author}>
          {comment?.ideologies.length > 0
            ? <div className={styles.ideologies}>
              <div className={styles.list}>
              {comment.author.ideologies.map((y : string, i :number) => <p
                key={comment.author.name + y + i}>
                {y}
              </p>)}
            </div>
          </div>
            : <div>
          </div>
          }
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
          <p className={styles.name}>
            {comment.author.name}
          </p>
          <p>
          {comment.author?.gender && <span> Genre : {comment.author.gender}<br/></span>}
          {comment.author?.age && <span> Age : {comment.author.age}<br/></span>}
          {comment.author?.country && <span>Pays : {comment.author.country}<br/></span>}
          {comment.author?.region && <span>Region : {comment.author.region}<br/></span>}
          </p>

          {comment.author?.ideologies.length > 0
            && <div className={styles.ideologies}>
              <p>Idéologies</p>
              <div className={styles.list}>
              {comment.author.ideologies.map((y : string, i :number) => <p
                key={comment.author.name + y + i}>
                {y}
              </p>)}
            </div>
          </div>
          }
        </div>
    </div>
  </div>
  );
};

export default Comment;
