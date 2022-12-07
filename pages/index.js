import Head from "next/head";
import { useState } from "react";
import styles from "./index.module.css";

export default function Home() {
  const [nameInput, setNameInput] = useState("");
  const [mitzvahInput, setMitzvahInput] = useState("");
  const [result, setResult] = useState();
  const [loading, setLoading] = useState(false);

  async function onSubmit(event) {
    setLoading(true);
    event.preventDefault();
    const response = await fetch("/api/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name: nameInput, mitzvah: mitzvahInput }),
    });
    const data = await response.json();
    setResult(data.result);
    setLoading(false);
  }

  return (
    <div>
      <Head>
        <title>OpenAI Quickstart</title>
        <link rel="icon" href="/dog.png" />
      </Head>

      <main className={styles.main}>
        <img src="/dog.png" className={styles.icon} />
        <h3>Mitzvah Note Generator</h3>
        <form onSubmit={onSubmit} disabled={loading}>
          <input
            type="text"
            name="name"
            placeholder="Enter a name"
            value={nameInput}
            onChange={(e) => setNameInput(e.target.value)}
          />
          <input
            type="text"
            name="mitzvah"
            placeholder="Enter a mitzvah"
            value={mitzvahInput}
            onChange={(e) => setMitzvahInput(e.target.value)}
          />
          <input type="submit" value="Generate Mitzvah note" />
        </form>
        <div className={styles.result}>{loading ? 'Loading...' : result}</div>
      </main>
    </div>
  );
}
