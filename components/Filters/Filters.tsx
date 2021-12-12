/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react';
import { HiFilter } from 'react-icons/hi';
import dataSet from '../../constants/data.json';
import styles from './Filters.module.scss';

const Filters = (
  {
    handleChangeQuery,
    query,
  }
  :
  {
    handleChangeQuery: (key: string, value: string) => void,
    query: any | unknown,
  },
): JSX.Element => {
  const data : any = dataSet;
  const [filterIsOpen, setFilterIsOpen] = useState(false);
  const ideologies = query?.ideologies !== '' ? query?.ideologies?.replace(/\s/g, '')?.split(',')?.length - 1 : 0;
  const countries = query?.countries !== '' ? query?.countries?.replace(/\s/g, '')?.split(',')?.length - 1 : 0;
  const ages = query?.ages !== '' ? query?.ages?.replace(/\s/g, '')?.split(',')?.length - 1 : 0;
  const genders = query?.genders !== '' ? query?.genders?.replace(/\s/g, '')?.split(',')?.length - 1 : 0;

  function calcFilters() {
    const total = ideologies + countries + ages + genders;
    if (total > 0) {
      return ` (${total})`;
    }
    return null;
  }
  return (
    <div className={`${styles.container} ${filterIsOpen ? styles['is-open'] : ''}`}>
      <button
        className={styles.toggle}
        type='button'
        onClick={() => setFilterIsOpen(!filterIsOpen)}
        >
        <HiFilter />Filtros {calcFilters()}
      </button>
      {filterIsOpen
        && <div className={styles.filters}>
          <h4>Ideologias</h4>
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
          <h4>Géneros</h4>
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
          <h4>País</h4>
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
          <h4>Edad</h4>
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
