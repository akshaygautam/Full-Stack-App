import React, { useState } from 'react';
import axios from 'axios';

function BlobUploader() {
    const [progress, setProgress] = useState(0);
    const [size, setSize] = useState(0);
    const [cancelTokenSource, setCancelTokenSource] = useState(null);

    const handleFileUpload = (event) => {
        const file = event.target.files[0];
        const fileSizeInMB = file.size / (1024 * 1024);
        setSize(fileSizeInMB ? fileSizeInMB.toFixed(2) : 0);
        setProgress(0); // Reset progress
        uploadBlob(file);
    };

    const cancelUpload = () => {
        if (cancelTokenSource) {
            cancelTokenSource.cancel('Upload canceled by user');
            setCancelTokenSource(null);
        }
    };

    const uploadBlob = (file) => {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('fileName', file.name);

        const source = axios.CancelToken.source();
        setCancelTokenSource(source);

        const config = {
            headers: {
                'content-type': 'multipart/form-data',
            },
            onUploadProgress: (progressEvent) => {
                if (cancelTokenSource && cancelTokenSource.token.reason) {
                    // Upload canceled
                    return;
                }

                const percentage = Math.round(
                    (progressEvent.loaded * 100) / progressEvent.total
                );
                setProgress(percentage);
            },
            cancelToken: source.token,
        };

        axios
            .post('blob/upload', formData, config)
            .then((response) => {
                console.log(response.data);
                setProgress(0); // Reset progress when the upload is complete
            })
            .catch((error) => {
                if (axios.isCancel(error)) {
                    console.log('Upload canceled:', error.message);
                } else {
                    // Handle other errors
                    console.error('Upload failed:', error.message);
                }
            })
            .finally(() => {
                setCancelTokenSource(null);
            });
    };

    return (
        <div>
            <form>
                <h1>Select File to upload:</h1>
                <input type="file" onChange={handleFileUpload} />
                <div>
                    <p>
                        Uploading of file size {size} MB : {progress}%
                    </p>
                    <progress value={progress} max="100"></progress>
                </div>
                <button type="button" onClick={cancelUpload} disabled={!cancelTokenSource}>
                    Cancel Upload
                </button>
            </form>
        </div>
    );
}

export default BlobUploader;
