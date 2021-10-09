/* eslint-disable @typescript-eslint/no-explicit-any */
import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { useEffect, useState } from 'react';
import Nodes from '../components/Nodes/Nodes';
import dataSet from '../constants/data.json';
import styles from '../styles/Home.module.scss';
import Panel from '../components/Panel/Panel';

const Home: NextPage = () => {
  const [filteredDatas, setFilteredData] = useState();
  const router = useRouter();
  const { post } = router.query;

  const data : any = dataSet;
  const postData = data.nodes?.find((n : any) => n.id === post);

  useEffect(() => {
    if (!data.nodes) return;
    const filtered = { ...data };
    if (post) {
      filtered.nodes = filtered.nodes.filter((n : any) => n.id === post
      || n.post === post
      || n?.posts?.find((p :string) => p === post));

      filtered.links = filtered.links?.filter((l : any) => l?.post === post || l.source === post);
    } else {
      filtered.nodes = filtered.nodes.filter((n :any) => n.type !== 'comment');
      filtered.links = filtered.links.filter((n :any) => n.type === 'post');
    }

    setFilteredData(filtered);
  }, [data, post]);

  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={`${styles.main} ${postData ? styles['panel-is-active'] : ''}`}>
        {filteredDatas
          && <Nodes
              post={post}
              data={filteredDatas}
            />
        }
      </main>
      <Panel post={postData} />

    </div>
  );
};

export default Home;
