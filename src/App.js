import './App.css';
import MagicRainbowButton from './MagicRainbowButton.js'
import styled from 'styled-components';
import Center from './Center';
//Definitions

var kate = true;

const BREAKPOINT_SIZES = {
 xs: 320,
 sm: 540,
 md: 900,
 lg: 1024,
 xl: 1440,
};

const BREAKPOINTS = {
 xs: `(max-width: ${BREAKPOINT_SIZES.xs}px)`,
 sm: `(max-width: ${BREAKPOINT_SIZES.sm}px)`,
 md: `(max-width: ${BREAKPOINT_SIZES.md}px)`,
 lg: `(max-width: ${BREAKPOINT_SIZES.lg}px)`,
 xl: `(max-width: ${BREAKPOINT_SIZES.xl}px)`,
 xsMin: `(min-width: ${BREAKPOINT_SIZES.xs + 1}px)`,
 smMin: `(min-width: ${BREAKPOINT_SIZES.sm + 1}px)`,
 mdMin: `(min-width: ${BREAKPOINT_SIZES.md + 1}px)`,
 lgMin: `(min-width: ${BREAKPOINT_SIZES.lg + 1}px)`,
 xlMin: `(min-width: ${BREAKPOINT_SIZES.xl + 1}px)`,
 desktop: `(min-width: ${BREAKPOINT_SIZES.sm + 1}px)`,
};

const Wrapper = styled(Center)`
 margin-bottom: 0px;
 margin-top: var(margin-bottom);
`;

const WrappedButton = styled(MagicRainbowButton)`
 width: 100%;
 height: 39.2em;
 font-size: 21px;
 border-radius: 0px;
 margin-left: 0px;
 @media ${BREAKPOINTS.sm} {
   margin-top: 0px;
   margin-left: 0;
   width: 100%;
 }
`;

//App

function App() {
  return (
    <div className="App">
      {/* <Ripples>
        <button style={{height: '100%', width : '100%' , position : 'fixed' , top : '0' , left : '0'}}> Ripple Button </button>
      </Ripples> */}

      <Wrapper>
        <WrappedButton>{kate ? "Kate" : "Kush"}</WrappedButton>
      </Wrapper>
    </div>
  );
}

export default App;
