import Head from "next/head"
import { useAuthState } from "react-firebase-hooks/auth"
import firebase from "../firebase"

export default function Home() {
    const [user, loading, error] = useAuthState(firebase.auth())
    console.log("Loading: ", loading, "|", "Current User: ", user)
    return (
        <div>
            <Head>
                <title>Create Next App</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <h1 className="text-yellow-600 text-4xl">Dashboard</h1>
        </div>
    )
}
