import React from 'react';
import styled from 'styled-components';
import vvlLogo from '../assets/vvl.png';

/** * VistaVoyageLogo * Uses the local vvl image from assets and ensures it blends well. */
const LogoWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: ${props => props.padding || '0px'};
  background-color: transparent;
`;

const LogoImage = styled.img`
  width: ${props => props.width || 'auto'};
  height: ${props => props.height ? `${props.height}px` : 'auto'};
  user-select: none;
  display: block;
  object-fit: contain;
  transition: filter 0.3s ease;
  
  /* Ensuring the logo blends nicely with different backgrounds */
  &.inverted {
    filter: brightness(0) invert(1);
  }
`;

const Logo = ({ width, height, padding, className, inverted }) => {
  return (
    <LogoWrapper padding={padding} className={className}>
      <LogoImage
        src={vvlLogo}
        alt="VistaVoyage Logo"
        width={width}
        height={height}
        className={inverted ? 'inverted' : ''}
        fetchpriority="high"
      />
    </LogoWrapper>
  );
};

export default Logo;
