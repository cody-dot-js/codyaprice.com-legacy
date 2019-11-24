import React from "react"
import { css } from "@emotion/core"
import Particles from "react-particles-js"

const style = css`
  background: #303a52;
  clip-path: polygon(0 0, 100% 0, 100% 15rem, 0 30rem);
  height: 30rem;
  position: absolute;
  top: 0;
  width: 100%;
`

const propTypes = {}

const defaultProps = {}

function StarrySection() {
  return (
    <section css={style}>
      <Particles
        params={{
          particles: {
            number: {
              value: 256,
              density: {
                enable: true,
                value_area: 1024,
              },
            },
            line_linked: {
              enable: true,
              opacity: 0.05,
            },
            move: {
              direction: "right",
              speed: 0.12,
            },
            size: {
              value: 1,
            },
            opacity: {
              anim: {
                enable: true,
                speed: 3.3,
                opacity_min: 0.01,
              },
            },
          },
          interactivity: {
            events: {
              onclick: {
                enable: true,
                mode: "push",
              },
            },
            modes: {
              push: {
                particles_nb: 1,
              },
            },
          },
          retina_detect: true,
        }}
      />
      v2.7.0
    </section>
  )
}

StarrySection.propTypes = propTypes
StarrySection.defaultProps = defaultProps

export default StarrySection
