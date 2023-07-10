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
} from "@chakra-ui/react";
import { colors } from "@/theme/colors";
import SectionTitle from "../SectionTitle";
import { cards } from "./cards";
import Card from "./Card";
import CardContainer from "./CardContainer";

const OurCredentials: NextPage = () => {
  return (
    <section id="our-credentials">
      <Flex position="relative" justifyContent="center" direction={"column"}>
        <SectionTitle my={"54px"}>Our credentials</SectionTitle>
        <Container
          className={styles.container}
          maxW="container.xl"
          px={{ base: "1rem", md: "2rem" }}
          pt={"96px"}
          pb={"72px"}
        >
          <CardContainer className={styles.stack}>
            <ul className={styles.cards}>
              {cards.map((card) => (
                <Card card={card} />
              ))}
            </ul>
          </CardContainer>
        </Container>
      </Flex>
    </section>
  );
};

export default OurCredentials;
