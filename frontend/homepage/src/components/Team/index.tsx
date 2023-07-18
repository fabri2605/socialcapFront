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

const Team: NextPage = () => (
  <section id="team">
    <Flex position="relative" justifyContent="center" direction={"column"}>
      <SectionTitle>The team</SectionTitle>
      <Container maxW="container.xl">
        <HStack justifyContent={"space-around"}>
          <SimpleGrid columns={{ base: 1, md: 4 }} spacing={[1, 8]}>
            <Card imageUrl={"/assets/avatars/mario.svg"} title="Founder" />
            <Card imageUrl={"/assets/avatars/leandro.svg"} title="Founder" />
            <Card
              imageUrl={"/assets/avatars/nico.svg"}
              title="UX/UI Designer"
            />
            <Card
              imageUrl={"/assets/avatars/mariana.svg"}
              title="Social Researcher"
            />
          </SimpleGrid>
        </HStack>
      </Container>
    </Flex>
  </section>
);

export default Team;
