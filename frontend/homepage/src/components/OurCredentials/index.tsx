import type { NextPage } from "next";
import { ChevronRightIcon } from "@chakra-ui/icons";
import styles from "./card.module.css";
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
  Tag,
  VStack,
} from "@chakra-ui/react";
import { colors } from "@/theme/colors";
import SectionTitle from "../SectionTitle";
import { cards } from "./cards";
import Card from "./Card";
import { useEffect, useState } from "react";
import Carousel from "../Carousel";
const OurCredentials: NextPage = () => {
  return (
    <section id="our-credentials">
      <Flex position="relative" justifyContent="center" direction={"column"}>
        <SectionTitle my={"54px"}>Our credentials</SectionTitle>
        <Container
          maxW="container.xl"
          px={{ base: "1rem", md: "2rem" }}
          pt={"96px"}
          pb={"72px"}
        >
          <Carousel gap={0}>
            {cards.map((card) => (
              <Flex
                key={card.index}
                justifyContent="space-between"
                flexDirection="column"
                overflow="hidden"
                flex={1}
                p={5}
              >
                <Card card={card} />
              </Flex>
            ))}
          </Carousel>
        </Container>
      </Flex>
    </section>
  );
};

export default OurCredentials;
