import styles from "./card.module.css";
import { Stack, Text, Image, useBreakpointValue } from "@chakra-ui/react";
import { colors } from "@/theme/colors";
import React from "react";
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
  const isOdd = card.index % 2 === 0;

  // separe paragraphs on dots
  const paragraphs = card.content
    .split(".")
    .map((e) => e + ".")
    .slice(0, -1);

  return (
    <Stack
      data-aos={!isOdd ? "fade-left" : "fade-right"}
      data-aos-mirror="true"
      key={card.index}
      display={["column", "column", "grid"]}
      gridTemplateColumns={"1fr 1fr"}
      gap={isOdd ? "7rem" : "6rem"}
      /* background={colors.brandBlue} */
      borderRadius={"1rem"}
      /* boxShadow={"0 0 32px 0 rgba(23, 88, 254, 0.1)"} */
      height={"full"}
      transition={"all 0.4s"}
      color={colors.white}
      padding={["1.5rem 1.5rem 1.5rem 1.5rem", "2rem 4rem 2rem 2rem"]}
      alignItems={"center"}
    >
      <Stack gridArea={isOdd ? "1 / 2 / 2 / 3" : ""}>
        <Text
          as={"h3"}
          marginBottom={"2rem"}
          wordBreak={"break-word"}
          color={"black"}
        >
          {card.title}
        </Text>
        {paragraphs.map((p, index) => {
          // here we are going to go bold the strings between asterisks
          let splitted = p.split("*");
          return (
            <React.Fragment key={index}>
              <Text
                key={index + "text"}
                fontSize={["16px", "18px"]}
                fontWeight={400}
                lineHeight={["24px", "28px"]}
                letterSpacing={"-0.4px"}
                wordBreak={"break-word"}
                color={"black"}
              >
                {splitted.map((str, ind) => (
                  ind % 2 === 0 ? <React.Fragment key={ind}>{str}</React.Fragment> : <b key={ind}>{str}</b>
                ))}
              </Text>
              &nbsp;
            </React.Fragment>
          )
        }
        )
        }
      </Stack>
      {/* {showImage && ( */}
      <Stack>
        <Image
          padding={"1rem"}
          background={colors.brandBlue}
          borderRadius={"1rem"}
          margin={"1rem"}
          alt={"card"}
          src={card.image}
          objectFit={"cover"}
          transform={"scale(1.2)"}
        />
      </Stack>
      {/* )} */}
    </Stack>
  );
};

export default Card;
