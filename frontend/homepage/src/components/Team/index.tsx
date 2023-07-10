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
  Image
} from "@chakra-ui/react";
import SectionTitle from "../SectionTitle";
import { colors } from "@/theme/colors";

const Team: NextPage = () => (
  <section id="team">
    <Flex position="relative" justifyContent="center" direction={"column"}>
      <SectionTitle mt={"73px"}>The team</SectionTitle>
      <Container maxW="container.xl" py="4rem">
        <HStack justifyContent={"space-around"}>
          <SimpleGrid columns={{ base: 1, md: 4 }} spacing={97}>
            <Stack textAlign={"center"} align={"center"} spacing={5}>
              <Image src={"/assets/avatars/mario.svg"} alt="mario" />
              <Text>
               Founder
              </Text>
            </Stack>
            <Stack textAlign={"center"} align={"center"} spacing={5}>
              <Image src={"/assets/avatars/leandro.svg"} alt="leandro" />
              <Text>
               Founder
              </Text>
            </Stack>
            <Stack textAlign={"center"} align={"center"} spacing={5}>
              <Image src={"/assets/avatars/nico.svg"} alt="nico" />
              <Text>
               UX/UI Designer
              </Text>
            </Stack>
            <Stack textAlign={"center"} align={"center"} spacing={5}>
              <Image src={"/assets/avatars/mariana.svg"} alt="mariana" />
              <Text>
               Social Researcher
              </Text>
            </Stack>
          </SimpleGrid>
        </HStack>
      </Container>
    </Flex>
  </section>
);

export default Team;
