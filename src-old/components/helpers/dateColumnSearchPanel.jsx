/* eslint-disable no-param-reassign */
import React from 'react';
import { Button, DatePicker } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import moment from 'moment';

export default (componentRef) => {
  componentRef.state = {
    ...componentRef.state,
    searchDate: '',
    searchedOptionColumn: '',
  };
  componentRef.handleSearch = (date, confirm, dataIndex) => {
    confirm();
    componentRef.setState({
      searchDate: date,
      searchedOptionColumn: dataIndex,
    });
  };
  componentRef.handleReset = (clearFilters) => {
    clearFilters();
    componentRef.setState({
      searchDate: '',
      searchedOptionColumn: '',
    });
  };
  componentRef.getDateColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      // selectedKeys,
      confirm,
      clearFilters,
    }) => (
      <div style={{ width: 250, padding: 8 }}>
        <DatePicker
          placeholder={`Search ${dataIndex}`}
          value={
            componentRef.state.searchDate !== ''
              ? moment(componentRef.state.searchDate)
              : ''
          }
          onChange={(date, dateString) => {
            setSelectedKeys(dateString ? [dateString] : []);
            componentRef.handleSearch(dateString, confirm, dataIndex);
          }}
          style={{ width: '100%' }}
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
