import { createContext, useState, ReactNode, useEffect } from "react";
  // 40min do video 3
import challenges from "../challenges.json"
import Cookies from 'js-cookie'

interface Challenge {
    type: 'body' | 'eye'
    description: string
    amount: number
}

interface ChallengesContextData {
    level: number
    currentExperience: number
    experienceToNextLevel: number
    challengesCompleted: number
    activeChallenge: any    // Originalmente era usado o tipo como Challenge, mas dá erro, então vai any
    levelUp: () => void               //  Simboliza uma função que não tem retorno.
    startNewChallenge: () => void     //  Simboliza uma função que não tem retorno.
    resetChallenge: () => void
    completeChallenge: () => void
}

interface Props {
    children: ReactNode // O ? após a variavel (children?) simboliza que ela não é obrigatoria.
}                       // Video 3 aos 45min

export const ChallengesContext = createContext({} as ChallengesContextData)

//const defaultobj = {type:'body', description:'', amount:0}

export function ChallengesProvider({ children }:Props) {
    const [level, setLevel] = useState(1);
    const [currentExperience, setCurrentExperience] = useState(0)
    const [challengesCompleted, setChallengesCompleted] = useState(0)

    const [activeChallenge, setActiveChallenge] = useState<Challenge | null>(null)

    const experienceToNextLevel = Math.pow((level + 1) * 4, 2) // Calculo com potenciação para definir o XP para o proximo nivel

    //---------------------------
    //Quando é passado um array [] vazio como segundo parâmetro, ele executa a 
    //primeira função (() => {})
    //uma única vez quando o componente for exibido em tela
    useEffect(() => {
        Notification.requestPermission()
    }, [])
    //---------------------------

    //---------------------------
    useEffect(() => {
        Cookies.set('level', String(level))
        Cookies.set('currentExperience', String(currentExperience))
        Cookies.set('challengesCompleted', String(challengesCompleted))
    }, [level, currentExperience, challengesCompleted])
    // Sempre que houver mudança nos valores acima, a fundão dentro do useEffect é executada.
    // As informações dessas variáveis serão salvas nos Cookies do navegador.
    //---------------------------

    function levelUp() {
        setLevel(level + 1)
    }

    function startNewChallenge() {
        const randomChallengeIndex = Math.floor(Math.random() * challenges.length)
        const challenge = challenges[randomChallengeIndex]
        setActiveChallenge(challenge as Challenge)


        new Audio('/notification.mp3').play()

        if (Notification.permission === 'granted') {
            new Notification('Novo desafio 🎉', {
                body: `Valendo ${challenge.amount}xp!`
            })
        }
    }

    //const activeChallengeXX:Challenge = activeChallenge !== null ? activeChallenge: '';

    function resetChallenge() {
        setActiveChallenge(null)
    }

    function completeChallenge() {
        if (!activeChallenge) {// Uma validação para que a função não possa ser chamada sem que um Challenge esteja ativo.
            return
        }

        const { amount } = activeChallenge

        let finalExperience = currentExperience + amount

        if (finalExperience >= experienceToNextLevel) {
            finalExperience = finalExperience - experienceToNextLevel
            levelUp()
        }

        setCurrentExperience(finalExperience)
        setActiveChallenge(null)
        setChallengesCompleted(challengesCompleted + 1)

        // 80 -- User tem 80XP
        // 120 - Precisa de 120 p/ upar

        // 80 -- Ganhou + 80 XP

        // 160 - 120 = 40 - 80+80=160, upa de nível e sobra 40
    }

    return(
        <ChallengesContext.Provider 
            value={{ 
                level, 
                currentExperience, 
                experienceToNextLevel,
                challengesCompleted, 
                activeChallenge,
                levelUp, 
                startNewChallenge,
                resetChallenge,
                completeChallenge }}
        >
            {children}
        </ChallengesContext.Provider>
    ) 
}