import React, { ReactNode } from "react";
import {
  Box,
  Center,
  Flex,
  HStack,
  Stack,
  Text,
  useBreakpointValue,
  useColorMode,
  VStack,
} from "@chakra-ui/react";
import Link from "next/link";
import {
  LogoDiscord,
  LogoGithub,
  LogoLinkedin,
  LogoTwitter,
} from "@carbon/icons-react";

const SocialBar = () => {
  return (
    <Stack justify={"flex-start"}>
      <HStack align={"flex-start"} alignContent={"center"}>
        <Link href={"#"} target={"_blank"}>
          <Center h={"25px"} w={"25px"}>
            <LogoGithub size={32} />
          </Center>
        </Link>

        <Link href={"#"} target={"_blank"}>
          <Center h={"25px"} w={"25px"}>
            <LogoTwitter size={32} />
          </Center>
        </Link>
        <Link href={"#"} target={"_blank"}>
          <Center h={"24px"} w={"24px"}>
            <svg
              width="21"
              height="18"
              viewBox="0 0 21 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M20.9383 1.79798L17.7695 16.7417C17.5305 17.7964 16.907 18.0589 16.0211 17.562L11.193 14.0042L8.8633 16.2449C8.60548 16.5027 8.38986 16.7183 7.89298 16.7183L8.23986 11.8011L17.1883 3.71516C17.5774 3.36829 17.1039 3.1761 16.5836 3.52298L5.52111 10.4886L0.75861 8.99798C-0.277328 8.67454 -0.296078 7.96204 0.974234 7.46517L19.6024 0.288602C20.4649 -0.0348353 21.2195 0.48079 20.9383 1.79798Z"
                fill="#032131"
              />
            </svg>
          </Center>
        </Link>
        <Link href={"#"} target={"_blank"}>
          <Center h={"25px"} w={"25px"}>
            <LogoDiscord size={32} />
          </Center>
        </Link>
      </HStack>
    </Stack>
  );
};

export default SocialBar;
