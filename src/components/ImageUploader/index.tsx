import React from 'react';
import { Uploader, Message, Loader, useToaster } from 'rsuite';
import DefaultIcon from '@rsuite/icons/legacy/Camera';
import './index.css';


type PreviewFileType = string | null

const previewFile = (file: File | undefined, callback: (value: PreviewFileType) => void) => {
  const reader = new FileReader();
    reader.onloadend = () => {
    callback(typeof reader.result === 'string' ? reader.result: '');
  };
  file && reader.readAsDataURL(file);
};

const UploadAndDisplayImage = () => {
    const toaster = useToaster();
    const [uploading, setUploading] = React.useState<boolean>(false);
    const [fileInfo, setFileInfo] = React.useState<PreviewFileType>('');
  
    return (
      <Uploader
        className='uploader'
        fileListVisible={false}
        listType="picture-text"        
        action="//jsonplaceholder.typicode.com/posts/"
        onUpload={file => {
          setUploading(true);
          previewFile(file.blobFile, (value: PreviewFileType) => {
            setFileInfo(value);
          });
        }}
        onSuccess={(response, file) => {
          setUploading(false);
          toaster.push(<Message type="success">Uploaded successfully</Message>);
          console.log(response);
        }}
        onError={() => {
          setFileInfo('');
          setUploading(false);
          toaster.push(<Message type="error">Upload failed</Message>);
        }}
      >
        <button style={{ width: 300, height: 300 }}>
          {uploading && <Loader backdrop center />}
          {fileInfo ? (
            <img src={fileInfo} width="100%" height="100%" />
          ) : (
            <DefaultIcon style={{ fontSize: 100 }} />
          )}
        </button>
      </Uploader>
    );
};

export default UploadAndDisplayImage;
