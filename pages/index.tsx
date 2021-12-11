/* eslint-disable @typescript-eslint/no-explicit-any */
import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { useEffect, useState } from 'react';
import Nodes from '../components/Nodes/Nodes';
import dataSet from '../constants/data.json';
import styles from '../styles/Home.module.scss';
import Panel from '../components/Panel/Panel';
import Filters from '../components/Filters/Filters';

const Home: NextPage = () => {
  const [filteredDatas, setFilteredData] = useState();
  const router = useRouter();
  const {
    post, author, ideologies, ages, countries, genders, name,
  } = router.query;

  const data : any = dataSet;
  const postData = data.nodes?.find((n : any) => n.id === post);
  const authorData = data.nodes?.find((n : any) => n.id === author);

  function handleChangeQuery(key :string, value:string): void {
    const updatedQuery: any = {
      ideologies: router.query?.ideologies?.toString().split(',') || [],
      ages: router.query?.ages?.toString().split(',') || [],
      countries: router.query?.countries?.toString().split(',') || [],
      genders: router.query?.genders?.toString().split(',') || [],
    };

    if (updatedQuery[key].find((d:string) => d === value)) {
      updatedQuery[key] = updatedQuery[key].filter((d:string) => d !== value);
    } else {
      updatedQuery[key].push(value);
    }
    router.push({
      pathname: '/',
      query: {
        ideologies: updatedQuery.ideologies.join(','),
        ages: updatedQuery.ages.join(',') || null,
        countries: updatedQuery.countries.join(',') || null,
        genders: updatedQuery.genders.join(',') || null,
        post: post || null,
        author: author || null,
        name: name === 'true' ? 'true' : null,
      },
    });
  }

  useEffect(() => {
    if (!data.nodes) return;
    const filtered = { ...data };

    const selectedIdeologies : string[] = ideologies?.toString().split(',').filter((l :string) => l !== '') || [];
    const selectedAges : string[] | null = ages?.toString().split(',').filter((l :string) => l !== '') || [];
    const selectedGenders : string[] | null = genders?.toString().split(',').filter((l :string) => l !== '') || [];
    const selectedCountries : string[] | null = countries?.toString().split(',').filter((l :string) => l !== '') || [];
    if (selectedIdeologies?.length
      || selectedAges?.length
      || selectedGenders?.length
      || selectedCountries?.length) {
      let authors = [...filtered.nodes.filter((a:any) => a.type === 'author')];

      if (selectedIdeologies?.length) {
        authors = authors.filter((a : any) => {
          if (a.ideologies?.find((d :string) => selectedIdeologies?.find((s) => s === d))) {
            return a;
          }
          return null;
        });
      }

      if (selectedAges?.length) {
        authors = authors.filter((a : any) => {
          if (selectedAges?.find((s) => s === a.age)) {
            return a;
          }
          return null;
        });
      }

      if (selectedCountries?.length) {
        authors = authors.filter((a : any) => {
          if (selectedCountries?.find((s) => s === a.country)) {
            return a;
          }
          return null;
        });
      }

      if (selectedGenders?.length) {
        authors = authors.filter((a : any) => {
          if (selectedGenders?.find((s) => s === a.gender)) {
            return a;
          }
          return null;
        });
      }

      filtered.links = filtered.links.filter((n :any) => n.type !== 'author').filter((l :any) => {
        if (authors.find((n :any) => n.id === l.target || n.id === l?.author)) {
          return l;
        }
        return null;
      });

      filtered.nodes = filtered.nodes.filter(
        (n: any) => filtered.links.find((l: any) => n.id === l.target || l.source === n.id),
      );
    }
    if (post) {
      filtered.nodes = filtered.nodes.filter((n : any) => n.post === post
      || n?.posts?.find((p :string) => p === post));

      filtered.links = filtered.links?.filter((l : any) => l?.post === post);
    } else if (author) {
      filtered.nodes = filtered.nodes.filter(
        (n : any) => n?.author?.id === author
        || n.id === author
        || n?.authors?.find((a: string) => a === author),
      );
      filtered.links = filtered.links?.filter((n :any) => n.type !== 'author').filter(
        (l : any) => l.target === author || filtered.nodes.find((d: any) => d.id === l.target),
      );
    } else if (!selectedIdeologies?.length
      && !selectedAges?.length
      && !selectedGenders?.length
      && !selectedCountries?.length
    ) {
      filtered.nodes = filtered.nodes.filter((n :any) => n.type !== 'comment');
      filtered.links = filtered.links.filter((n :any) => n.type === 'author');
    }

    setFilteredData(filtered);
  }, [data, post, author, ideologies, ages, countries, genders]);

  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Filters
        handleChangeQuery={handleChangeQuery}
        query={router.query}
        />

      <main className={`${styles.main} ${postData ? styles['panel-is-active'] : ''}`}>
        {filteredDatas
          && <Nodes
              post={post}
              data={filteredDatas}
            />
        }
      </main>
      <Panel post={postData} author={authorData} data={filteredDatas} />

    </div>
  );
};

export default Home;
