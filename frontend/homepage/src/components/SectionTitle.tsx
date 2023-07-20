import { Text, TextProps } from "@chakra-ui/react";
import { colors } from "@/theme/colors";
export default function SectionTitle({ children, ...props }: TextProps) {
  return (
    <Text
      align={"center"}
      color={colors.black}
      letterSpacing="0.6px"
      fontWeight={500}
      fontSize={["1.5rem","2.5rem"]}
      lineHeight={["24px", "54px"]}
      mt={["88px", "108px"]} mb={["32px", "38px"]}
      {...props}
    >
      {children}
    </Text>
  );
}
