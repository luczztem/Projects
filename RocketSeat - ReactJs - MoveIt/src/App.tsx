//import { Button } from './components/Button'
import { ChallengeBox } from './components/ChallengeBox';
import { CompletedChallenges } from './components/CompletedChallenges';
import { Countdown } from './components/Countdown';
import { ExperienceBar } from './components/ExperienceBar';
import { Profile } from './components/Profile';
import './styles/global.css'
import styles from "./styles/pages/Home.module.css"

import { ChallengesProvider } from './contexts/ChallengesContext'
import { useState } from 'react';
import { CountdownProvider } from './contexts/CountdownContext';



function App() {
  
  //CountdownProvider depende de ChallengesProvider, portando fica dentro dele

  return (
    <ChallengesProvider>
      <CountdownProvider> 
        <div className={styles.container}>
          <ExperienceBar />

          <section>
            <div>
              <Profile />
              <CompletedChallenges />
              <Countdown />
            </div>
            <div>
              <ChallengeBox />
            </div>
          </section>
        </div>
      </CountdownProvider>
    </ChallengesProvider>
  );
}

export default App;

//export const getServerSideProps 