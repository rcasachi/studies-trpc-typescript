import Head from 'next/head'
import Image from 'next/image'
import React, { useState } from 'react'

import styles from '../styles/Home.module.css'
import { trpc } from '../utils/trpc'

export default function Home() {
  const [type, setType] = useState('')
  const [content, setContent] = useState('')

  const { mutateAsync: createFeedback } = trpc.createFeedback.useMutation();

  const { data } = trpc.hello.useQuery({
    text: 'Rafa'
  });

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    try {
      await createFeedback({
        type,
        content,
      });
    } catch (e) {
      alert('errooooooor')
    }
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to <a href="https://nextjs.org">Next.js! </a>
          Feedbacks: {data?.countFeedbacks}
        </h1>

        <p className={styles.description}>
          {data?.greeting}, get started by editing{' '}
          <code className={styles.code}>pages/index.tsx</code>
        </p>


        <div>
          <input name="type" value={type} onChange={(e) => setType(e.target.value)} />
          <textarea name="content" value={content} onChange={(e) => setContent(e.target.value)}></textarea>
          <button type="submit" onClick={(e) => handleSubmit(e)}>Enviar Feedback</button>
        </div>

        <ol>
          {data?.feedbacks.map(({id, type, content, createdAt}) => (
            <li key={id}>{`${id} - ${type}: ${content} (${createdAt})`}</li>
          ))}
        </ol>

        <div className={styles.grid}>
          <a href="https://nextjs.org/docs" className={styles.card}>
            <h2>Documentation &rarr;</h2>
            <p>Find in-depth information about Next.js features and API.</p>
          </a>

          <a href="https://nextjs.org/learn" className={styles.card}>
            <h2>Learn &rarr;</h2>
            <p>Learn about Next.js in an interactive course with quizzes!</p>
          </a>

          <a
            href="https://github.com/vercel/next.js/tree/canary/examples"
            className={styles.card}
          >
            <h2>Examples &rarr;</h2>
            <p>Discover and deploy boilerplate example Next.js projects.</p>
          </a>

          <a
            href="https://vercel.com/new?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.card}
          >
            <h2>Deploy &rarr;</h2>
            <p>
              Instantly deploy your Next.js site to a public URL with Vercel.
            </p>
          </a>
        </div>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer>
    </div>
  )
}
