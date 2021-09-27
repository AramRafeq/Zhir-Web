import React from 'react';

import {
  Button, List, Row, Col, Avatar, Popover, Empty, message, Popconfirm, Form,
} from 'antd';
import { PlusOutlined, DeleteOutlined } from '@ant-design/icons';
import _ from 'lodash';
import FileInputComponent from 'react-file-input-previews-base64';
import uniqid from 'uniqid';
import prettyBytes from 'pretty-bytes';

class BinaryUploader extends React.Component {
  constructor(props) {
    super();
    this.initialState = () => ({
      files: props.value || [],
    });
    this.state = this.initialState();
    this.onChange = (fileArr) => {
      this.setState((prevState) => {
        const files = Array.isArray(fileArr) ? fileArr : [fileArr];
        if (this.safeToAddFiles(files)) {
          if (!this.exceedsMaxFileCount(files)) {
            const newFiles = _.uniqBy([...prevState.files, ...files], 'name');
            return { files: newFiles };
          }
        }
        return prevState;
      }, () => {
        try {
          const { files } = this.state;
          const { onChange } = this.props;
          onChange(files);
        } catch (e) {
          // hello
        }
      });
    };
    this.safeToAddFiles = (files = []) => {
      const { accept } = this.props;
      if (accept) {
        let blockedFileEncountered = false;

        const acceptedArray = `${accept}`.split(',');
        for (let i = 0; i < files.length; i += 1) {
          if (acceptedArray.indexOf(files[i].type) <= -1) {
            message.error(`${files[i].name} is not allowed`);
            blockedFileEncountered = true;
          }
        }
        return !blockedFileEncountered;
      }
      return false;
    };
    this.exceedsMaxFileCount = (addedFiles) => {
      const { files } = this.state;
      const { maxFileCount } = this.props;
      if (addedFiles.length + files.length > maxFileCount) {
        message.error(`Adding ${addedFiles.length} files exceeds max remaining file count which is ${maxFileCount - files.length}`);
        return true;
      }
      return false;
    };
    this.removeFile = (index) => {
      this.setState((prevState) => {
        const currentFiles = prevState.files;
        _.remove(currentFiles, (o, i) => index === i);
        return { files: currentFiles };
      }, () => {
        try {
          const { files } = this.state;
          const { onChange } = this.props;
          onChange(files);
        } catch (e) {
          // hello
        }
      });
    };
    this.clearAll = () => {
      this.setState({ files: [] });
      try {
        const { onChange } = this.props;
        onChange([]);
      } catch (e) {
        // hello
      }
    };
    this.onAttributeFormFinished = (values, index, file) => {
      const newFileObject = {
        ...file,
        ...values,
      };
      const { files } = this.state;
      const newFilesArray = files;
      newFilesArray[index] = newFileObject;
      try {
        this.setState({ files: newFilesArray });
        const { onChange } = this.props;
        onChange(newFilesArray);
      } catch (e) {
        // hello
      }
    };
  }

  // static getDerivedStateFromProps(props) {
  //   console.log(props);
  //   return {
  //     files: props.value || [],
  //   };
  // }

  render() {
    const { files } = this.state;
    const {
      maxFileCount, style, text, extraFields,
    } = this.props;
    return (
      <>
        <Row>
          <Col span={24}>
            <List
              bordered
              rowKey={uniqid()}
              size="small"
            >
              <List.Item
                key={uniqid()}
                actions={[
                  <FileInputComponent
                    labelText=""
                    imagePreview={false}
                    buttonComponent={(
                      <Button style={{ ...style, ...{ display: (maxFileCount - files.length) <= 0 ? 'none' : '', marginTop: -14 } }} block type="dashed" icon={<PlusOutlined />}>
                        {text || 'Add Files'}
                      </Button>
                    )}
                    {...this.props}
                    callbackFunction={this.onChange}
                  />,
                ]}
              >
                <List.Item.Meta title={`Upload Queue ${maxFileCount - files.length > 0 ? `( ${maxFileCount - files.length} files to reach limit )` : '( maximum file limit reached )'}`} />
              </List.Item>
              {files.length === 0 ? <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description="No file is choosen" /> : null}
              {files.map((file, index) => {
                const listItem = (
                  <List.Item
                    key={uniqid()}
                    actions={[
                      <Popconfirm
                        title="Are you sure delete "
                        onConfirm={() => this.removeFile(index)}
                        okText="Yes"
                        okButtonProps={{ danger: true }}
                        cancelText="No"
                        placement="bottom"
                      >
                        <Button type="dashed" icon={<DeleteOutlined />} shape="round" />
                      </Popconfirm>,
                    ]}
                  >
                    <List.Item.Meta
                      title={file.name}
                      avatar={
                      file.type.indexOf('image') > -1
                        ? (
                          <Popover content={<img src={file.base64} alt="pciked" width={250} />}>
                            <Avatar src={file.base64} />
                          </Popover>
                        )
                        : undefined
                    }
                      description={(
                        <>
                          {prettyBytes(file.file.size) }
                          {'  '}
                          {file.type}
                        </>
                    )}
                    />
                  </List.Item>
                );
                const extraFieldsUI = (extraFields || []).map((field) => (
                  <div key={Math.random()}>
                    <Form.Item name={field.name} label={field.label}>
                      {field.component}
                    </Form.Item>
                  </div>
                ));
                return (

                  (extraFields)
                    ? (
                      <Popover
                        key={Math.random()}
                        content={(
                          <Form onFinish={(values) => this.onAttributeFormFinished(values, index, file)} layout="vertical" key={`form-${index + 1}`}>
                            {extraFieldsUI}
                            <Button
                              size="middle"
                              type="primary"
                              htmlType="submit"
                              block
                            >
                              Save
                            </Button>
                          </Form>
                        )}
                      >
                        {listItem}
                      </Popover>
                    )
                    : listItem
                );
              })}

              <List.Item
                key={uniqid()}
                style={{ background: '#fff7f3', display: files.length > 1 ? '' : 'none' }}
                actions={[
                  <Popconfirm
                    title="This will clear files inside the uploader"
                    onConfirm={this.clearAll}
                    okText="Yes, Clear"
                    okButtonProps={{ danger: true }}
                    cancelText="No"
                    placement="bottom"
                  >
                    <Button type="dashed" icon={<DeleteOutlined />} shape="round" />
                  </Popconfirm>,
                ]}
              >
                <List.Item.Meta title="Clear All" />

              </List.Item>
            </List>
          </Col>
        </Row>
      </>
    );
  }
}

export default BinaryUploader;
