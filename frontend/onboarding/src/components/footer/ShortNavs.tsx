import { Stack, Link, Text } from "@chakra-ui/react";
const ShortNavs = () => (
  <Stack
    w={"100%"}
    justify={"space-around"}
    direction={{ md: "row", base: "column" }}
    spacing={2}
  >
    <Stack align={"flex-start"}>
      <Link  href={"#our-credentials"}>
        Our Credentials
      </Link>
    </Stack>
    <Stack align={"flex-start"}>
      <Link href={"#why-socialcap"}>
        Why SocialCap?
      </Link>
    </Stack>
    <Stack align={"flex-start"}>
      <Link  p="0px" href={"#team"}>
        Our team
      </Link>
    </Stack>
    <Stack align={"flex-start"}>
      <Link  href={"#faq"}>
        FAQ
      </Link>
    </Stack>
    <Stack align={"flex-start"}>
      <Text w="full">© 2023 - Identicon Network</Text>
    </Stack>
  </Stack>
);

export default ShortNavs;
