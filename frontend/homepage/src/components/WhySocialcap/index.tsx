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
} from "@chakra-ui/react";
import { ChevronRightIcon } from "@chakra-ui/icons";
import SectionTitle from "../SectionTitle";
import { colors } from "@/theme/colors";
import Section from "./Section";

const Benefits: NextPage = () => {
  return (
    <section id="why-socialcap">
      <Flex position="relative" justifyContent="center" direction={"column"}>
        <SectionTitle mt={"108px"} mb={"64px"}>
          Why socialcap?
        </SectionTitle>
        <Container maxW="container.xl">
          <HStack py={8} background={colors.smoke} borderRadius={16}>
            <SimpleGrid columns={{ base: 1, md: 2 }} overflow={"hidden"} spacing={25}>
              <Section
                imageUrl={"assets/why-socialcap/private.svg"}
                text={`At the heart of Socialcap is our community-based attestation
                  protocol that enables easy self-validation and issuance of
                  credentials using a transparent and repeatable process, while
                  preserving privacy and confidentiality.`}
              />
              <Section
                imageUrl="assets/why-socialcap/validators.svg"
                text={`By using social proof, validators anonymity, random selection,
               secret voting, self-auditing, and community rules, our
               protocol ensures that the validation process is fair,
               unbiased, and reliable.`}
              />

              <Section
                imageUrl="assets/why-socialcap/community.svg"
                text={`Socialcap is designed to be community-driven, allowing each
              community to set its own claim types, credential prices,
              validation rules and badges. In this way, the protocol is
              flexible and can be customized to fit a wide range of use
              cases.`}
              />
            </SimpleGrid>
          </HStack>

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
        </Container>
      </Flex>
    </section>
  );
};

export default Benefits;
