import { useContext } from 'react';
import { ChallengesContext } from '../contexts/ChallengesContext';
import styles from '../style/components/Profile.module.css';

export function Profile() {
  const { level } = useContext(ChallengesContext);

  return (
    <div className={styles.profileContainer}>
      <img
        src="https://media-exp1.licdn.com/dms/image/C4D03AQGlF2Bdo5unjQ/profile-displayphoto-shrink_800_800/0/1614759258835?e=1620259200&v=beta&t=00r83P42CvX9sOk8t-n2aZwipyy-3eeHcqO0YSKT76k"
        alt="Ewerllon Cristian"
      />
      <div>
        <strong>Ewerllon Cristian</strong>
        <p>
          <img src="icons/level.svg" alt="Level" />
          Level {level}
        </p>
      </div>
    </div>
  );
}
