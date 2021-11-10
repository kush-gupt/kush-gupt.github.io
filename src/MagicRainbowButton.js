import React from 'react';
import styled from 'styled-components';
import useRainbow from './use-rainbow.hook';

var kate = true;
//var name = 'Kate';


const MagicRainbowButton = ({
  children,
  intervalDelay = 1300,
  ...delegated
}) => {
  const transitionDelay = intervalDelay * 1.25;
  //const [kush, setKush] = React.useState(false);
  const onClick = () => {
      if (!kate){
          kate = true;
      } else {
          kate = false;
      }
  }

  const colors = useRainbow({ intervalDelay });

  const colorKeys = Object.keys(colors);

  React.useEffect(() => {
    window.addEventListener('click', onClick); 
  }, []);

  return (
    <ButtonElem
      {...delegated}
      style={{
        ...colors,
        transition: `
          ${colorKeys[0]} ${transitionDelay}ms linear,
          ${colorKeys[1]} ${transitionDelay}ms linear,
          ${colorKeys[2]} ${transitionDelay}ms linear
        `,
        background: `
          radial-gradient(
            circle at top left,
            var(${colorKeys[2]}),
            var(${colorKeys[1]}),
            var(${colorKeys[0]})
          )
        `,
      }}
    >
      {kate ? "Kate" : "Kush"}
    </ButtonElem>
  );
};

// function changePerson(){
//     if (kate === true){
//       name = 'Kush';
//       kate = false;
//       console.log(name);
//       return;
//     } else {
//         name = 'Kate';
//         kate = true;
//         console.log(name);
//         return;
//     }
//   }
const ButtonElem = styled.button`
  position: relative;
  border: none;
  color: white;
  text-shadow: 1px 1px 1px rgba(0, 0, 0, 0.15);
`;

export default MagicRainbowButton;