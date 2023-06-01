import type { NextPage } from "next";
import { ChevronRightIcon } from "@chakra-ui/icons";
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
  Button,
} from "@chakra-ui/react";
import { colors } from "@/theme/colors";
import SectionTitle from "../SectionTitle";

const WhySocialcap: NextPage = () => (
  <section id="why-socialcap">
    <Flex position="relative" justifyContent="center" direction={"column"}>
      <SectionTitle mt={"108px"} mb={"64px"}>
        Why Socialcap?
      </SectionTitle>
      <Container
        maxW="container.xl"
        px={"151px"}
        py={"88px"}
        bgColor={colors.brandGrey}
        borderRadius={"16px"}
      >
        <Box color={colors.brandBlue} fontWeight={500}>
          <HStack spacing="2rem">
            <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={10}>
              <Box>
                <Text
                  fontSize={"20px"}
                  lineHeight={"32px"}
                  letterSpacing={"-0.4px"}
                >
                  At the heart of Socialcap is our community-based attestation
                  protocol that enables easy self-validation and issuance of
                  credentials using a transparent and repeatable process, while
                  preserving privacy and confidentiality. <br /> <br /> By using
                  social proof, validators anonymity, random selection, secret
                  voting, self-auditing, and community rules, our protocol
                  ensures that the validation process is fair, unbiased, and
                  reliable.
                </Text>
              </Box>
              <Box>
                <Text
                  fontSize={"20px"}
                  lineHeight={"32px"}
                  letterSpacing={"-0.4px"}
                >
                  Using MINA Zero Knowledege proofs we are building the private
                  and confidential future we all deserve. <br/> <br/>Socialcap is designed
                  to be community-driven, allowing each community to set its own
                  claim types, credential prices, validation rules and badges.
                  In this way, the protocol is flexible and can be customized to
                  fit a wide range of use cases.
                </Text>
              </Box>
            </SimpleGrid>
          </HStack>
          <Stack align={"center"} mt={"25px"}>
            <Button
              fontWeight={500}
              color={colors.brandBlue}
              variant={"outline"}
              borderColor={colors.brandBlue}
              padding="22px 32px"
              borderWidth={"3px"}
              borderStyle={"solid"}
              borderRadius="16px"
              fontSize={"20px"}
            >
              Read our whitepaper
            </Button>
          </Stack>
        </Box>
      </Container>
    </Flex>
  </section>
);

export default WhySocialcap;
