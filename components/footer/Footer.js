import React from 'react';
import Marquee from 'react-fast-marquee';

// styles
import styles from './scss/Footer.module.scss';

function Footer() {
  return (
    <div className={styles.footer_area}>
      <Marquee className={styles.marquee} speed={300}>
        <p>
          서울시 선발‧지원으로 GITEX ‘슈퍼노바 챌린지’ 참가 딥브레인AI…700여개
          기업 중 종합우승
        </p>
        <p>
          딥브레인AI, 실존 인물 기반 AI 휴먼 선생님ㆍ아나운서 이제 자주 보게 될
          것
        </p>
        <p>딥브레인AI, CES 2022 참가… 현장 부스서 AI 휴먼 기술 선보여</p>
      </Marquee>
    </div>
  );
}

export default Footer;
