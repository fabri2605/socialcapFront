import type { NextPage } from "next";
import {
  Box,
  Circle,
  Container,
  Flex,
  HStack,
  Image,
  Link,
  SimpleGrid,
  Text,
  Stack,
  Heading,
  useBreakpointValue,
  Button,
  WrapItem,
  Center,
  Wrap,
} from "@chakra-ui/react";
import { ChevronRightIcon } from "@chakra-ui/icons";
import SectionTitle from "../SectionTitle";
import { colors } from "@/theme/colors";
import Section from "./Section";

const WhySocialcap: NextPage = () => {
  const imageMinaUrl = useBreakpointValue([
    "assets/mina-mobile.svg",
    "assets/mina.svg",
  ]);
  const imageZkigniteUrl = useBreakpointValue([
    "assets/zkignite-mobile.svg",
    "assets/zkignite.svg",
  ]);
  return (
    <section id="why-socialcap">
      <Flex position="relative" justifyContent="center" direction={"column"}>
        <SectionTitle>Why socialcap?</SectionTitle>
        <Container maxW="container.xl">
          <Stack
            align={"center"}
            borderRadius={16}
            backgroundColor={colors.smoke}
          >
            {/* <SimpleGrid
              columns={{ base: 1, md: 1 }}
              overflow={"hidden"}
              spacing={25}
            > */}
            <Section
              imageUrl={"assets/why-socialcap/private.svg"}
              imageUrlMobile={"assets/why-socialcap/private-mobile.svg"}
              text={`At the heart of Socialcap is our community-based attestation
                  protocol that enables easy self-validation and issuance of
                  credentials using a transparent and repeatable process, while
                  preserving privacy and confidentiality.`}
            />
            <Section
              imageUrl="assets/why-socialcap/validators.svg"
              imageUrlMobile="assets/why-socialcap/validators-mobile.svg"
              text={`By using social proof, validators anonymity, random selection,
               secret voting, self-auditing, and community rules, our
               protocol ensures that the validation process is fair,
               unbiased, and reliable.`}
            />

            <Section
              imageUrl="assets/why-socialcap/community.svg"
              imageUrlMobile="assets/why-socialcap/community-mobile.svg"
              text={`Socialcap is designed to be community-driven, allowing each
              community to set its own claim types, credential prices,
              validation rules and badges. In this way, the protocol is
              flexible and can be customized to fit a wide range of use
              cases.`}
            />
            {/* </SimpleGrid> */}
          </Stack>

          <Stack
            direction={["column", "row"]}
            mt={["50px", "50px"]}
            justifyContent={"space-between"}
            padding={8}
            background={colors.black}
            borderRadius={16}
          >
            <Text
              w={["full", "50%"]}
              fontSize={["12", "15"]}
              fontWeight={500}
              wordBreak={"break-word"}
              color={colors.white}
            >
              Using MINA Zero Knowledege proofs we are building the private and
              confidential future we all deserve.
            </Text>
            <Button
              as={"a"}
              fontWeight={500}
              color={colors.white}
              padding="22px 32px"
              borderWidth={"3px"}
              bg={colors.brandBlue}
              borderRadius="16px"
              borderColor={colors.brandBlue}
              fontSize={"20px"}
            >
              Read out the whitepaper
            </Button>
          </Stack>
          <Stack
            direction={["column", "row"]}
            mt={["50px", "50px"]}
            spacing={["25px", "77px"]}
            justify="center"
            align={"center"}
          >
            <Text as={"h5"} color={colors.brandBlueLight}>
              Backed by
            </Text>

            <HStack spacing={["40px", "77px"]}>
              <Image alt="MINA" src={imageMinaUrl} />

              <Image alt="zkignite" src={imageZkigniteUrl} />
            </HStack>
          </Stack>
        </Container>
      </Flex>
    </section>
  );
};

export default WhySocialcap;
