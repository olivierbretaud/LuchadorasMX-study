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
  const [filterIsOpen, setFilterIsOpen] = useState(false);

  return (
    <div className={`${styles.container} ${filterIsOpen ? styles['is-open'] : ''}`}>
      <button
        className={styles.toggle}
        onClick={() => setFilterIsOpen(!filterIsOpen)}
        >
        <HiFilter />Filtres
      </button>
      {filterIsOpen
        && <div className={styles.filters}>
          <h4>Idéologies</h4>
          <div className={styles.list}>
          {dataSet?.list?.idelologies.map((id, i) => {
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
        </div>
      }
    </div>
  );
};

export default Filters;
