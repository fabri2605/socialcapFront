import { Stack, Image, Text, StackProps } from "@chakra-ui/react";

interface Props {
  imageUrl: string;
  text: string;
}
const Section = ({ imageUrl, text }: Props) => (
  <Stack textAlign={"left"} direction={["column", "row"]} align={"center"}>
    <Image alt="private" boxSize={["full", "160px"]} src={imageUrl} />
    <Text
      fontSize={["16px", "20px"]}
      lineHeight={["24px", "32px"]}
      fontWeight={500}
      wordBreak={"break-word"}
    >
      {text}
    </Text>
  </Stack>
);

export default Section;
