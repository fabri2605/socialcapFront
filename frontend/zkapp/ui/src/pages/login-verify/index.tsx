import { ErrorMessage, useFormik } from "formik";
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Center,
  Stack,
  Heading,
  useBreakpointValue,
  Text,
  HStack,
  FormErrorMessage,
  Flex,
  Box,
  Checkbox,
  Link,
  InputGroup,
  InputRightElement,
  useColorModeValue,
  PinInput,
  PinInputField,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { schemaValidation } from "./schemaValidation";
import {
  CreateAccountData,
  LoginAccountData,
  OTPData,
} from "@/models/accounts";
import { useLogin, useSignUp } from "../../hooks/sessions";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import Layout from "@/components/Layout";
import { colors } from "@/theme/colors";
import { useRouter } from "next/router";
import { useStore as useSessionKey } from "@/stores/sessionKey";

const SignUp = (props: {}) => {
  const { sessionKey } = useSessionKey();
  const router = useRouter();
  const {
    signIn,
    isSigningIn,
    isSignInSuccess,
    signInData,
    isSignInError,
    signInError,
  } = useLogin();
  // const [value, setValue] = useState("");
  const initialValues: LoginAccountData = {
    otp: "",
    session_key: "",
  };
  const form = useFormik({
    initialValues: initialValues,
    validationSchema: schemaValidation,
    validateOnMount: true,
    enableReinitialize: true,
    validateOnBlur: true,
    validateOnChange: true,
    onSubmit: async (values: any) => {
      signIn({...values, session_key: sessionKey});
    },
  });

  useEffect(() => {
    if (isSignInSuccess) {
      router.push("/dashboard");
    }
    if (isSignInError) {
      console.log("ERROR", signInError);
    }
  }, [isSigningIn, isSignInSuccess, isSignInError, signInData, signInError]);

  return (
    <Layout>
      <Flex
        minH={"100vh"}
        align={"center"}
        justify={"center"}
        bg={useColorModeValue("gray.50", "gray.800")}
      >
        <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
          <Stack align={"center"}>
            <Heading fontSize={"4xl"} textAlign={"center"}>
              Login
            </Heading>
          </Stack>
          <Box
            rounded={"lg"}
            bg={useColorModeValue("white", "gray.700")}
            boxShadow={"lg"}
            p={8}
          >
            <Stack spacing={4}>
              <FormControl>
                <Center>
                  <HStack>
                    <PinInput
                      otp
                      value={form.values.otp}
                      onChange={(pinValue) => form.setFieldValue("otp", pinValue)}
                      onComplete={() => form.handleSubmit()}
                      placeholder=""
                    >
                      <PinInputField />
                      <PinInputField />
                      <PinInputField />
                      <PinInputField />
                      <PinInputField />
                      <PinInputField />
                    </PinInput>
                  </HStack>
                </Center>
              </FormControl>
              <FormErrorMessage>{form.errors.otp}</FormErrorMessage>
              <Stack spacing={10} pt={2}>
                <Button
                  loadingText="Submitting"
                  fontSize={"xl"}
                  lineHeight={"20px"}
                  fontWeight={400}
                  color={"white"}
                  bg={colors.brandBlue}
                  borderRadius={"16px"}
                  padding={"22px 32px"}
                  _hover={{
                    bg: "#0E2865",
                  }}
                  onClick={(e: any) => form.handleSubmit(e)}
                >
                 Verify
                </Button>
              </Stack>
            </Stack>
          </Box>
        </Stack>
      </Flex>
    </Layout>
  );
};

export default SignUp;
