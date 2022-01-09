import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';

// components
import Header from '../../components/header/Header';
import List from '../../components/list/List';
import Video from '../../components/video/Video';
import Footer from '../../components/footer/Footer';

// styles
import styles from '../../styles/ClientPage.module.scss';

const ClientPage = () => {
    // const [socket, setSocket] = useState();

    useEffect(() => {
        const socket = io('http://localhost:8005', {
            reconnectionDelayMax: 10000,
        });
        // setSocket(connSocket);

        socket.on('connect', () => {
            console.log(socket.connected);
        });

        socket.emit('message', { message: '테스트123' });
    }, []);

    return (
        <>
            <header>
                <Header />
            </header>
            <main>
                <section className={styles.content_area}>
                    <div className={styles.list_area}>
                        <List />
                    </div>
                    <div className={styles.video_area}>
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

export default ClientPage;