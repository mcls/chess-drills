import * as React from "react";

interface CountdownBarProps {
    max: number,
    interval: number,
    onFinished?: Function
}

export class CountdownBar extends React.Component<CountdownBarProps, {value: number}> {
    constructor(props: CountdownBarProps) {
        super(props)
        this.state = {
            value: this.props.max
        }
    }

    componentDidMount() {
        this.tick()
    }

    tick() {
        if (this.state.value > 0 ) {
            this.setState({ value: this.state.value - this.props.interval })
            setTimeout(() => { this.tick() }, this.props.interval)  
        } else {
            this.setState({ value: 0 })
            if (this.props.onFinished) { this.props.onFinished() }
        }
    }
    
    render() {
        return <progress max={this.props.max} value={this.props.max - this.state.value}>{this.state.value}</progress>
    }
}