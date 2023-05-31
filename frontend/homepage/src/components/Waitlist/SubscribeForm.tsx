import {
  Stack,
  Text,
  FormControl,
  Input,
  Button,
  StackProps,
} from "@chakra-ui/react";
import { CheckIcon } from "@chakra-ui/icons";
import { useState, FormEvent, ChangeEvent } from "react";
import { colors } from "@/theme/colors";

interface Props extends StackProps {
  email: string;
  setEmail: (value: string) => void;
}

export default function SubscribeForm({ email, setEmail, ...props }: Props) {
  const [state, setState] = useState<"initial" | "submitting" | "success">(
    "initial"
  );
  const [error, setError] = useState(false);
  return (
    <>
      <Stack
        {...props}
        direction={{ base: "column", md: "row" }}
        as={"form"}
        spacing={"12px"}
        onSubmit={(e: FormEvent) => {
          e.preventDefault();
          setError(false);
          setState("submitting");

          // remove this code and implement your submit logic right here
          setTimeout(() => {
            if (email === "fail@example.com") {
              setError(true);
              setState("initial");
              return;
            }

            setState("success");
          }, 1000);
        }}
      >
        <FormControl>
          <Input
            h="full"
            variant={"solid"}
            borderWidth={"3px"}
            borderColor={colors.white}
            borderStyle={"solid"}
            borderRadius={"16px"}
            id={"email"}
            type={"email"}
            required
            placeholder={"Your Email"}
            aria-label={"Your Email"}
            value={email}
            disabled={state !== "initial"}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setEmail(e.target.value)
            }
            bg={colors.brandBlue}
          />
        </FormControl>
        <FormControl w={{ base: "100%", md: "25%" }}>
          <Button
            padding={"22px 32px"}
            bg={colors.white}
            borderWidth={"3px"}
            borderColor={colors.white}
            borderStyle={"solid"}
            borderRadius={"16px"}
            colorScheme={state === "success" ? "green" : "blue"}
            color={colors.brandBlack}
            isLoading={state === "submitting"}
            w="100%"
            type={state === "success" ? "button" : "submit"}
          >
            {state === "success" ? <CheckIcon /> : "Join"}
          </Button>
        </FormControl>
      </Stack>
    </>
  );
}
