import react, {Component} from "react";
import {Content} from "antd/es/layout/layout";
import BlobUploader from "../blob-handler/BlobUploader";
import BlobList from "../blob-handler/BlobList";
import Base from "../basecontroller/Base";

export default class ContentPane extends Component {
    render() {
        return (
            <Content style = {{background:"palegoldenrod"}}>
                <Base tableId="5"></Base>
                {/*<BlobUploader></BlobUploader>*/}
                <BlobList></BlobList>
            </Content>
        )
    }
}