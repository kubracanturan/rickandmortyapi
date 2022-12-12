import Head from 'next/head'
import styles from '../styles/Home.module.scss'
import LocationList from './components/location';
import Header from './components/header';


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
        <LocationList/>
      </main>
    </div>
  )
}
