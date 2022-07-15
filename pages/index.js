import Head from "next/head";
import Image from "next/image";
import Github from "../src/components/GIthub";
import styles from "../styles/styles.module.css";
export default function Home() {
  return (
    <div>
      <Head>
        <title>Daniel Github</title>
        <meta name="description" content="Lista de repositório github" />
      </Head>

      <main className={styles.main}>
        <h1>
          <p>Lista de repositório de Daniel Cunha</p>
        </h1>

        <div>
          <Github />
        </div>
      </main>
    </div>
  );
}
