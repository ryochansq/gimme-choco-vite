import { Button, ButtonProps, Text } from "@chakra-ui/react";

type Props = {
  text: string;
} & ButtonProps;

export const BaseButton = ({ text, ...props }: Props) => (
  <Button colorScheme="choco" size="sm" {...props}>
    <Text as="b">{text}</Text>
  </Button>
);
