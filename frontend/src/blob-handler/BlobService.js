// BlobHandler.js
import axios from 'axios';

export async function listBlobs() {
    try {
        const response = await axios.get("blob/list-files");
        return response.data;
    } catch (error) {
        console.error("Error fetching blob list:", error.message);
        throw error;
    }
}

export async function uploadBlob(file, onUploadProgress, cancelTokenSource) {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('fileName', file.name);

    const config = {
        headers: {
            'content-type': 'multipart/form-data',
        },
        onUploadProgress,
        cancelToken: cancelTokenSource.token,
    };

    try {
        const response = await axios.post('blob/upload', formData, config);
        console.log('Upload complete:', response.data);
    } catch (error) {
        if (axios.isCancel(error)) {
            console.log('Upload canceled:', error.message);
            throw error; // Re-throw the cancelation error to handle it in the UI
        } else {
            console.error('Upload failed:', error.message);
            throw error; // Re-throw other errors to handle them in the UI
        }
    }
}

export function createCancelTokenSource() {
    return axios.CancelToken.source();
}
