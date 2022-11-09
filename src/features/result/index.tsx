import { Button, Flex, Image, Text } from "@chakra-ui/react";
import { useContext } from "react";
import { FaTwitter } from "react-icons/fa";
import { BaseButton } from "../../components/parts/BaseButton";
import { Context } from "../../store";

export const Result = () => {
  const { score, setView } = useContext(Context);
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
    // TODO: ツイート機能の実装
    console.info("tweet");
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
          size="sm"
          onClick={onClickReplay}
          text="もういちど遊ぶ！"
        />
        <BaseButton
          colorScheme="twitter"
          leftIcon={<FaTwitter />}
          size="sm"
          onClick={onClickTweet}
          text="Twitterで共有"
        />
      </Flex>
    </>
  );
};
