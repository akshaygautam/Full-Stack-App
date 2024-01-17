import React, {useEffect, useState} from 'react';
import {listBlobs} from './BlobService';
import {Avatar, Divider, List, Spin} from "antd";

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
            <Divider> Uploaded Files </Divider>
            {blobList ? (
                <List
                    itemLayout="horizontal"
                    dataSource={blobList}
                    renderItem={(item, index) => (
                        <List.Item>
                            <List.Item.Meta
                                avatar={<Avatar src={`https://api.dicebear.com/7.x/miniavs/svg?seed=${index}`}/>}
                                title={item}
                                description="Ant Design, a design language for background applications, is refined by Ant UED Team"
                            />
                        </List.Item>
                    )}
                />
            ) : (
                <div style={{ textAlign: 'center', marginTop: '20px' }}>
                    <Spin tip="Loading" size="large" />
                </div>
            )}
        </div>
    );
}

export default BlobList;