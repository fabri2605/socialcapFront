import type { NextPage } from "next";
import {
  Text,
  SimpleGrid,
  Image,
  Heading,
  Center,
  Stack,
  Button,
  Flex,
  Container,
  HStack,
  Wrap,
  WrapItem,
} from "@chakra-ui/react";
import SectionTitle from "../SectionTitle";
import { colors } from "@/theme/colors";

const Communities: NextPage = () => (
  <section id="investors">
    <Flex position="relative" justifyContent="center" direction={"column"}>
      <SectionTitle>Trusted Communities</SectionTitle>
      <Container maxW="container.xl" py={87}>
        <Stack spacing={87}>
          <Wrap spacing={89} justify="center">
            <WrapItem>
              <Center w="228px" h="80px">
                <Image alt="MINA" src="assets/mina.svg" />
              </Center>
            </WrapItem>
            <WrapItem>
              <Center w="228px" h="80px"  >
                <Image alt="NEAR" src="assets/near.svg" />
              </Center>
            </WrapItem>
          </Wrap>
          <Flex justifyContent={"center"}>
            <Button
              fontWeight={500}
              color={colors.brandBlue}
              variant={"solid"}
              borderColor={colors.brandBlue}
              padding="22px 32px"
              borderWidth={"3px"}
              borderStyle={"solid"}
              borderRadius="16px"
              fontSize={"20px"}
            >
              Add your community
            </Button>
          </Flex>
        </Stack>
      </Container>
    </Flex>
  </section>
);

export default Communities;
