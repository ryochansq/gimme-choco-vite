import { Box, Flex, Text } from "@chakra-ui/react";
import { useContext } from "react";
import { BaseButton } from "../../components/parts/BaseButton";
import { Context } from "../../store";

export const Top = () => {
  const { setView } = useContext(Context);
  const onClickStart = () => {
    setView("Game");
  };

  return (
    <Flex direction="column" gap={1} p="4">
      <Text fontSize="sm">
        もあちゃんを左右に動かして、上から降ってくるチョコのお菓子をできるだけたくさん受け止めよう！
      </Text>
      {/* <Grid container justify="center">
      <canvas ref={canvasRef} />
    </Grid> */}
      <Text fontSize="sm">パソコン：「←」「→」キーで左右に動く</Text>
      <Text fontSize="sm">
        スマホ：画面の左側のどこかをタッチしていると左に、右側だと右に動く
      </Text>
      <Text fontSize="xs">
        （機種によってはタッチが速すぎると反応しないことがあります）
      </Text>
      <Text fontSize="sm" mt="2">
        お菓子は全部で100コ。
      </Text>
      <Text fontSize="sm">
        <Text as="b" color="choco.500">
          骨マスクを受け止めると集めたお菓子が減っちゃう
        </Text>
        ので気をつけてね。
      </Text>
      <Flex justify="center">
        <BaseButton
          colorScheme="choco"
          onClick={onClickStart}
          text="ゲームスタート！"
        />
      </Flex>
    </Flex>
  );
};
