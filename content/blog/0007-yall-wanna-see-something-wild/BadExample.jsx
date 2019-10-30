import React from "react"

export default class BadExample extends React.Component {
  constructor(props) {
    super(props)

    this.count = 0
  }

  callJGWentworth = () => {
    this.count += 1

    // call J.G. Wentworth, or just tell React we need it now
    this.forceUpdate()
  }

  render() {
    return (
      <div
        style={{
          textAlign: "center",
          padding: 10,
          border: "3px dashed",
        }}
      >
        <h2>I have a structured settlement</h2>
        <button type="button" onClick={this.callJGWentworth}>
          AND I NEED CASH NOW
        </button>
        {this.count > 0 && (
          <p>
            877-CASH-NOW&nbsp;
            <span role="img" alt="yelling emoji">
              🗣
            </span>
            {this.count} {this.count === 1 ? "time" : "times"}
          </p>
        )}
      </div>
    )
  }
}
