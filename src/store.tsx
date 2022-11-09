import { createContext, ReactNode, useState } from "react";

type View = "Top" | "Game" | "Result";

type Context = {
  view: View;
  setView: React.Dispatch<React.SetStateAction<View>>;
  score: number;
  setScore: React.Dispatch<React.SetStateAction<number>>;
};

export const Context = createContext({} as Context);

export const ContextProvider = ({ children }: { children: ReactNode }) => {
  const [view, setView] = useState<View>("Game");
  const [score, setScore] = useState(0);

  return (
    <Context.Provider value={{ view, setView, score, setScore }}>
      {children}
    </Context.Provider>
  );
};
