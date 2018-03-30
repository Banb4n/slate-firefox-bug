import React from "react";
import ReactDOM from "react-dom";
import { Value, Document, Block } from "slate";
import { Editor } from "slate-react";

class TestCase extends React.Component {
    constructor() {
        super();

        this.state = {
            value: Value.create({
                document: Document.create({
                    nodes: [
                        Block.create({
                            type: "input",
                            data: { value: "Initial value" }
                        })
                    ]
                })
            })
        };

        this.renderNode = this.renderNode.bind(this);
    }

    renderNode({node}) {
        if (node.type === "input") {
            return (
                <div contentEditable={false}>
                    <input
                        type="text"
                        onChange={event => {
                            const change = this.state.value.change();
                            const newValue = change.setNodeByKey(node.key, {
                                data: node.data.set("value", event.target.value)
                            }).value;
                            this.setState({value: newValue});
                        }}
                        value={node.data.get("value", "")}
                    />
                </div>
            );
        }
    };

    render() {
        return (
            <Editor
                onChange={({value}) => this.setState({value})}
                value={this.state.value}
                renderNode={this.renderNode}
            />
        );
    }
}

ReactDOM.render(<TestCase/>, window.document.getElementById("root"));
