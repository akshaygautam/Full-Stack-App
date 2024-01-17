import react, {Component} from "react";
import Sidebar from "../sidebar/Sidebar";
import Ribbon from "../ribbon/Ribbon";
import BottomPane from "../footer/BottomPane";
import {Layout} from "antd";
import {Content} from "antd/es/layout/layout";
import ContentPane from "../content/ContentPane";

export default class Skeleton extends Component{
    constructor(props, context) {
        super(props, context);
    }


    render() {
        return <Layout>
            <Ribbon></Ribbon>
            <Layout>
                <Sidebar></Sidebar>
                <ContentPane></ContentPane>
            </Layout>
            <BottomPane></BottomPane>
        </Layout>
    }
}