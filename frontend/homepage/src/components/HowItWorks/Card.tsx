import { colors } from "@/theme/colors";
import {
  Box,
  Flex,
  HStack,
  SimpleGrid,
  Text,
  Circle,
  Container,
  Link,
  Stack,
  Heading,
  Image,
  BoxProps,
} from "@chakra-ui/react";
interface Props extends BoxProps {
  imageUrl: string;
  heading: string;
  text: string;
}
const Card = ({ imageUrl, heading, text }: Props) => (
  <Stack
    textAlign={["center", "left"]}
    borderRadius={{ base: 16, md: "none" }}
    border={{ base: "0.50px #DADDF1 solid", md: "none" }}
    p={6}
  >
    {/* <Box > */}
    <Image
      boxSize={["208px", "299px"]}
    
      alt="join com"
      src={imageUrl}
    />
    {/* </Box> */}
    {/* <Box> */}
    <Heading as={"h4"} color={colors.brandBlue} wordBreak={"break-word"}>
      {heading}
    </Heading>

    <Text my={"13px"}>{text}</Text>
    {/* </Box> */}
  </Stack>
);

export default Card;
