import React, { useCallback, useEffect, useState } from "react";
import { useTable, useGlobalFilter, Column, Row, IdType, useSortBy } from "react-table";
import { SortDescendingOutlined, SortAscendingOutlined } from "@ant-design/icons";

import styled from "styled-components";
import { calcAvarage, dadLineProjectPrecent } from "../services/helper";

// /**
//  * There's some boilter plate here
//  * Important part is our globalFilter function
//  * where we specify which columns to
//  * filter
//  * */

const Styles = styled.div`
   padding: 1rem;

  input {
    border: 1px solid black;
    margin: 5px;
    font-size:25px;
  }
  .lowMark{
    background-color:red;
  }
  .highMark{
    background-color:green;
  }

  table {
    border-spacing: 0;
    border: 1px solid black;
    margin-left: auto;
    margin-right: auto;
    tr {
      :last-child {
        td {
          border-bottom: 0;
        }
      }
    }

    th,
    td {
      margin: 0;
      padding: 0.5rem;
      border-bottom: 1px solid black;
      border-right: 1px solid black;

      :last-child {
        border-right: 0;
      }
    }
  }
`;

interface TableProps<T extends object> {
    columns: Column<T>[];
    data: T[];
}

export default function Table<T extends {
    score: number; id: string
}>({
    columns,
    data
}: TableProps<T>): React.ReactElement {
    const [avarageScore, setAvarageScore] = useState(0);
    const [dadLineProjPrec, setDadLineProjPrec] = useState(0);
    const [dataInTable, setDataInTable] = useState<any[]>();
    /**
     * Custom Filter Fucntion ----
     */
    useEffect(() => {
        if (dataInTable) {
            setAvarageScore(calcAvarage(dataInTable)||0);
            setDadLineProjPrec(dadLineProjectPrecent(dataInTable)||0)
        }
    }, [dataInTable])
    useEffect(() => {
        if (data.length > 0) {
            setDataInTable(data);
            setAvarageScore(calcAvarage(data));
            setDadLineProjPrec(dadLineProjectPrecent(data))
        }
    }, [data])
    const ourGlobalFilterFunction = useCallback(
        (rows: Row<T>[], ids: IdType<T>[], query: string) => {
            return rows.filter(
                (row) => {
                    return row.values.bugsCount.toString().includes(query) ||
                        row.values.durationInDays.toString().includes(query) ||
                        row.values.id.toString().includes(query) ||
                        row.values.madeDadeline.toString().includes(query) ||
                        row.values.name.toString().includes(query) ||
                        row.values.score.toString().includes(query)
                }
            );
        },
        []
    );

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
        setGlobalFilter
    } = useTable<T>(
        {
            columns,
            data,
            // Use our custom function
            globalFilter: ourGlobalFilterFunction
        },
        useGlobalFilter,
        useSortBy
    );
    const filterDataInTable = (value: string) => {
        const newData: any[] = [];
        data.forEach((element: any) => {
            if (element.bugsCount.toString().includes(value) ||
                element.durationInDays.toString().includes(value) ||
                element.id.toString().includes(value) ||
                element.madeDadeline.toString().includes(value) ||
                element.name.toString().includes(value) ||
                element.score.toString().includes(value)) {
                newData.push(element);
            }
        })
        setDataInTable(newData);
    }
    const handleFilterInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = e.currentTarget;
        filterDataInTable(value);
        setGlobalFilter(value);
    };

    return (
        <Styles>
            <h3>Avarage score: {avarageScore}</h3>
            <h3>Percentage of projects that met the deadline: {dadLineProjPrec}%</h3>

            <input placeholder="Filter..." onChange={handleFilterInputChange} />
            <table {...getTableProps()}>
                <thead>
                    {headerGroups.map((headerGroup) => (
                        <tr {...headerGroup.getHeaderGroupProps()}>
                            {headerGroup.headers.map((column: any) => (
                                <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                                    {column.render("Header")}
                                    {/* Render the columns filter UI */}
                                    <button>{column.isSorted
                                        ? column.isSortedDesc
                                            ? 'UnSort'
                                            : <SortAscendingOutlined />
                                        : <SortDescendingOutlined />
                                    }</button>
                                </th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody {...getTableBodyProps()}>
                    {rows.map((row, i) => {
                        prepareRow(row);
                        return (
                            <tr {...row.getRowProps()}>
                                {row.cells.map((cell) => {
                                    return (
                                        <td className={cell.row.original.score < 70 ? "lowMark" : cell.row.original.score > 90 ? "highMark" : ''}{...cell.getCellProps()}>{cell.render("Cell")}</td>
                                    );
                                })}
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </Styles>
    );
}
