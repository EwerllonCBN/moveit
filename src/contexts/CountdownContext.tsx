import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';
import { ChallengesContext } from './ChallengesContext';

interface CountdownContextData {
  isActive: boolean;
  seconds: number;
  hasFinished: boolean;
  minutes: number;
  startCountdown: () => void;
  resetCountDown: () => void;
}

let countdownTimeout: NodeJS.Timeout;

interface CountdownProviderProps {
  children: ReactNode;
}

export const CountdownContext = createContext({} as CountdownContextData);

export function CountdownProvider({ children }: CountdownProviderProps) {
  const { startNewChallenge } = useContext(ChallengesContext);

  const [time, setTime] = useState(
    30 * 60
  ); /* Inicializa o tempo inicial do CountDown em segundos*/

  const [isActive, setIsActive] = useState(false);
  const [hasFinished, setHasFinished] = useState(false); //Comça inicialmente como falso pois o CountDown ainda não finalizou.

  const minutes = Math.floor(time / 60);
  const seconds = time % 60;

  function startCountdown() {
    setIsActive(true);
  }

  function resetCountDown() {
    clearTimeout(countdownTimeout); //
    setIsActive(false);
    setTime(0.1 * 60); //*Após reset o Count retorna aos 25 minutos
    setHasFinished(false);
  }

  useEffect(() => {
    if (isActive && time > 0) {
      countdownTimeout = setTimeout(() => {
        setTime(time - 1);
      }, 1000);
    } else if (isActive && time == 0) {
      setHasFinished(true);
      setIsActive(false);
      startNewChallenge();
    }
  }, [
    isActive,
    time,
  ]); /*Enquanto o active tiver ativo e o time for maior que 0, ele vai diminuir -1 segundo*/
  return (
    <CountdownContext.Provider
      value={{
        isActive,
        seconds,
        hasFinished,
        minutes,
        startCountdown,
        resetCountDown,
      }}
    >
      {children}
    </CountdownContext.Provider>
  );
}
