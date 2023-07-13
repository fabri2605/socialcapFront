import { Text, Stack, Image, StackProps } from "@chakra-ui/react";
interface Props extends StackProps {
  imageUrl: string;
  title: string;
}
const Card = ({ imageUrl, title, ...props }: Props) => (
  <Stack textAlign={"center"} align={"center"} mt={2} {...props}>
    <Image src={imageUrl} alt="avatar" />
    <Text>{title}</Text>
  </Stack>
);

export default Card;
