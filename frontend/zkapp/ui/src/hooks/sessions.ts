import { useMutation, useQuery } from "react-query";
import {
  CreateAccountData,
  LoginAccountData,
  OTPData,
} from "../models/accounts";
import { useToast } from "@chakra-ui/toast";
import axios from "axios";

export const useSignUp = () => {
  const baseUrl = `${process.env.NEXT_PUBLIC_GATEWAY_BASE_URL}`;

  const toast = useToast();
  const { mutate, isLoading, isSuccess, data, isError, error } = useMutation(
    (accountData: CreateAccountData) =>
      axios
        .post(`${baseUrl}/api/mutation/sign_up`, {
          params: {
            full_name: accountData.full_name,
            email: accountData.email,
          },
        })
        .then((response) => response.data),
    {
      onError: (error: any) => {
        toast({
          title: `Sign up fails: ${error.response.data.error.message}`,
          status: "error",
          duration: 9000,
          position: "top-right",
          isClosable: true,
        });
      },
    }
  );
  return {
    signUp: mutate,
    isSigningUp: isLoading,
    isSignUpSuccess: isSuccess,
    signUpData: data,
    isSignUpError: isError,
    signUpError: error,
  };
};

export const useRequestOtp = () => {
  const baseUrl = `${process.env.NEXT_PUBLIC_GATEWAY_BASE_URL}`;

  const toast = useToast();
  const { mutate, isLoading, isSuccess, data, isError, error } = useMutation(
    (accountData: OTPData) =>
      axios
        .post(`${baseUrl}/api/mutation/request_otp`, {
          params: {
            email: accountData.email,
          },
        })
        .then((response) => response.data),
    {
      onError: (error: any) => {
        toast({
          title: `Request OTP fails: ${error.response.data.error.message}`,
          status: "error",
          duration: 9000,
          position: "top-right",
          isClosable: true,
        });
      },
    }
  );
  return {
    request_otp: mutate,
    isLoading,
    isSuccess,
    data,
    isError,
    error,
  };
};

export const useLogin = () => {
  const baseUrl = `${process.env.NEXT_PUBLIC_GATEWAY_BASE_URL}`;

  const toast = useToast();
  const { mutate, isLoading, isSuccess, data, isError, error } = useMutation(
    (accountData: LoginAccountData) =>
      axios
        .post(`${baseUrl}/api/mutation/login`, {
          params: {
            ...accountData
          },
        })
        .then((response) => response.data),
    {
      onError: (error: any) => {
        toast({
          title: `Login fails: ${error.response.data.error.message}`,
          status: "error",
          duration: 9000,
          position: "top-right",
          isClosable: true,
        });
      },
    }
  );
  return {
    signIn: mutate,
    isSigningIn: isLoading,
    isSignInSuccess: isSuccess,
    signInData: data,
    isSignInError: isError,
    signInError: error,
  };
};
