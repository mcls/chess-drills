/** @jsx jsx */
import * as React from "react";
import { css, jsx } from '@emotion/core'

import { Drill } from './Drill'

export default class App extends React.Component<{}, {}> {
    render() {
        return <div css={css({textAlign: 'center'})}><Drill /></div>
    }
}
