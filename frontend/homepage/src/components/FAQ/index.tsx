import {
  Accordion,
  AccordionButton,
  AccordionItem,
  AccordionPanel,
  Box,
  Container,
  Flex,
  Heading,
  Text,
  useBreakpointValue,
  useColorModeValue,
  Icon,
  Stack,
  StackDivider,
  Circle,
} from "@chakra-ui/react";
import React from "react";
import { FAQContent as content, FAQItem } from "./content";
import { colors } from "@/theme/colors";
import { AddIcon, CloseIcon } from "@chakra-ui/icons";
import { NextPage } from "next";
import SectionTitle from "../SectionTitle";

const FAQ: NextPage = () => (
  <section id="faq">
    <Flex position="relative" justifyContent="center" direction={"column"}>
      <SectionTitle>FAQ</SectionTitle>
      <Container
        maxW="container.xl"
        px={{ base: "1rem", md: "2rem" }}
        py={"3rem"}
        bgColor={colors.brandGrey}
        borderRadius={"16px"}
      >
        <Flex
          justifyContent={{ base: "center", md: "center" }}
          flexDirection={{ base: "column", md: "column" }}
        >
          <Accordion
          
            allowMultiple
          >
            {content.map((item: FAQItem, index: any) => {
              return (
                <Box key={`faq_${index}`}>
                  <AccordionItem
                    borderTopWidth={0}
                    borderBottomWidth={"1px"}
                    borderColor={colors.brandGrey}
                  >
                    {({ isExpanded }) => (
                      <>
                        <AccordionButton>
                          <Flex
                            w="full"
                            color={colors.brandBlack}
                            fontWeight={500}
                            fontSize={{ base: "sm", md: "2xl" }}
                            textAlign="left"
                            justify="space-between"
                            my={{ base: "1rem", md: "2rem" }}
                          >
                            <Text>{item.q}</Text>
                            <Circle
                              size="48px"
                              bg={
                                isExpanded ? colors.brandBlue : colors.brandGrey
                              }
                              borderStyle={"solid"}
                              borderWidth={"2px"}
                              borderColor={colors.brandBlue}
                              borderRadius={"24px"}
                            >
                              <Icon
                                color={
                                  isExpanded ? colors.white : colors.brandBlue
                                }
                                as={isExpanded ? CloseIcon : AddIcon}
                                boxSize={{ base: "8px", md: "16px" }}
                              />
                            </Circle>
                          </Flex>
                        </AccordionButton>

                        <AccordionPanel
                          fontWeight={400}
                          color={colors.brandBlack}
                          dangerouslySetInnerHTML={{ __html: item.a }}
                          fontSize={{ base: "xs", md: "lg" }}
                          lineHeight={{ base: "150%", md: "140%" }}
                          letterSpacing="0.2px"
                          pb={4}
                        />
                      </>
                    )}
                  </AccordionItem>
                </Box>
              );
            })}
          </Accordion>
        </Flex>
      </Container>
    </Flex>
  </section>
);

export default FAQ;
