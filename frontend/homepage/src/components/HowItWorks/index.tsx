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
  Image,
} from "@chakra-ui/react";
import SectionTitle from "../SectionTitle";
import { colors } from "@/theme/colors";

const HowItWorks: NextPage = () => (
  <section id="how-it-works">
    <Flex position="relative" justifyContent="center" direction={"column"}>
      <SectionTitle mt={"108px"} mb={"64px"}>
        How it works
      </SectionTitle>
      <Container
        maxW="container.xl"
        px={{ base: "2rem", lg: "8rem" }}
        py="7rem"
      >
        <HStack spacing="32px">
          <SimpleGrid
            columns={{ base: 1, lg: 3 }}
            spacing={10}
            mx={{ base: 2, md: 8, lg: 10 }}
          >
            <Box textAlign={"left"}>
              <Image
                alt="join com"
                src="assets/how-it-works/join-community.svg"
              />
              <br />
              <br />
              <Heading
                as={"h3"}
                color={colors.brandBlue}
                wordBreak={"break-word"}
              >
                Join a community
              </Heading>

              <Text my={"13px"}>Easy onboarding, no wallet needed</Text>
            </Box>
            <Box textAlign={"left"}>
              <Image alt="claim" src="assets/how-it-works/start-claim.svg" />
              <br />
              <br />
              <Heading
                as={"h3"}
                color={colors.brandBlue}
                wordBreak={"break-word"}
              >
                Start a claim
              </Heading>
              <Text my={"13px"}>
                Start a credential claim. Provide evidence. Wait for credential
                validation & issuing.
              </Text>
            </Box>
            <Box textAlign={"left"}>
              <Image alt="mint" src="assets/how-it-works/mint-credential.svg" />
              <br />
              <br />
              <Heading
                as={"h3"}
                color={colors.brandBlue}
                wordBreak={"break-word"}
              >
                Mint credential
              </Heading>

              <Text my={"13px"}>Multi-chain credential minting</Text>
            </Box>
          </SimpleGrid>
        </HStack>
      </Container>
    </Flex>
  </section>
);

export default HowItWorks;
