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
import { useLogin, useRequestOtp, useSignUp } from "../../hooks/sessions";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import Layout from "@/components/Layout";
import { colors } from "@/theme/colors";
import { useRouter } from "next/router";
import { useStore as useSessionKey } from "@/stores/sessionKey";

const SignUp = (props: {}) => {
  const router = useRouter();
  const { setSessionKey } = useSessionKey();
  const { request_otp, isLoading, isSuccess, data, isError, error } =
    useRequestOtp();
  const initialValues: OTPData = {
    email: "",
  };
  const form = useFormik({
    initialValues: initialValues,
    validationSchema: schemaValidation,
    validateOnMount: true,
    enableReinitialize: true,
    validateOnBlur: true,
    validateOnChange: true,
    onSubmit: async (values: any) => {
      request_otp(values);
    },
  });

  useEffect(() => {
    if (isSuccess) {
      console.log("SESSION KEY", data.result.session_key);
      setSessionKey(data.result.session_key);
      router.push("/login-verify");
    }
    if (isError) {
      console.log("ERROR", error);
    }
  }, [isLoading, isSuccess, isError, data, error]);

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
              <FormControl
                id="email"
                isRequired
                isInvalid={
                  !!form.values.email &&
                  !!form.errors.email &&
                  !!form.touched.email
                }
              >
                <FormLabel>Email address</FormLabel>
                <Input
                  type="email"
                  name="email"
                  placeholder="my@email.com"
                  value={form.values.email}
                  onPaste={form.handleChange}
                  onBlur={form.handleBlur}
                  onChange={form.handleChange}
                />
              </FormControl>
              {form.errors.email && (
                <FormErrorMessage>{form.errors.email[0]}</FormErrorMessage>
              )}
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
