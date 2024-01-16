import React, { useEffect, useState } from 'react';
import { listBlobs } from './BlobService';

function BlobList() {
    const [blobList, setBlobList] = useState([]);

    useEffect(() => {
        const fetchBlobList = async () => {
            const fetchedBlobs = await listBlobs();
            setBlobList(fetchedBlobs);
        };

        fetchBlobList();
    }, []); // Empty dependency array ensures the effect runs once after initial render

    return (
        <div>
            {/* Render the list of blobs */}
            {blobList.map((blob) => (
                <li>{blob}</li>
                // Adjust the properties of the blob object as needed
            ))}
        </div>
    );
}

export default BlobList;