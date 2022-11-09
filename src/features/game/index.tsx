import { Flex, Text } from "@chakra-ui/react";
import { useContext } from "react";
import { useLeftRifhtInput } from "../../hooks/useLeftRightInput";
import { Context } from "../../store";

export const Game = () => {
  const { score, setScore, setView } = useContext(Context);
  const { input } = useLeftRifhtInput();

  return (
    <>
      <div
        style={{ backgroundColor: "green", width: "444px", height: "532px" }}
      >
        game
      </div>
      <span>touching:</span>
      <span>{input}</span>
      <Flex align="end" justify="center" color="choco.500" p="8px">
        <Text fontSize="xl" as="b" lineHeight="30px">
          受け止めた数：
        </Text>
        <Text fontSize="3xl" as="b" lineHeight="33px">
          {score}
        </Text>
      </Flex>
    </>
  );
};
