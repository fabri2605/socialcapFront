import { colors } from "@/theme/colors";
import {
  Stack,
  Image,
  Text,
  StackProps,
  useBreakpointValue,
} from "@chakra-ui/react";

interface Props {
  imageUrl: string;
  imageUrlMobile: string;
  text: string;
}
const Section = ({ imageUrl, imageUrlMobile, text }: Props) => {
  const image = useBreakpointValue([imageUrlMobile, imageUrl]);
  return (
    <Stack
      textAlign={"left"}
      direction={["column", "column", "row"]}
      align={"center"}
      width={["full", "full", "700px"]}
      p={"32px"}
      gap={{base: "1.5rem", md: "2rem"}}
    >
      <Image alt="private" boxSize={["full", "160px"]} src={image} />
      <Text
        fontSize={["16px", "16px","19px"]}
        lineHeight={["24px", "24px",  "32px"]}
        fontWeight={500}
        wordBreak={"break-word"}
      >
        {text}
      </Text>
    </Stack>
  );
};

export default Section;
