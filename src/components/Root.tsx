import { useEffect, useState } from 'react';
import TableSW from './Table/Table';
import { useActionData, useLoaderData, useParams, useSubmit } from "react-router-dom";
import Header from './Header/Header';
import { Skeleton, TextField } from '@mui/material';
import styles from '../App.module.scss';
import { PageLinks } from '../types/categories';

export const getSkeletons = (number: number) => {
  const skeletons = [];
  for (let i = 1; i <= number; i++) {
    skeletons.push(<Skeleton key={`skeleton-${i}`} animation="wave" height={50} />); 
  }
  return skeletons;
}

function Root (props: any) {
    const { type = 'all' } = useParams();
    const [tableData, setTableData] = useState<any>([]);
    const [filter, setFilter] = useState<string>();

    const actionData: any = useActionData();
    const loaderData: any = useLoaderData();

    const submit = useSubmit();

    useEffect(() => {
      let page = type;
      if (page === '/') {
        page = PageLinks.All;
      }
      submit(null, { action: `/${type}`, method: 'post' });
    }, [])

    useEffect(() => {
      if(actionData && Object.keys(actionData).length > 0) {
        if (filter) {
          const filteredValues = actionData.map((el: any) =>  {
            if (el.hasOwnProperty('name')) {
              return el.name.toLowerCase().includes(filter) && el;
            }
            if (el.hasOwnProperty('name')) {
              return el?.title.toLowerCase().includes(filter) && el;
            }
          });
          setTableData(filteredValues);
        } else {
          setTableData(actionData);
        }
      }
    }, [actionData, filter]);

    const filterData = (val: string) => {
      val.toLowerCase();
      setFilter(val);
    }

    return(
        <>
            <Header />
            <div className={styles.container}>
            <TextField id="outlined-basic" label="Search by name or title" variant="outlined" onChange={(ev) => filterData(ev.target.value)} />
              {tableData && Object.keys(tableData).length > 0 && (
                <TableSW tableData={tableData} rowLimit={6} type={type} filter={filter} />
              )}
              {loaderData.loading && (!tableData || Object.keys(tableData).length === 0) && (
                <>
                  {getSkeletons(5)}
                </>
              )}
            </div>
        </>
    );
}

export default Root;