import { Box, Collapse, Flex } from "@chakra-ui/react";
import { useContext } from "react";
import { Footer } from "./components/modules/Footer";
import { Game } from "./features/game";
import { Header } from "./components/modules/Header";
import { Result } from "./features/result";
import { Top } from "./features/top";
import { Context } from "./store";

export default function App() {
  const { view } = useContext(Context);

  return (
    <Flex
      direction="column"
      align="center"
      bg="cream"
      minH="100vh"
      userSelect="none"
      style={{ touchAction: "none" }}
    >
      <Header />
      <Box maxW="md" width="100%">
        <Collapse in={view === "Top"} animateOpacity unmountOnExit>
          <Top />
          <Footer />
        </Collapse>
        <Collapse in={view === "Game"} animateOpacity unmountOnExit>
          <Game />
        </Collapse>
        <Collapse in={view === "Result"} animateOpacity unmountOnExit>
          <Result />
          <Footer />
        </Collapse>
      </Box>
    </Flex>
  );
}
