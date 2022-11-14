import { Flex, Text } from "@chakra-ui/react";
import { useContext, useRef } from "react";
import { Context } from "../../store";
import { useGame } from "./hooks/useGame";

export const Game = () => {
  const { score } = useContext(Context);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useGame(canvasRef);

  return (
    <>
      <div style={{ width: "100%", aspectRatio: "10/12" }}>
        <canvas ref={canvasRef} style={{ width: "100%", height: "100%" }} />
      </div>
      <Flex align="end" justify="center" color="choco.500" p="4px">
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
