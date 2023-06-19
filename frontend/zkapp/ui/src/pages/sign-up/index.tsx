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
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { schemaValidation } from "./schemaValidation";
import { CreateAccountData, OTPData } from "@/models/accounts";
import { useSignUp } from "../../hooks/sessions";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import Layout from "@/components/Layout";
import { colors } from "@/theme/colors";
import { useRouter } from "next/router";

const SignUp = (props: {}) => {
  const router = useRouter();
  const {
    signUp,
    isSigningUp,
    isSignUpSuccess,
    signUpData,
    isSignUpError,
    signUpError,
  } = useSignUp();
  const initialValuesSignUp: CreateAccountData = {
    email: "",
    full_name: "",
    phone: "",
    telegram: "",
  };
  const form = useFormik({
    initialValues: initialValuesSignUp,
    validationSchema: schemaValidation,
    validateOnMount: true,
    enableReinitialize: true,
    validateOnBlur: true,
    validateOnChange: true,
    onSubmit: async (values: any) => {
      console.log("CALLING SIGN UP");
      signUp(values);
    },
  });

  useEffect(() => {
    if (isSignUpSuccess) {
      console.log("SUCCESS", signUpData);
      router.push("/login");
    }
    if (isSignUpError) {
      console.log("ERROR", signUpError);
    }
  }, [isSigningUp, isSignUpSuccess, isSignUpError, signUpData, signUpError]);

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
              Create Account
            </Heading>
          </Stack>
          <Box
            rounded={"lg"}
            bg={useColorModeValue("white", "gray.700")}
            boxShadow={"lg"}
            p={8}
          >
            <Stack spacing={4}>
              <HStack>
                <Box>
                  <FormControl
                    id="full_name"
                    isRequired
                    isInvalid={
                      !!form.values.full_name &&
                      !!form.errors.full_name &&
                      !!form.touched.full_name
                    }
                  >
                    <FormLabel>Full Name</FormLabel>
                    <Input
                      type="text"
                      name="full_name"
                      value={form.values.full_name}
                      placeholder={"John Doe"}
                      onPaste={form.handleChange}
                      onBlur={form.handleBlur}
                      onChange={form.handleChange}
                    />
                  </FormControl>
                  <FormErrorMessage>{form.errors.full_name}</FormErrorMessage>
                </Box>
              </HStack>
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
              <FormErrorMessage>{form.errors.email}</FormErrorMessage>
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
                  Create
                </Button>
              </Stack>
              <Stack pt={6}>
                <Text align={"center"}>
                  Already a user?{" "}
                  <Link color={"blue.400"} href={"/login"}>
                    Login
                  </Link>
                </Text>
              </Stack>
            </Stack>
          </Box>
        </Stack>
      </Flex>
    </Layout>
  );
};

export default SignUp;
