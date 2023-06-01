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
import { colors } from "@/theme/colors";
import SectionTitle from "../SectionTitle";

const OurCredentials: NextPage = () => (
  <section id="our-credentials">
    <Flex position="relative" justifyContent="center" direction={"column"}>
      <SectionTitle my={"54px"}>Our credentials</SectionTitle>
      <Container
        maxW="container.xl"
        px={{ base: "1rem", md: "2rem" }}
        pt={"96px"}
        pb={"72px"}
        bgColor={colors.brandBlue}
        borderRadius={"16px"}
      >
        <Box color={colors.white}>
          <HStack spacing="2rem">
            <SimpleGrid
              columns={{ base: 1, md: 2 }}
              spacing={10}
              my={10}
            >
              <Box></Box>
              <Box>
                <Stack spacing={10}>
                  <Heading as={"h3"}>
                    Improve governance and transparency
                  </Heading>
                  <Text
                    fontWeight={400}
                    fontSize={"1.125rem"}
                    lineHeight={"28px"}
                    pr={"9.5rem"}
                  >
                    Credentials facilitate the assignment of roles and
                    responsibilities for participating in governance activities,
                    promoting transparent decision-making, accountability,
                    equitable participation, and trust.
                    <br /> <br />
                    With Blockchain technology, they offer a level of
                    transparency that traditional systems lack, making it easier
                    to verify credentials and achievements.
                  </Text>
                </Stack>
              </Box>
            </SimpleGrid>
          </HStack>
        </Box>
      </Container>
    </Flex>
  </section>
);

export default OurCredentials;
