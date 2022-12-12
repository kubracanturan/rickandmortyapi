import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.scss'
import Profile from './components/profile';
import Header from './components/header.tsx';


export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Rick And Morty</title>
        <meta name="description" content="Rick And Morty" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header/>
      <main className={styles.main}>
        <Profile/>
      </main>
    </div>
  )
}
