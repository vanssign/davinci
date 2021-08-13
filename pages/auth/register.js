import FirebaseRegisterPageBuilder from '../../components/FirebaseRegisterPage'
import Head from 'next/head'

export default function Login() {
  return (
    <>
      <Head>
        <title>Register | Davinci</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <FirebaseRegisterPageBuilder
        apiKey={`${process.env.NEXT_PUBLIC_API_KEY}`}
        authDomain={`${process.env.NEXT_PUBLIC_AUTH_DOMAIN}`}
        projectId={`${process.env.NEXT_PUBLIC_PROJECT_ID}`}
        storageBucket={`${process.env.NEXT_PUBLIC_STORAGE_BUCKET}`}
        messagingSenderId={`${process.env.NEXT_PUBLIC_MESSAGING_SENDER_ID}`}
        appId={`${process.env.NEXT_PUBLIC_API_ID}`}
        measurementId={`${process.env.NEXT_PUBLIC_MEASUREMENT_ID}`} />
    </>
  )
}