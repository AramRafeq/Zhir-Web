import React from 'react';
import { Modal } from 'antd';

class CustomModal extends React.Component {
  constructor(props) {
    super(props);
    this.initialState = () => ({
      visible: false,
    });
    this.state = this.initialState();

    this.show = () => this.setState({ visible: true });
    (this.close = () => this.setState({ visible: false })),
    (this.onOk = props.onOk ? props.onOk : () => {});
    this.onCancel = props.onCancel
      ? props.onCancel
      : () => this.setState({ visible: false });
    this.emptyJsx = () => <span />;
  }

  componentDidMount() {
    try {
      const {
        show, close, onOk, onCancel,
      } = this;
      this.props.onMount(show, close, onOk, onCancel, this);
    } catch (e) {}
  }

  render() {
    const { visible } = this.state;
    const {
      show, close, onOk, onCancel,
    } = this;
    const {
      btnRef, header, footer, size, maskClosable,
    } = this.props;
    return (
      <>
        <div>
          <style>
            {`

            .modal-lg{
              width: 85% !important;
            }
            .modal-md{
              width: 65% !important;
            }
            .modal-sm{
              width: 45% !important;
            }
            .custom-modal .ant-modal-content{
              overflow: auto !important;
            }
            .custom-modal{
              margin-top: 2% !important;
            }
            .custom-modal .ant-modal-content .ant-modal-body{
              min-height: 200px;
              height: 100% !important;
              margin-bottom: 25px !important;
            }
        `}

          </style>
          <button onClick={show} style={{ display: 'none' }} ref={btnRef} />
        </div>
        <Modal
          maskClosable={maskClosable | false}
          className={`${size} custom-modal`}
          centered
          visible={visible}
          title={header}
          onOk={onOk}
          onCancel={onCancel}
          footer={footer | this.emptyJsx}
        >
          {visible
            ? React.cloneElement(this.props.children, {
              modal: {
                show,
                close,
                onOk,
                onCancel,
              },
            })
            : null}
          {/* { this.props.children} */}
        </Modal>
      </>
    );
  }
}
export default CustomModal;
