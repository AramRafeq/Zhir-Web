/* eslint-disable react/destructuring-assignment */
import React from 'react';
import { Select, Spin, Empty } from 'antd';

import debounce from 'lodash/debounce';
import getAgentInstance from '../../helpers/superagent';

const superagent = getAgentInstance();

class RemoteSelect extends React.Component {
  constructor(props) {
    super();
    this.initialState = () => ({
      data: [],
      value: undefined,
      fetching: false,
    });
    this.state = this.initialState();

    this.onChange = (value) => {
      this.setState({ value });
      try {
        const v = value ? value.key : undefined;
        const { onChange } = this.props;
        onChange(value, v);
      } catch (e) {
        //
      }
    };
    this.resetValue = () => {
      this.setState({ value: undefined });
    };

    this.onSearch = (searchQuery) => {
      this.loadData(searchQuery);
    };

    this.loadData = debounce((searchQuery, endpoint = undefined) => {
      this.setState({ fetching: true });
      const params = {
        limit: 100,
        offset: 0,
      };

      if (searchQuery && searchQuery !== '') {
        params.q = searchQuery;
      }
      superagent
        .get(`${endpoint || this.props.endpoint}`)
        .query(params)
        .end((err, res) => {
          if (!err) {
            const { body } = res;
            const options = [];
            body.map((element) => {
              options.push({
                text:
                  typeof this.props.optiontext === 'function'
                    ? this.props.optiontext(element)
                    : element.name,
                value:
                  typeof this.props.optionvalue === 'function'
                    ? this.props.optionvalue(element)
                    : element.id,
              });
              return null;
            });
            this.setState({ data: options, fetching: false });
          } else {
            this.setState({ data: [], fetching: false });
          }
        });
    }, 800);

    this.ref = props.ref;
  }

  componentDidMount() {
    if (this.props.endpoint) this.loadData();
  }

  static getDerivedStateFromProps(props) {
    if ('value' in props) {
      const { value } = props;
      return { value };
    }
    return null;
  }

  render() {
    const { fetching, data, value } = this.state;
    const { placeholder, endpoint } = this.props;
    const textHolder = placeholder || '';
    return (
      <Select
        key={`select-${endpoint}`}
        allowClear
        loading={fetching}
        mode={this.props.mode || null}
        showSearch
        labelInValue
        value={value}
        notFoundContent={
          fetching ? (
            <Spin size="small" />
          ) : (
            <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
          )
        }
        filterOption={false}
        onSearch={this.onSearch}
        onChange={this.onChange}
        style={{ width: '100%' }}
        placeholder={textHolder}
      >
        {data.map((d) => (
          <Select.Option key={d.value}>{d.text}</Select.Option>
        ))}
      </Select>
    );
  }
}

export default RemoteSelect;
