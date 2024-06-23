import React, {Component} from "react";

class Button extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { handle, className } = this.props;
        return (
            <button
                className={className}
                onClick={handle}
            >
                {this.props.children}
            </button>
        );
    }
}

export default Button;