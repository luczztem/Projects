import { useState, useEffect, useContext } from 'react'
import { ChallengesContext } from '../contexts/ChallengesContext'
import { CountdownContext } from '../contexts/CountdownContext'
import styles from '../styles/components/Countdown.module.css'


export function Countdown() {
    const { minutes, 
            seconds, 
            hasFinished, 
            isActive, 
            startCountdown, 
            resetCountdown 
        } = useContext(CountdownContext)
    
    //-------------------------------
    const [minuteLeft, minuteRight] = String(minutes).padStart(2, '0').split('')
    const [secondLeft, secondRight] = String(seconds).padStart(2, '0').split('')
    // Isto faz parte do layout, não da regra de negócio.
    // Por isso fica aqui, e não em CountdownContext.tsx
    //-------------------------------

    return (
        <div>
            <div className={styles.countdownContainer}> 
                <div>
                    <span>{minuteLeft}</span>
                    <span>{minuteRight}</span>
                </div>
                <span>:</span>
                <div>
                    <span>{secondLeft}</span>
                    <span>{secondRight}</span>
                </div>
            </div>

            { hasFinished ? (   // Se isso for True, o botão é definido como DISABLED
                <button 
                    disabled 
                    className={styles.countdownButton}
                >
                    Ciclo Encerrado
                    <img src="icons/eye.svg" alt="" />
                </button>

            ) : (   //  O <> abaixo é um FRAGMENT do React. Serve como se fosse uma <div>,
                    // mas sem aparecer no HTML
                <>   
                    { isActive ? (  
                        <button 
                            type="button" 
                            className={`${styles.countdownButton} ${styles.countdownButtonActive}`}
                            onClick={resetCountdown}
                        >
                        Abandonar ciclo
                        </button>
                    ) : (
                        <button 
                            type="button" 
                            className={styles.countdownButton}
                            onClick={startCountdown}
                        >
                        Iniciar ciclo
                        </button>
                    )}
                </>
            )}

            
            
        </div>
    )
}