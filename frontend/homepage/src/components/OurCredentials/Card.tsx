import styles from "./card.module.css";
import { Stack, Text, Image, useBreakpointValue } from "@chakra-ui/react";
import { colors } from "@/theme/colors";
export interface CardType {
  index: number;
  title: string;
  content: string;
  image: string;
}
interface Props {
  card: CardType;
}
const Card = ({ card }: Props) => {
  // const showImage = useBreakpointValue([false, true]);
  return (
    <Stack
      key={card.index}
      display={["column", "column", "grid"]}
      gridTemplateColumns={"1fr 1fr"}
      background={colors.brandBlue}
      borderRadius={"1rem"}
      boxShadow={"0 0 32px 0 rgba(23, 88, 254, 0.1)"}
      height={"full"}
      transition={"all 0.4s"}
      color={colors.white}
      padding={["1.5rem 1.5rem 1.5rem 1.5rem", "2rem 4rem 2rem 2rem"]}
      alignItems={"center"}
    >
      <Stack gridArea={"1 / 2 / 2 / 3"}>
        <Text as={"h3"} marginBottom={"2rem"} wordBreak={"break-word"}>
          {card.title}
        </Text>
        <Text
          fontSize={["16px", "18px"]}
          fontWeight={400}
          lineHeight={["24px", "28px"]}
          letterSpacing={"-0.4px"}
          wordBreak={"break-word"}
        >
          {card.content}
        </Text>
      </Stack>
      {/* {showImage && ( */}
      <Stack>
        <Image
          alt={"card"}
          src={card.image}
          objectFit={"cover"}
        />
        </Stack>
      {/* )} */}
    </Stack>
  );
};

export default Card;
