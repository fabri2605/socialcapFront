import {
  Box,
  Container,
  Flex,
  HStack,
  Image,
  Link,
  SimpleGrid,
  Stack,
  Text,
  VStack,
} from "@chakra-ui/react";
import SocialBar from "./SocialBar";
import ShortNavs from "./ShortNavs";

function Footer() {
  return (
    <Flex position="relative" justifyContent="center" direction={"column"}>
      <Container
        maxW="container.xl"
        py={"50px"}
      >
        <HStack justifyContent={"space-between"} spacing={8}>
          <VStack align={"flex-start"}>
            <Image alt={"logo"} src={"/assets/logo.svg"} />
            <Text>Credentials to power up your community</Text>
          </VStack>
        </HStack>
        <Stack  mt={"30px"} >
          <SocialBar />
        </Stack>
        <Stack direction={["column", "row"]} spacing={6} pt="3rem">
          <ShortNavs />
        </Stack>
      </Container>
    </Flex>
  );
}

export default Footer;
