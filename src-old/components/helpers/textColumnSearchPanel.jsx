/* eslint-disable no-param-reassign */
import React from 'react';
import { Input, Button } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
// import _ from 'lodash';

export default (componentRef) => {
  componentRef.state = {
    ...componentRef.state,
    searchText: '',
    searchedColumn: '',
    customSearch: [
      // {column: "name", value: "hello"}
    ],
  };
  componentRef.handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    componentRef.setState({
      searchText: selectedKeys[0],
      searchedColumn: dataIndex,
    });
  };
  componentRef.handleReset = (clearFilters) => {
    clearFilters();
    componentRef.setState({ searchText: '', searchedColumn: '' });
  };
  componentRef.getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
    }) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={(node) => {
            componentRef.searchInput = node;
          }}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => componentRef.handleSearch(selectedKeys, confirm, dataIndex)}
          style={{ width: 188, marginBottom: 8, display: 'block' }}
        />
        <Button
          type="primary"
          onClick={() => componentRef.handleSearch(selectedKeys, confirm, dataIndex)}
          icon={<SearchOutlined />}
          size="small"
          style={{ width: 90, marginRight: 8 }}
        >
          Search
        </Button>
        <Button
          onClick={() => componentRef.handleReset(clearFilters)}
          size="small"
          style={{ width: 90 }}
        >
          Reset
        </Button>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined style={{ color: filtered ? '#f03d5f' : undefined }} />
    ),
    onFilter: (value, record) => `${record[dataIndex]}`
      .toString()
      .toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownVisibleChange: (visible) => {
      if (visible) {
        setTimeout(() => componentRef.searchInput.select());
      }
    },
    // render: text =>
    //   componentRef.state.searchedColumn === dataIndex ? (
    //     <Highlighter
    //       highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
    //       searchWords={[componentRef.state.searchText]}
    //       autoEscape
    //       textToHighlight={text.toString()}
    //     />
    //   ) : (
    //     text
    //   ),
  });

  // componentRef.handleSearch = (selectedKeys, confirm, dataIndex) => {
  //   confirm();
  //   componentRef.setState(prevState => {
  //     const searchTerms = prevState.customSearch;
  //     searchTerms.push(selectedKeys);
  //     _.uniqBy(searchTerms, dataIndex);
  //     return {
  //       customSearch: searchTerms,
  //     };
  //   });
  // };
  // componentRef.handleReset = (selectedKeys, clearFilters) => {
  //   clearFilters();
  //   componentRef.setState(prevState => {
  //     const searchTerms = prevState.customSearch;
  //     _.remove(searchTerms, o => o.column === selectedKeys.column);
  //     return {
  //       customSearch: searchTerms,
  //     };
  //   });
  // };
  // componentRef.getColumnSearchProps = dataIndex => ({
  //   filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => {
  //     return (
  //       <div style={{ padding: 8 }}>
  //         <Input
  //           ref={node => {
  //             componentRef.searchInput = node;
  //           }}
  //           placeholder={`Search ${dataIndex}`}
  //           value={selectedKeys.value}
  //           onChange={e =>
  //             setSelectedKeys(
  //               e.target.value
  //                 ? { column: dataIndex, value: e.target.value }
  //                 : { column: dataIndex, value: null }
  //             )
  //           }
  //           onPressEnter={() => componentRef.handleSearch(selectedKeys, confirm, dataIndex)}
  //           style={{ width: 188, marginBottom: 8, display: 'block' }}
  //         />
  //         <Button
  //           type="primary"
  //           onClick={() =>
  //             componentRef.handleSearch(
  //               selectedKeys,
  //               confirm,
  //               dataIndex,
  //             )
  //           }
  //           icon={<SearchOutlined />}
  //           size="small"
  //           style={{ width: 90, marginRight: 8 }}
  //         >
  //           Search
  //         </Button>
  //         <Button
  //           onClick={() =>
  //             componentRef.handleReset(
  //               selectedKeys,
  //               clearFilters
  //             )
  //           }
  //           size="small"
  //           style={{ width: 90 }}
  //         >
  //           Reset
  //         </Button>
  //       </div>
  //     );
  //   },
  //   filterIcon: filtered => {
  //     const index = _.findIndex(
  //       componentRef.state.customSearch,
  //       o => o.column === dataIndex
  //     );
  //     return (
  //       <SearchOutlined style={{ color: index > -1 ? '#f03d5f' : undefined }} />
  //     );
  //   },
  //   onFilter: (value, record) =>{
  //     return record[dataIndex]
  //     .toString()
  //     .toLowerCase()
  //     .includes(value.toLowerCase())
  //   }
  //     ,
  //   onFilterDropdownVisibleChange: visible => {
  //     if (visible) {
  //       setTimeout(() => componentRef.searchInput.select());
  //     }
  //   },
  // });
};
