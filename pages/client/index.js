import React from 'react';

// components
import Header from '../../components/header/Header';
import List from '../../components/list/List';
import Video from '../../components/video/Video';
import Footer from '../../components/footer/Footer';

// styles
import styles from '../../styles/ClientPage.module.scss';

function ClientPage() {
  return (
    <>
      {/* 공통 헤더 컴포넌트 */}
      <header>
        <Header />
      </header>
      <main>
        <section className={styles.content_area}>
          {/* 호출 리스트 컴포넌트 */}
          <div className={styles.list_area}>
            <List />
          </div>
          {/* 영상 컴포넌트 */}
          <div className={styles.video_area}>
            <Video />
          </div>
        </section>
      </main>
      {/* 공통 푸터 컴포넌트 */}
      <footer>
        <Footer />
      </footer>
    </>
  );
}

export default ClientPage;
