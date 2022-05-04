/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from 'react';
import * as d3 from 'd3';
import { IoClose } from 'react-icons/io5';
import dataSet from '../../constants/data.json';
import styles from './Filters.module.scss';
import Pie from '../Pie/Pie';

interface Stats {
  genders: any[];
  ideologies: any[];
  countries: any[];
  ages: any[];
}

const Filters = (
  {
    handleChangeQuery,
    query,
    filteredData,
  }
  :
  {
    handleChangeQuery: (key: string, value: string) => void,
    query: any | unknown,
    filteredData: any | unknown,
  },
): JSX.Element => {
  const data : any = dataSet;
  const [filterIsOpen, setFilterIsOpen] = useState(false);
  const ideologies = query?.ideologies !== '' ? query?.ideologies?.replace(/\s/g, '')?.split(',')?.length - 1 : 0;
  const countries = query?.countries !== '' ? query?.countries?.replace(/\s/g, '')?.split(',')?.length - 1 : 0;
  const ages = query?.ages !== '' ? query?.ages?.replace(/\s/g, '')?.split(',')?.length - 1 : 0;
  const genders = query?.genders !== '' ? query?.genders?.replace(/\s/g, '')?.split(',')?.length - 1 : 0;

  const [stats, setStats] = useState<Stats>();

  function colorScale(value: number, domain: number[]) {
    const color = d3.scaleLinear<string>()
      .domain(domain)
      .range(['rgba(45,21,105,1)', 'rgba(45,21,105, 0.7)']);
    return color(value);
  }

  function calcFilters() {
    const total = ideologies + countries + ages + genders;
    if (total > 0) {
      return ` (${total})`;
    }
    return null;
  }

  useEffect(() => {
    if (data?.list && filteredData?.nodes) {
      const authors = filteredData.nodes.filter((n: any) => n.type === 'author');
      let gendersStat : any[] = [];
      data?.list.genders.forEach((g : string) => {
        if (authors.filter((n: any) => n.gender === g)?.length > 0) {
          gendersStat.push({
            id: g,
            label: g,
            value: authors.filter((n: any) => n.gender === g)?.length,
          });
        }
      });
      const genderScale = gendersStat.sort((a, b) => b.value - a.value).map((d :any) => d.value);
      gendersStat = gendersStat.sort((a, b) => b.value - a.value)
        .map((g) => ({ ...g, color: colorScale(g.value, genderScale) }));

      let ideologiesStat : any[] = [];
      data?.list.idelologies?.forEach((g : string) => {
        if (authors.filter((n: any) => n.ideologies.find((id: string) => id === g))?.length > 0) {
          ideologiesStat.push({
            id: g,
            label: g,
            value: authors
              .filter((n: any) => n.ideologies.find((id: string) => id === g))?.length || 0,
          });
        }
      });
      const ideologiesScale = ideologiesStat
        .sort((a, b) => b.value - a.value).map((d :any) => d.value);
      ideologiesStat = ideologiesStat.sort((a, b) => b.value - a.value)
        .map((g) => ({ ...g, color: colorScale(g.value, ideologiesScale) }));

      let countriesStat : any[] = [];
      data?.list.countries?.forEach((g : string) => {
        if (authors.filter((n: any) => n.country === g)?.length > 0) {
          countriesStat.push({
            id: g,
            label: g,
            value: authors
              .filter((n: any) => n.country === g)?.length || 0,
          });
        }
      });
      const contriesScale = countriesStat
        .sort((a, b) => b.value - a.value).map((d :any) => d.value);
      countriesStat = countriesStat.sort((a, b) => b.value - a.value)
        .map((g) => ({ ...g, color: colorScale(g.value, contriesScale) }));

      let agesStat : any[] = [];
      data?.list.ages?.forEach((g : string) => {
        if (authors.filter((n: any) => n.age === g)?.length > 0) {
          agesStat.push({
            id: g,
            label: g,
            value: authors
              .filter((n: any) => n.age === g)?.length || 0,
          });
        }
      });
      const agesScale = agesStat
        .sort((a, b) => b.value - a.value).map((d :any) => d.value);
      agesStat = agesStat.sort((a, b) => b.value - a.value)
        .map((g) => ({ ...g, color: colorScale(g.value, agesScale) }));

      setStats({
        genders: gendersStat,
        ideologies: ideologiesStat,
        countries: countriesStat,
        ages: agesStat,
      });
    }
  }, [data?.list, filteredData?.nodes]);

  return (
    <div className={`${styles.container} ${filterIsOpen ? styles['is-open'] : ''}`}>
      <button
        className={styles.toggle}
        type='button'
        onClick={() => setFilterIsOpen(!filterIsOpen)}
        >
        {filterIsOpen
          ? <><IoClose size={22}/> CERRAR</>
          : <span>Estadísticas {'&'} Filtros<span className={styles['active-filters']}>{calcFilters() && `${calcFilters()}` }</span></span>
        }
      </button>
      {filterIsOpen
        && <div className={styles.filters}>
          <p className={styles['active-filters']}>{calcFilters() && ` Filtros ${calcFilters()}` }</p>
          <h4>Ideologias {ideologies > 0 && `(${ideologies})`}</h4>
          {stats?.ideologies && <div>
              <Pie data={stats?.ideologies} />
            </div>
          }
          <div className={styles.list}>
          {data.list?.idelologies.map((id : string, i: number) => {
            let isActive = false;
            if (query?.ideologies?.split(',').find((qi : string) => qi === id)) {
              isActive = true;
            }
            return (
            <button
              className={isActive ? styles['is-active'] : '' }
              onClick={() => handleChangeQuery('ideologies', id)}
              key={i}>
              {id}
            </button>
            );
          })}
          </div>
          <h4>Géneros {genders > 0 && `(${genders})`}</h4>
          {stats?.genders && <div>
              <Pie data={stats?.genders} />
            </div>
          }
          <div className={styles.list}>
          {data.list?.genders.map((id : string, i: number) => {
            let isActive = false;
            if (query?.genders?.split(',').find((qi : string) => qi === id)) {
              isActive = true;
            }
            return (
            <button
              className={isActive ? styles['is-active'] : '' }
              onClick={() => handleChangeQuery('genders', id)}
              key={i}>
              {id}
            </button>
            );
          })}
          </div>
          <h4>País {countries > 0 && `(${countries})`}</h4>
          {stats?.countries && <div>
              <Pie data={stats?.countries} />
            </div>
          }
          <div className={styles.list}>
          {['S/I', ...data.list?.countries.filter((d:string) => d !== 'S/I')].map((id : string, i: number) => {
            let isActive = false;
            if (query?.countries?.split(',').find((qi : string) => qi === id)) {
              isActive = true;
            }
            return (
            <button
              className={isActive ? styles['is-active'] : '' }
              onClick={() => handleChangeQuery('countries', id)}
              key={i}>
              {id}
            </button>
            );
          })}
          </div>
          <h4>Edad {ages > 0 && `(${ages})`}</h4>
          {stats?.ages && <div>
              <Pie data={stats?.ages} />
            </div>
          }
          <div className={styles.list}>
          {['S/I', ...data.list?.ages.filter((d:string) => d !== 'S/I')].map((id : string, i: number) => {
            let isActive = false;
            if (query?.ages?.split(',').find((qi : string) => qi === id)) {
              isActive = true;
            }
            return (
            <button
              className={isActive ? styles['is-active'] : '' }
              onClick={() => handleChangeQuery('ages', id)}
              key={i}>
              {id}
            </button>
            );
          })}
          </div>
        </div>
      }
    </div>
  );
};

export default Filters;
