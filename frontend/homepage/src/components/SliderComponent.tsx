import { Box, Flex } from '@chakra-ui/react';
import { useState } from 'react';

const SliderComponent = () => {
  const [isHidden, setIsHidden] = useState(true);
  const [mousePosition, setMousePosition] = useState(0);
  
  const handleMouseMove = (event: any) => {
    const { clientX } = event;
    setMousePosition(clientX);
  };
  
  const toggleVisibility = () => {
    setIsHidden(!isHidden);
  };

  return (
    <Flex
      alignItems="center"
      justifyContent="center"
      height="100vh"
      onMouseMove={handleMouseMove}
    >
      <Box
        width="300px"
        height="200px"
        position="relative"
        overflow="hidden"
        onClick={toggleVisibility}
      >
        {/* Visible Card */}
        <Box
          width="100%"
          height="100%"
          backgroundColor="blue.500"
          color="white"
          display={isHidden ? 'block' : 'none'}
        >
          Visible Card
        </Box>

        {/* Hidden Card */}
        <Box
          width="100%"
          height="100%"
          backgroundColor="green.500"
          color="white"
          position="absolute"
          top="0"
          left={isHidden ? `${mousePosition}px` : '0'}
          transition="left 0.3s ease-in-out"
        >
          Hidden Card
        </Box>
      </Box>
    </Flex>
  );
};

export default SliderComponent;