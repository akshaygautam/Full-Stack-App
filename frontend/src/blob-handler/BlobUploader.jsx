// BlobUploader.js
import React, { useState } from 'react';
import { Button, Upload, message, Progress } from 'antd';
import { UploadOutlined, PauseCircleOutlined, CloseCircleOutlined } from '@ant-design/icons';
import { uploadBlob, createCancelTokenSource } from './BlobService';
import axios from "axios";

const BlobUploader = () => {
    const [file, setFile] = useState(null);
    const [cancelTokenSource, setCancelTokenSource] = useState(null);
    const [uploading, setUploading] = useState(false);
    const [uploadProgress, setUploadProgress] = useState(0);

    const customRequest = async ({ file, onSuccess, onError, onProgress }) => {
        setUploadProgress(0);
        setCancelTokenSource(createCancelTokenSource());
        setUploading(true);

        try {
            await uploadBlob(file, (progressEvent) => {
                const percent = Math.round((progressEvent.loaded / progressEvent.total) * 100);
                onProgress({ percent });
                setUploadProgress(percent);
            }, cancelTokenSource);

            onSuccess();
            setFile(null);
            message.success('File upload complete');
        } catch (error) {
            onError(error);
            if (!axios.isCancel(error)) {
                message.error('File upload failed');
            }
        } finally {
            setUploading(false);
            if (cancelTokenSource) {
                setCancelTokenSource(null);
            }
        }
    };

    const handleCancel = () => {
        if (cancelTokenSource) {
            cancelTokenSource.cancel('Upload canceled by user');
            message.warn('File upload canceled');
        }
    };

    const handleToggleUpload = () => {
        if (uploading) {
            handleCancel();
        } else if (file) {
            customRequest({
                file,
                onSuccess: () => {},
                onError: () => {},
                onProgress: () => {},
            });
        } else {
            message.warning('Please select a file before starting the upload');
        }
    };

    const handleChange = (info) => {
        if (info.file.status === 'done' || info.file.status === 'error') {
            setFile(info.file.originFileObj);
        }
    };

    return (
        <div>
            <Upload
                customRequest={customRequest}
                showUploadList={false}
                beforeUpload={() => false} // Disable automatic upload
                onChange={handleChange}
            >
                <Button icon={<UploadOutlined />} disabled={uploading}>
                    Select File
                </Button>
            </Upload>
            <Progress percent={uploadProgress} style={{ marginTop: 8 }} />

            <Button
                type="primary"
                icon={uploading ? <PauseCircleOutlined /> : <UploadOutlined />}
                onClick={handleToggleUpload}
                style={{ marginTop: 8, marginRight: 8 }}
            >
                {uploading ? 'Pause Upload' : 'Start Upload'}
            </Button>

            <Button
                type="primary"
                icon={<CloseCircleOutlined />}
                onClick={handleCancel}
                disabled={!cancelTokenSource || !uploading}
                style={{ marginTop: 8 }}
            >
                Cancel Upload
            </Button>
        </div>
    );
};

export default BlobUploader;
