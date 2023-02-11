import { Button, Flex, Image, Text } from "@chakra-ui/react";
import { useContext } from "react";
import { FaTwitter } from "react-icons/fa";
import { BaseButton } from "../../components/parts/BaseButton";
import { levelToText } from "../../functions/level";
import { Context } from "../../store";

export const Result = () => {
  const { score, setView, level } = useContext(Context);
  const evaluation = (() => {
    if (score === 100) return "100";
    if (score >= 80) return "80";
    if (score >= 50) return "50";
    return "0";
  })();
  const src = `/result/${evaluation}.jpg`;

  const onClickReplay = () => {
    setView("Top");
  };

  const onClickTweet = () => {
    const text = `もあちゃんのギミチョコだいさくせん で\n 難易度：${levelToText[level]}\n 満腹度：${score} でした！\n\ngimme-choco.ryochansq.vercel.app\n\n#もあちゃんのギミチョコだいさくせん\n#BABYMETAL #さくら学院父兄パソコン部`;
    const encodedText = encodeURIComponent(text);
    const intent = `https://twitter.com/intent/tweet?text=${encodedText}`;
    window.open(intent);
  };

  return (
    <>
      <Image src={src} />
      <Flex align="end" justify="center" color="choco.500" p="16px">
        <Text fontSize="xl" as="b" lineHeight="30px">
          満腹度：
        </Text>
        <Text fontSize="3xl" as="b" lineHeight="33px">
          {score}
        </Text>
      </Flex>
      <Flex justify="center" gap="16px">
        <BaseButton
          colorScheme="choco"
          size="md"
          onClick={onClickReplay}
          text="もういちど遊ぶ！"
        />
        <BaseButton
          colorScheme="twitter"
          leftIcon={<FaTwitter />}
          size="md"
          onClick={onClickTweet}
          text="Twitterで共有"
        />
      </Flex>
    </>
  );
};
