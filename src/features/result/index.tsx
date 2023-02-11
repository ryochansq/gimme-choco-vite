import { Flex, Image, Text, useToast } from "@chakra-ui/react";
import { useContext, useEffect, useState } from "react";
import { FaTwitter } from "react-icons/fa";
import { BaseButton } from "../../components/parts/BaseButton";
import { levelToText } from "../../functions/level";
import { Context } from "../../store";

export const Result = () => {
  const { score, setView, level, limit, setLimit } = useContext(Context);
  const toast = useToast();
  const onToast = (newLimit: Level) => {
    if (!toast.isActive("toast"))
      toast({
        id: "toast",
        title: `むずかしさ「${newLimit}」が解放されたよ！`,
        status: "success",
        duration: 9000,
        isClosable: true,
        position: "top",
      });
  };

  const releaseLevel = (newLevel: Level) => {
    localStorage.setItem("limit", newLevel);
    setLimit(newLevel);
    onToast(newLevel);
  };

  useEffect(() => {
    if (level === "ふつう" && limit === "ふつう" && score >= 80)
      releaseLevel("からい");
    if (level === "からい" && limit === "からい" && score >= 80)
      releaseLevel("ヤバッ！");
  }, []);

  const evaluation = (() => {
    if (score === 100 && (level === "ヤバッ！" || level === "からい"))
      return "200";
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
