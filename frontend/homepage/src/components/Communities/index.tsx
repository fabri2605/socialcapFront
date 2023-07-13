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
  useBreakpointValue,
} from "@chakra-ui/react";
import SectionTitle from "../SectionTitle";
import { colors } from "@/theme/colors";

const Communities: NextPage = () => {
  const imageMinaUrl = useBreakpointValue([
    "assets/mina-mobile.svg",
    "assets/mina.svg",
  ]);
  return (
    <section id="communities">
      <Flex position="relative" justifyContent="center" direction={"column"}>
        <SectionTitle>Trusted Communities</SectionTitle>
        <Container maxW="container.xl">
          <Stack>
            <HStack justify="center" my={[43, 87]}>
              <Image alt="MINA" src={imageMinaUrl} />
            </HStack>
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
};

export default Communities;
