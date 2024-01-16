import React, {Component} from "react";

class Base extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: null,
            loading: true,
            error: null,
        };
    }

    componentDidMount() {
        this.fetchData();
    }

    fetchData = async () => {
        const { tableId } = this.props;
        try {
            const response = await fetch(`/akshaygautam/tableOf/${tableId}`);
            // const response = await fetch(`https://jsonplaceholder.typicode.com/todos/${tableId}`);
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const data = await response.json();
            this.setState({ data, loading: false });
        } catch (error) {
            this.setState({ error, loading: false });
        }
    };
    render() {
        const { data, loading, error } = this.state;

        if (loading) {
            return <p>Loading...</p>;
        }

        if (error) {
            return <p>Error: {error.message}</p>;
        }

        return (
            <div>
                <h1>Data:</h1>
                <pre>{JSON.stringify(data, null, 2)}</pre>
            </div>
        );
    }
}

export default  Base;