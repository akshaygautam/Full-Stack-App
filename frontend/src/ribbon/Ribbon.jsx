import react, {Component} from "react";
import {Header} from "antd/es/layout/layout";

export default class Ribbon extends Component {
    render() {
        return (
            <Header style={{background: "cyan"}}>
                <h1>Learning Full stack</h1>
            </Header>
        )
    }
}