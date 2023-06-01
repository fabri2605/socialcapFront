import { FormEvent, ChangeEvent, useState } from "react";
import {
  Stack,
  FormControl,
  Input,
  Button,
  useColorModeValue,
  Heading,
  Text,
  Container,
  Flex,
  Box,
  HStack,
  SimpleGrid,
} from "@chakra-ui/react";
import { CheckIcon } from "@chakra-ui/icons";
import { NextPage } from "next";
import SectionTitle from "../SectionTitle";
import { colors } from "@/theme/colors";
import SubscribeForm from "./SubscribeForm";

const Waitlist: NextPage = () => {
  const [email, setEmail] = useState("");

  return (
    <section id="waitlist">
      <Flex position="relative" justifyContent="center" direction={"column"}>
        <Container
          maxW="container.xl"
          py="4rem"
          px="4rem"
          bg={colors.brandBlue}
          my={"54px"}
          borderRadius={"16px"}
        >
          <Stack
            color={colors.white}
            spacing={10}
            backgroundImage={"url(/assets/mail.svg)"}
            bgSize={"536px"}
            bgRepeat={"no-repeat"}
            bgPos={"right 0px"}
          >
            <Heading as={"h1"}>Join the waitlist</Heading>
            <Text
              fontWeight={400}
              fontSize={"1.125rem"}
              lineHeight={"28px"}
              w={"50%"}
            >
              Join the waitlist and unlock the full potential of your community
              with legitimate, trustworthy, and valuable credentials
            </Text>
            <SubscribeForm w={"50%"} email={email} setEmail={setEmail} />
          </Stack>
        </Container>
      </Flex>
    </section>
  );
};
export default Waitlist;
