import React from 'react';

// components
import Header from '../../components/header/Header';
import List from '../../components/list/List';
import Video from '../../components/video/Video';
import Footer from '../../components/footer/Footer';

// styles
import styles from '../../styles/AdminPage.module.scss';

const AdminPage = () => {
    return (
        <>
            <header>
                <Header />
            </header>
            <main>
                <section>
                    <div>
                        <List />
                    </div>
                    <div>
                        <Video />
                    </div>
                </section>
            </main>
            <footer>
                <Footer />
            </footer>
        </>
    )
}

export default AdminPage;