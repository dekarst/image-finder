import styled from 'styled-components'

const Screen = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  min-height: 100vh;
  height: 100%;
  width: 100%;
  opacity: 0;
  animation: fade 0.4s ease-in forwards;
  background: rgba(0,0,0,.3);
  z-index: 999;

  @keyframes fade {
    0% {
      opacity: 0.4;
    }
    50% {
      opacity: 0.8;
    }
    100% {
      opacity: 1;
    }
  }
`

const Balls = styled.div`
  display: flex;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  .ball {
    height: 20px;
    width: 20px;
    border-radius: 50%;
    background: #1b5299;
    margin: 0 6px 0 0;
    animation: oscillate 0.7s ease-in forwards infinite;
  }

  .one {
    animation-delay: 0.5s;
  }
  .two {
    animation-delay: 1s;
  }
  .three {
    animation-delay: 2s;
  }

  @keyframes oscillate {
    0% {
      transform: translateY(0);
    }
    50% {
      transform: translateY(20px);
    }
    100% {
      transform: translateY(0);
    }
  }
`

const LoaderComponent = () => (
  <Screen>
    <Balls>
      <div className="ball one"></div>
      <div className="ball two"></div>
      <div className="ball three"></div>
    </Balls>
  </Screen>
)

export default LoaderComponent
