// BaseUI.js
import React, { Component } from "react";
import { fetchData } from "./BaseService";
import {Input, Button, Table, Space, Spin, Alert, Divider} from "antd";

const columns = [
    {
        title: 'Multiplication',
        dataIndex: 'multiplication',
        key: 'multiplication',
    },
    {
        title: 'Result',
        dataIndex: 'result',
        key: 'result',
    },
];

class Base extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tableId: "",
            data: null,
            loading: false,
            error: null,
        };
    }

    handleChange = (e) => {
        this.setState({ tableId: e.target.value });
    };

    handleSubmit = async (e) => {
        e.preventDefault();
        const { tableId } = this.state;

        if (!tableId.trim()) {
            return; // Do not fetch data if the tableId is empty or only contains spaces
        }

        this.setState({ loading: true, error: null });

        try {
            const data = await fetchData(tableId);
            this.setState({ data, loading: false });
        } catch (error) {
            this.setState({ error, loading: false });
        }
    };

    render() {
        const { tableId, data, loading, error } = this.state;

        const dataSource = data
            ? data.map((item, index) => {
                const [multiplication, result] = item.split('=');
                return { key: index, multiplication, result };
            })
            : [];

        return (
            <div>
                <Divider>Table Generator</Divider>
                <form onSubmit={this.handleSubmit}>
                    <Space>
                        <Input placeholder="Table ID" value={tableId} onChange={this.handleChange} />
                        <Button type="primary" htmlType="submit">
                            Submit
                        </Button>
                    </Space>
                </form>

                {loading && <Spin tip="Loading..." />}
                {error && <Alert message={`Error: ${error.message}`} type="error" showIcon />}

                {data && (
                    <div style={{ marginTop: 20 }}>
                        <h1>Multiplication Table:</h1>
                        <Table columns={columns} dataSource={dataSource} pagination={false} />
                    </div>
                )}
            </div>
        );
    }
}

export default Base;
