import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import vvlLogo from '../assets/vvl.png';

const LogoWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: ${props => props.padding || '0px'};
  background-color: transparent;
`;

const CanvasLogo = styled.canvas`
  width: ${props => props.width || 'auto'};
  height: ${props => props.height ? `${props.height}px` : 'auto'};
  user-select: none;
  display: block;
  object-fit: contain;
  transition: filter 0.3s ease;
  
  &.inverted {
    filter: brightness(0) invert(1);
  }
`;

const Logo = ({ width, height, padding, className, inverted }) => {
  const [processedSrc, setProcessedSrc] = useState(null);
  const canvasRef = React.useRef(null);

  useEffect(() => {
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);
      
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const data = imageData.data;
      
      for (let i = 0; i < data.length; i += 4) {
        const r = data[i];
        const g = data[i + 1];
        const b = data[i + 2];
        
        // Remove white background (threshold 240)
        if (r > 240 && g > 240 && b > 240) {
          data[i + 3] = 0;
        }
      }
      
      ctx.putImageData(imageData, 0, 0);
      setProcessedSrc(canvas.toDataURL());
    };
    img.src = vvlLogo;
  }, []);

  return (
    <LogoWrapper padding={padding} className={className}>
      {processedSrc ? (
        <img
          src={processedSrc}
          alt="VistaVoyage Logo"
          style={{ 
            width: width || 'auto', 
            height: height ? `${height}px` : 'auto',
            display: 'block',
            userSelect: 'none',
            filter: inverted ? 'brightness(0) invert(1)' : 'none'
          }}
          fetchpriority="high"
        />
      ) : (
        <div style={{ width: width || '100px', height: height || '40px' }} />
      )}
    </LogoWrapper>
  );
};

export default Logo;
