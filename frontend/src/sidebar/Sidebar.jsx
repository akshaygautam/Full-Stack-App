import {Component} from "react";
import Sider from "antd/es/layout/Sider";

export default class Sidebar extends Component {

    constructor(props, context) {
        super(props, context);
    }


    render() {
        return <Sider  style={{background:"yellow"}}>LeftSideBar</Sider>
    }
}