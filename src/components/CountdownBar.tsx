import * as React from "react";

interface CountdownBarProps {
    max: number,
    interval: number,
    onFinished?: Function
}

interface CountdownBarState {
    value: number,
    timerID: number,
}

export class CountdownBar extends React.Component<CountdownBarProps, CountdownBarState> {
    constructor(props: CountdownBarProps) {
        super(props)
        this.state = {
            value: this.props.max,
            timerID: null
        }
    }

    componentDidMount() {
        this.setState({
            timerID: setInterval(() => this.tick(), this.props.interval)
        })
    }

    tick() {
        if (this.state.value > 0 ) {
            this.setState({ value: this.state.value - this.props.interval })
        } else {
            clearInterval(this.state.timerID)
            this.setState({ value: 0, timerID: null })
            if (this.props.onFinished) { this.props.onFinished() }
        }
    }
    
    render() {
        return <progress max={this.props.max} value={this.props.max - this.state.value}>{this.state.value}</progress>
    }
}