import { Text, TextProps } from "@chakra-ui/react";
import { colors } from "@/theme/colors";
export default function SectionTitle({children, ...props}: TextProps) {
  return (
    <Text
    align={"center"}
      color={colors.black}
      letterSpacing="0.6px"
      fontWeight={500}
      fontSize={"2.5rem"}
      lineHeight={"54px"}
      {...props}
    >
      {children}
    </Text>
  );
}
