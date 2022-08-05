import React from "react"
import styled from 'styled-components'
import { useTable } from 'react-table'
import { db } from '../Firebase/firebase'
import { collection, getDocs, query, where} from 'firebase/firestore'
import {default as Search}  from "./Search"
import RenderCell from "./RenderCell"

const Styles = styled.div`
  padding: 1rem;

  table {
    border-spacing: 0;
    border: 1px solid black;

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
`

function Table({ columns, data }) {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({
    columns,
    data,
  })

  return (
    <table {...getTableProps()}>
      <thead>
        {headerGroups.map(headerGroup => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map(column => (
              <th {...column.getHeaderProps()}>{column.render('Header')}</th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map(
          (row, i) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map(cell => {
                  return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                })}
              </tr>
            )}
        )}
      </tbody>
    </table>
  )
}

function DataTable(props) {
  const { refresh, setRefresh } = props;
    const [data, setData] = React.useState([])
    const [searchText, setSearchText] = React.useState("")

  const columns = React.useMemo(
    () => [
     { Header: 'Id',
     accessor: 'id',},
    //  { Header: 'Location',
    //    columns:[
    //     {
    //      Header:latitude,
    //     }
    //    ],
    //  { Header: 'Date',
    //  accessor: 'Date',},
     { Header: 'Name',
     accessor: 'Name',},
     { Header: ' ',
     accessor: "docId",
     Cell: ({ cell: { value } }) => <RenderCell refresh={refresh} setRefresh={setRefresh} id={value}/>,
    },
    ],
    []
  )

  const callDoc=async()=>{
    const querySnapshot = await getDocs(collection(db, "Data"));
    const dataList=[]
    querySnapshot.forEach((doc) => {
      const collectionData = doc.data()
      collectionData.docId = doc.id
   dataList.push(collectionData)
    });
    setData(dataList)
  }
  React.useEffect(()=>{
    callDoc()
  },[refresh])


  //const tableData = React.useMemo(()=> data,[data])
   //console.log("searchText", searchText)

   const handleSearch = async(e) => {
    e.preventDefault();
    let find = [];
    console.log("search here")
    const q = query(collection(db, "Data"), where("Name", "==", searchText));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      find.push({id: doc.id, ...doc.data()});
    });
    setData(find);
    console.log("find",find);
  }
   
console.log("tableData", data)
  return (
    <Styles>
      <div>
        <input type="text" value={searchText} placeholder="search" onChange={(e)=>{setSearchText(e.target.value)}}/>
        <span><button onClick={handleSearch}><Search /></button></span>
      </div>
      <br/>
      <Table columns={columns} data={data? data: []} />
    </Styles>
  )
}

export default DataTable
