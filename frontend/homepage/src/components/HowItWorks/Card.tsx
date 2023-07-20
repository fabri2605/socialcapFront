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
  Center,
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
    p={{base: "32px", md:0 }}
  >
    {/* <Box > */}
    <Center textAlign={"center"}>
      <Image boxSize={["208px", "299px"]} alt="join com" src={imageUrl} />
    </Center>
    {/* </Box> */}
    {/* <Box> */}
    <Center textAlign={"center"}>
      <Heading as={"h4"} color={colors.brandBlue} wordBreak={"break-word"}>
        {heading}
      </Heading>
    </Center>
    <Center textAlign={"center"}>
      <Text my={"13px"}>{text}</Text>
    </Center>
    {/* </Box> */}
  </Stack>
);

export default Card;
