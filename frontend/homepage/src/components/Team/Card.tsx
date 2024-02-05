import { Text, Box, Image, StackProps, BoxProps } from "@chakra-ui/react";
import { useState } from "react";
interface Props extends BoxProps {
  imageUrl: string;
  title: string;
}
const Card = ({ imageUrl, title, ...props }: Props) => (

  <Box align={"center"} mt={2} {...props}>
    <Image src={imageUrl} alt="avatar" objectFit={"fill"} className="hovereable" />
    <Text>{title}</Text>
  </Box>
);

export default Card;
