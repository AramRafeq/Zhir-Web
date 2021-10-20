import React, { useEffect } from 'react';

const ConfigObject = {
  colorScheme: 'dark',
  theme: {
    colors: {
      primaryBg: '#1e262c',
      primaryBgHover: '#637381',
      secondaryBg: '#263138',
      secondaryBgHover: '#34444c',
      text: '#F9FAFB',
      textHover: '#fff',
      textMute: '#aaa',
      textWarn: '#f7931e',
      secondaryBgOpacity: 'rgba(0, 0, 0, 0.75)',

      border: '#161e23',
      borderLight: '#70777f',
    },
    fonts: [
      { label: 'Arial', value: 'Arial' },
      { label: 'Tahoma', value: 'Tahoma' },
      { label: 'Times New Roman', value: 'Times New Roman' },
      { label: 'Courier', value: 'Courier' },
      { label: 'Courier New', value: 'Courier New' },
      { label: 'Verdana', value: 'Verdana' },
    ],
  },
  tools: ['adjust', 'effects', 'filters', 'rotate', 'crop', 'resize', 'watermark', 'shapes', 'image', 'text'],
  language: 'en',
  translations: {
    en: {
      'toolbar.download': 'Done',
    },
  },
  showInModal: true,
  // elementId: 'file-robot-image-editor',
  reduceBeforeEdit: {
    mode: 'auto',
    // widthLimit: 2000,
    // heightLimit: 2000
  },
};
export default function ImageEditorComponent(props) {
  // const cropperRef = React.createRef();
  const { file, onFinish } = props;
  const dataURLtoFile = (dataurl, name) => {
    const arr = dataurl.split(',');
    const mime = arr[0].match(/:(.*?);/)[1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    // eslint-disable-next-line no-plusplus
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], name, { type: mime });
  };

  useEffect(() => {
    if (file !== null) {
      if (window.ImageEditorInstance) {
        window.ImageEditorInstance.unmount();
      }

      window.ImageEditorInstance = new window.FilerobotImageEditor(ConfigObject, {
        onComplete: () => false,
        onBeforeComplete: (editorInstance) => {
          const { canvas } = editorInstance;
          const base64 = canvas.toDataURL('image/jpeg', 0.85);
          const editedFile = dataURLtoFile(base64, file.name);
          if (file.edits) {
            editedFile.edits = file.edits + 1;
          } else {
            editedFile.edits = 1;
          }
          try {
            onFinish(editedFile, file);
          } catch (e) {
            // hello world
          }
          return false;
        },
      });
      window.ImageEditorInstance.open(file);
    }
  }, [file]);

  if (process.browser) {
    return (
      <>
        <div id="file-robot-image-editor" />
      </>
    );
  }
  return <h1>Hello Server</h1>;
}
