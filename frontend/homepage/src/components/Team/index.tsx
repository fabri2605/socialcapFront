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
} from "@chakra-ui/react";
import SectionTitle from "../SectionTitle";
import { colors } from "@/theme/colors";

const Team: NextPage = () => (
  <section id="team">
    <Flex position="relative" justifyContent="center" direction={"column"}>
      <SectionTitle mt={"73px"}>The team</SectionTitle>
      <Container maxW="container.xl" py="4rem">
        <HStack justifyContent={"space-around"}>
          <SimpleGrid columns={{ base: 1, md: 3 }} spacing={97}>
            <Stack textAlign={"center"} align={"center"} spacing={5}>
              <Circle
                size="243px"
                bgColor="white"
                shadow={"lg"}
                fontSize={24}
                fontWeight="900"
                bg={colors.brandCyan}
              >
                M
              </Circle>
             
              <Text fontWeight={700}>Mario</Text>
              <Text>
                Chemical Engineer degree. Software architect and full stack
                developer (Svelte, Vue, Cordova/Android & various JS frameworks,
                Typescript, Node, Python, Rust, Pascal dialects, C, C++). 30+
                years developing software in a wide array of technologies, and 1
                year developing on blockchain. Certified NEAR developer, Cerified NEAR architect and NEAR Developer in Residence.
                Currently a founder in Treme.io (a no-code mobile workflow
                automation platform).
              </Text>
            </Stack>
            <Stack textAlign={"center"} align={"center"} spacing={5}>
              <Circle
                size="243px"
                bgColor="white"
                shadow={"lg"}
                fontSize={24}
                fontWeight="900"
                bg={colors.brandCyan}
              >
                L
              </Circle>
              <Text fontWeight={700}>Leandro</Text>
              <Text>
                Computer science degree, Full stack developer, React, Next.js
                (+Vercel) Node, Solidity and Rust. +11 years experience
                developing software applications and 2 years building blockchain
                applications. Certified NEAR developer andd NEAR Developer in Residence. Currently working Front
                end Lead and smart contract developer at Meta Pool, a liquid
                staking solution on NEAR.
              </Text>
            </Stack>
            <Stack textAlign={"center"} align={"center"} spacing={5}>
              <Circle
                size="243px"
                bgColor="white"
                shadow={"lg"}
                fontSize={24}
                fontWeight="900"
                bg={colors.brandCyan}
              >
                D
              </Circle>
              <Text fontWeight={700}>Dario</Text>
              <Text>
                Business Administration degree, Rust and Solidity developer,
                lead dev at BlockJobs Marketplace (NEAR) and OpenVino
                (Ethereum). Certified as NEAR developer and instructor,
                participant in ZK University of Harmony One, Secureum bootcamp
                and NEAR Developer in Residence.
              </Text>
            </Stack>
          </SimpleGrid>
        </HStack>
      </Container>
    </Flex>
  </section>
);

export default Team;
