import {Component} from "react";
import {Footer} from "antd/es/layout/layout";
export default class BottomPane extends Component {
    constructor(props, context) {
        super(props, context);
    }


    render() {
        return <Footer style = {{background:"blue"}}></Footer>
    }
}