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
import Card from "./Card";

const HowItWorks: NextPage = () => (
  <section id="how-it-works">
    <Flex position="relative" justifyContent="center" direction={"column"}>
      <SectionTitle>How it works</SectionTitle>
      <Container maxW="container.xl" px={{ base: "2rem", md: "8rem" }}>
      
          <SimpleGrid
            columns={{ base: 1, md: 3, lg: 3 }}
            spacing={10}
            mx={{ base: 2, md: 8, lg: 10 }}
          >
            <Card
              imageUrl={"assets/how-it-works/join-community.svg"}
              heading={"Join a community"}
              text={"Easy onboarding, no wallet needed"}
            />
            <Card
              imageUrl={"assets/how-it-works/start-claim.svg"}
              heading={"Start a claim"}
              text={
                "Start a credential claim. Provide evidence. Wait for credential validation & issuing."
              }
            />
            <Card
              imageUrl="assets/how-it-works/mint-credential.svg"
              heading="Mint credential"
              text="Multi-chain credential minting"
            />
          </SimpleGrid>
       
      </Container>
    </Flex>
  </section>
);

export default HowItWorks;
