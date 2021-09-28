/* eslint-disable no-param-reassign */
import React from 'react';
import { Button } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
// import _ from 'lodash';
import RemoteSelect from '../components/basic/RemoteSelect';

export default (componentRef) => {
  componentRef.state = {
    ...componentRef.state,
    searchOption: undefined,
    searchedOptionColumn: '',
  };
  componentRef.handleSearch = (option, confirm, dataIndex) => {
    confirm();
    componentRef.setState({
      searchOption: option,
      searchedOptionColumn: dataIndex,
    });
  };
  componentRef.handleReset = (clearFilters) => {
    clearFilters();
    componentRef.setState({
      searchOption: undefined,
      searchedOptionColumn: '',
    });
  };
  componentRef.getSelectColumnSearchProps = (dataIndex, endpoint) => ({
    filterDropdown: ({
      setSelectedKeys,
      // selectedKeys,
      confirm,
      clearFilters,
    }) => (
      <div style={{ width: 250, padding: 8 }}>
        <RemoteSelect
          endpoint={endpoint}
          placeholder={`Search ${dataIndex}`}
          value={componentRef.state.searchOption}
          onChange={(option) => {
            setSelectedKeys(option && option.value ? [option.value] : []);
            componentRef.handleSearch(option, confirm, dataIndex);
          }}
        />
        <Button
          onClick={() => componentRef.handleReset(clearFilters)}
          size="small"
          style={{ width: 90, marginTop: 5 }}
        >
          Reset
        </Button>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined
        style={{
          color: filtered && filtered.value > 0 ? '#f03d5f' : undefined,
        }}
      />
    ),
  });
};
