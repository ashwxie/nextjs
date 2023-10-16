import Image from 'next/image'
import styles from './page.module.css'

export default function Home() {
  return (
    <main className={styles.main}>
      <div className={styles.description}>
        <a href="/signin">{`SIGN IN`}</a>
        <a href="/signup">{`SIGN UP`}</a>
        <a href="/admin">{`Already sign in? come here to check!`}</a>
      </div>
    </main>
  )
}
