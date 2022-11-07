import { Box, Collapse } from "@chakra-ui/react";
import { useContext } from "react";
import { Footer } from "./features/footer";
import { Game } from "./features/game";
import { Header } from "./features/header";
import { Result } from "./features/result";
import { Top } from "./features/top";
import { Context } from "./store";

export default function App() {
  const { view } = useContext(Context);

  return (
    <Box bg="cream" minH="100vh">
      <Header />
      <Collapse in={view === "Top"} animateOpacity>
        <Top />
        <Footer />
      </Collapse>
      <Collapse in={view === "Game"} animateOpacity>
        <Game />
      </Collapse>
      <Collapse in={view === "Result"} animateOpacity>
        <Result />
        <Footer />
      </Collapse>
    </Box>
  );
}
