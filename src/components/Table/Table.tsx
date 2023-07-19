import React, { useEffect, useState } from 'react';
import { PageLabels, Pages } from '../../types/categories';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Pagination } from '@mui/material';
import styles from './Table.module.scss';
import { useSubmit } from 'react-router-dom';

function TableSW (props: any) {
  const { tableData, rowLimit, isDetailPage, type, filter } = props;

  const submit = useSubmit();

  const changePage = (page: string) => {
    !isDetailPage && submit(null, { action: page, method: 'post' });
  }

  const PAGE_SIZE = 5;
  const INITIAL_PAGE = 1;
  
  const [rows, setRows] = useState([]);
  const [paginatedRows, setPaginatedRows] = useState([]);
  const [page, setPage] = useState(INITIAL_PAGE);
  const [pageCount, setPageCount] = useState(0);

  const isAllPage = type && type === PageLabels.All.toLowerCase();

  useEffect(() => {
      if (tableData && tableData.length > 0) {
          setRows(tableData);
          let pageCountValue: number = parseInt(String(tableData.length / PAGE_SIZE));
          if ((tableData.length % PAGE_SIZE) > 0 ) {
            pageCountValue += 1;
          }
          setPageCount(pageCountValue);
          setPage(INITIAL_PAGE);
        }
  }, [tableData])

  useEffect(() => {
    const paginatedValues = rows.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);
    if (!filter && paginatedValues.length > 0) {
      setPaginatedRows(paginatedValues);
    }
    if (filter) {
      setPaginatedRows(rows);
    }
  }, [rows, page]);

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  return(
    <>
      <TableContainer sx={{margin: '30px auto'}} component={Paper}>
        <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
          {paginatedRows.map((row: any, rowIndex) => {
            if (row && Object.keys(row).length > 0) {
              const headers = Object.keys(row);
              const tableHeaders = [];
              const tableRows = [];
              for (let i = 0; i < rowLimit; i++) {
                const tableHeader = (
                  <TableCell key={`key-${rowIndex}-${i}-${row[headers[i]]}`} sx={{fontWeight: 'bold'}}>{headers[i].toUpperCase().replaceAll('_', ' ')}</TableCell>
                );
                tableHeaders.push(tableHeader);
              }
              for (let i = 0; i < rowLimit; i++) {
                let tableRow = (
                  <TableCell key={`key-${rowIndex}-${i}--${row[headers[i]]}`}>{row[headers[i]]}</TableCell>
                );
                if (row[headers[i]].length > 0 && typeof row[headers[i]] !== 'string') {
                  tableRow = (
                    <TableCell key={`key-${rowIndex}-${i}--${row[headers[i]]}`}>
                      <ul>
                        {row[headers[i]].map((item: any, index: number) => {
                          return (
                            <li key={`${item}-${index}`}>{item}</li>
                          )
                        })}
                      </ul>
                    </TableCell>
                  );
                }
                tableRows.push(tableRow);
              }
              const rowUrl = row.url && row.url.split('/').slice(-3);
              const detailUrl = rowUrl && `/${Pages.Detail}/${rowUrl[0]}/${rowUrl[1]}`;
              return (
                <React.Fragment key={`row-${rowIndex}`}>
                  {(isAllPage || (!isAllPage && rowIndex === 0)) && (
                    <TableHead key={`head-${rowIndex}-${row[headers[rowIndex]]}`} onClick={() => changePage(detailUrl)}>
                      <TableRow key={`rowhead-${rowIndex}-${row[headers[rowIndex]]}`}>
                        {tableHeaders}
                      </TableRow>
                    </TableHead>
                  )}
                  <TableBody key={`body-${rowIndex}-${row[headers[rowIndex]]}`} onClick={() => changePage(detailUrl)}>
                    <TableRow key={`rowbody-${rowIndex}-${row[headers[rowIndex]]}`}>
                      {tableRows}
                    </TableRow>
                  </TableBody>
                </React.Fragment>
                );
              }
            }
          )}
        </Table>
      </TableContainer>
      {!isDetailPage && (
        <div className={styles.pagination}>
          <Pagination onChange={handleChange} count={pageCount} variant="outlined" color="primary" />
        </div>
      )}
    </>
  );
}

export default TableSW;