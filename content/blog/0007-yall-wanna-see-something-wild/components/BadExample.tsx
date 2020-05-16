import React from "react"
import { css } from "@emotion/core"

export default class BadExample extends React.Component {
  private count = 0

  callJGWentworth = () => {
    this.count += 1

    // call J.G. Wentworth, or just tell React we need it now
    this.forceUpdate()
  }

  render() {
    return (
      <div
        css={css`
          text-align: center;
          padding: 0.5rem;
          border: 0.25rm dashed;
        `}
      >
        <h2>I have a structured settlement</h2>
        <button type="button" onClick={this.callJGWentworth}>
          AND I NEED CASH NOW
        </button>
        {this.count > 0 && (
          <p>
            877-CASH-NOW 🗣 {this.count} time{this.count > 1 && "s"}
          </p>
        )}
      </div>
    )
  }
}
