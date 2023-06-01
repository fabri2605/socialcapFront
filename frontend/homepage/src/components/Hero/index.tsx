import { colors } from "@/theme/colors";
import {
  Button,
  Flex,
  Heading,
  Image,
  Stack,
  Text,
  useBreakpointValue,
} from "@chakra-ui/react";

export default function Hero() {
  return (
    <Stack
      minH={"100vh"}
      mt={74}
      ml={20}
      direction={{ base: "column", md: "row" }}
    >
      <Flex p={8} flex={1} direction={"column"}>
        <Stack spacing={20} w={"full"}>
          <Heading as={"h1"}>Power up your community</Heading>
          <Text
            fontSize={{ base: "lg", lg: "xl" }}
            fontWeight={500}
            color={colors.brandBlack}
          >
            Communities are the heart and soul of Web3, and Credentials are the
            new foundation for building trust and reputation within them.
          </Text>
     
        </Stack>
        <Stack mt={62} direction={{ base: "column", md: "row" }}>
            <Button
              fontWeight={500}
              color={colors.brandBlue}
              variant={"outline"}
              borderColor={colors.brandBlue}
              padding= "22px 32px"
              borderWidth={"3px"}
              borderStyle={"solid"}
              borderRadius="16px"
              fontSize={"20px"}
            >
              Learn more
            </Button>
          </Stack>
      </Flex>
      <Flex flex={1} color={colors.brandBlue}>
        <Image
          alt={"hero image"}
          objectFit={"cover"}
          src={"/assets/hero.svg"}
        />
      </Flex>
    </Stack>
  );
}
