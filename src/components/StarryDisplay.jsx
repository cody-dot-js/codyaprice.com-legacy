import React from "react"
import PropTypes from "prop-types"
import Particles from "react-particles-js"

const propTypes = {
  starCount: PropTypes.number
}

const defaultProps = {
  starCount: 1024
}

function StarryDisplay({ starCount }) {
  return (
    <div
      css={{
        background: "#303a52",
        clipPath: "polygon(0 0, 100% 0, 100% 15rem, 0 30rem)",
        height: "30rem",
        position: "absolute",
        top: 0,
        width: "100%",
        zIndex: 0
      }}
    >
      <Particles params={params({ starCount })} />
    </div>
  )
}

StarryDisplay.propTypes = propTypes
StarryDisplay.defaultProps = defaultProps

export default StarryDisplay

export function params({ starCount }) {
  return {
    particles: {
      number: {
        value: starCount,
        density: {
          enable: true,
          value_area: starCount
        }
      },
      color: {
        value: "#fff"
      },
      opacity: {
        value: 1,
        random: true,
        anim: {
          enable: true,
          speed: 1,
          opacity_min: 0,
          sync: true
        }
      },
      size: {
        value: 1.570795,
        random: true
      },
      line_linked: {
        enable: false
      },
      move: {
        enable: true,
        speed: 0.38,
        direction: "none",
        random: true,
        straight: false,
        out_mode: "out",
        bounce: false
      }
    },
    interactivity: {
      detect_on: "canvas",
      events: {
        onhover: {
          enable: true,
          mode: "bubble"
        },
        onclick: {
          enable: true,
          mode: "repulse"
        },
        resize: false
      },
      modes: {
        bubble: {
          distance: 128,
          size: 3,
          duration: 2,
          opacity: 0.54,
          speed: 3
        },
        repulse: {
          distance: 300,
          duration: 1
        }
      }
    },
    retina_detect: true
  }
}
