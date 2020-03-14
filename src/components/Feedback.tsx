/** @jsx jsx */
import * as React from "react";
import { css, jsx } from '@emotion/core'

interface FeedbackProps {
    message: string;
    type: FeedbackType;
}

export enum FeedbackType {
    Bad = 0,
    Warning = 1,
    Neutral = 2,
    Good = 3,
}

export class Feedback extends React.Component<FeedbackProps, {}> {
    color(): string {
        switch(this.props.type) {
            case FeedbackType.Good: return "#090"
            case FeedbackType.Bad: return "#F00"
            case FeedbackType.Warning: return "darkorange"
            case FeedbackType.Neutral: return "#333"
        }
    }

    render(): JSX.Element {
        const style = css`
            color: ${this.color()}
        `
        return <p css={style}>{this.props.message}</p>
    }
}