import { Flex, Select, Text } from "@chakra-ui/react";
import { useContext, useRef } from "react";
import { BaseButton } from "../../components/parts/BaseButton";
import { Context } from "../../store";
import { useDemo } from "./hooks/useDemo";

export const Top = () => {
  const { setView, level, setLevel } = useContext(Context);
  const onClickStart = () => {
    setView("Game");
  };
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useDemo(canvasRef);

  return (
    <Flex direction="column" gap={1} p="4">
      <Text fontSize="sm">
        もあちゃんを左右に動かして、上から降ってくるチョコのお菓子をできるだけたくさん受け止めよう！
      </Text>
      <Flex justify="center">
        <div style={{ width: "75%", aspectRatio: "10/5.5" }}>
          <canvas ref={canvasRef} style={{ width: "100%", height: "100%" }} />
        </div>
      </Flex>
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
      <Flex justify="center" align="center">
        <Text fontSize="sm">むずかしさ：</Text>
        <Select
          defaultValue={level}
          onChange={(e) => setLevel(e.target.value as Level)}
          size="sm"
          variant="filled"
          w="160px"
        >
          <option value="あまい">あまい</option>
          <option value="ふつう">ふつう🔥</option>
          <option value="からい">からい🔥🔥</option>
          <option value="ヤバッ！">ヤバッ！🔥🔥🔥</option>
        </Select>
      </Flex>
      <Flex justify="center" mt="2">
        <BaseButton
          colorScheme="choco"
          onClick={onClickStart}
          size="md"
          text="ゲームスタート！"
        />
      </Flex>
    </Flex>
  );
};
