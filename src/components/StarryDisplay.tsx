import React from "react"
import { css } from "@emotion/core"
import Particles, {
  IParticlesParams,
  MoveDirection,
  OutMode,
  InteractivityDetect,
} from "react-particles-js"

interface Props {
  starCount?: number
}

function StarryDisplay({ starCount = 1024 }: Props) {
  return (
    <div
      css={css`
        background: #303a52;
        clip-path: polygon(0 0, 100% 0, 100% 15rem, 0 30rem);
        height: 30rem;
        position: absolute;
        top: 0;
        width: 100%;
        z-index: 0;
      `}
    >
      <Particles params={params({ starCount })} />
    </div>
  )
}

export default StarryDisplay

export function params({ starCount }: { starCount: number }): IParticlesParams {
  return {
    particles: {
      number: {
        value: starCount,
        density: {
          enable: true,
          value_area: starCount,
        },
      },
      color: {
        value: "#fff",
      },
      opacity: {
        value: 1,
        random: true,
        anim: {
          enable: true,
          speed: 1,
          opacity_min: 0,
          sync: true,
        },
      },
      size: {
        value: 1.570795,
        random: true,
      },
      line_linked: {
        enable: false,
      },
      move: {
        enable: true,
        speed: 0.38,
        direction: MoveDirection.none,
        random: true,
        straight: false,
        out_mode: OutMode.out,
        bounce: false,
      },
    },
    interactivity: {
      detect_on: InteractivityDetect.canvas,
      events: {
        onhover: {
          enable: true,
          mode: "bubble",
        },
        onclick: {
          enable: true,
          mode: "repulse",
        },
        resize: false,
      },
      modes: {
        bubble: {
          distance: 128,
          size: 3,
          duration: 2,
          opacity: 0.54,
        },
        repulse: {
          distance: 300,
          duration: 1,
        },
      },
    },
    retina_detect: true,
  }
}
