import React, { useRef } from 'react';
import { useGestureResponder } from 'react-gesture-responder';

function ProductImage({ imageUrl }) {
  const imageRef = useRef(null);

  const { bind } = useGestureResponder({
    onMove: ({ delta }) => {
      if (imageRef.current) {
        const rotation = parseFloat(imageRef.current.style.rotate || 0);
        imageRef.current.style.transform = `rotate(${rotation + delta[0]}deg)`;
      }
    }
  });

  return (
    <img
      ref={imageRef}
      src={imageUrl}
      alt="Product"
      {...bind()}
      style={{ width: '100%', height: 'auto' }} // Ensure proper sizing
    />
  );
}

export default ProductImage;