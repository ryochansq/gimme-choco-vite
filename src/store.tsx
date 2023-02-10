import { createContext, ReactNode, useState } from "react";

type Context = {
  view: View;
  setView: React.Dispatch<React.SetStateAction<View>>;
  score: number;
  setScore: React.Dispatch<React.SetStateAction<number>>;
  level: Level;
  setLevel: React.Dispatch<React.SetStateAction<Level>>;
};

export const Context = createContext({} as Context);

export const ContextProvider = ({ children }: { children: ReactNode }) => {
  const [view, setView] = useState<View>("Top");
  const [score, setScore] = useState(0);
  const [level, setLevel] = useState<Level>("あまい");

  return (
    <Context.Provider
      value={{ view, setView, score, setScore, level, setLevel }}
    >
      {children}
    </Context.Provider>
  );
};
