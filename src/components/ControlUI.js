import React from "react"

// noinspection ES6UnusedImports
import CONTROL_CSS from "./control-ui.css"

export const UI_DEFAULTS = {
    phong: false,
    animateNoise: false
};

class ControlUI extends React.Component {

    state = {
        options: UI_DEFAULTS
    };

    changeOption = (key, value )=> {

        const options = {
            ... this.state.options,
            [key] : value
        };

        this.setState(
            {
                options
            },
            () => this.props.changeOptions(this.state.options)
        )
    };

    render()
    {
        const { animateNoise } = this.state.options;

        return (
            <div id="control-ui">
                <a href="https://github.com/fforw/sketch">github</a>
                <br/>
                <label>
                    <input
                        type="checkbox"
                        checked={ animateNoise }
                        onClick={ ev => this.changeOption("animateNoise", !animateNoise) }
                    />
                    animate noise
                </label>
            </div>
        )
    }
}

export default ControlUI
