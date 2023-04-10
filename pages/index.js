import { useState } from 'react';
import Head from 'next/head';
import Image from 'next/image';
//import translator from './api/translate';

export default function Home() {
  let [text, setText] = useState('');
  let [targetLang, setTargetLang] = useState('EN-GB');
  let [translationDeepl, setTranslation] = useState('');
  let [translationGoogle, setTranslationGoogle] = useState('');
  let [sourceLang, setSourceLang] = useState('');

  const formData = {
    text: text,
    targetLang: targetLang,
    sourceLang: sourceLang
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:3000/api/translate-deepl', {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      })
      const data = await response.json();
      console.log(data);
      setTranslation(data.text);
    } catch (error) {
      console.log(error);
    }
    try {
      const response = await fetch('http://localhost:3000/api/translate-google', {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      })
      const data = await response.json();
      console.log(data);
      setTranslationGoogle(data.translation);
    } catch (error) {
      console.log(error);
    }
  };



  return (<div>
    <Head>
      <title>Translate with Deepl API and Google Cloud API</title>
      <link rel="icon" href="/favicon.ico" />
      <link href="styles/tailwind.css" />
    </Head>

    <main className="flex flex-col items-center justify-center w-full h-max flex-1 px-20 text-center p-4 text-center  sm:p-8 ">
      <h1 className="text-4xl font-bold">
        Translate with Deepl API
      </h1>

      <p className="mt-3 text-2xl">
        Enter the text you want to translate and select the target language:
      </p>

      <form onSubmit={handleSubmit} className="mt-6 w-full max-w-md">
        <div className="flex flex-col mb-4">
          <label htmlFor="text" className="mb-2 font-bold text-lg">
            Text to translate
          </label>
          <textarea
            id="text"
            type="text"
            className="resize rounded-md border text-lg"
            value={text}
            onChange={(e) => setText(e.target.value)}
            required
          />
        </div>
        <div className=" container mx-auto px-4 py-4 columns-2 gap-4">
          <div className="flex flex-col mb-4">
            <label htmlFor="source-lang" className="mb-2 font-bold text-lg">
              Source Language
            </label>
            <select
              id="source-lang"
              className="border rounded-lg py-2 px-3 text-lg"
              value={sourceLang}
              onChange={(e) => setSourceLang(e.target.value)}
            >
              <option value="">Auto detect</option>
              <option value="EN-GB">English</option>
              <option value="DE">German</option>
              <option value="HU">Hungarian</option>
              <option value="RO">Romanian</option>
              <option value="FR">French</option>
              <option value="ES">Spanish</option>
              <option value="IT">Italian</option>
            </select>
          </div>
          <div className="flex flex-col mb-4">
            <label htmlFor="target-lang" className="mb-2 font-bold text-lg">
              Target Language
            </label>
            <select
              id="target-lang"
              className="border rounded-lg py-2 px-3 text-lg"
              value={targetLang}
              onChange={(e) => setTargetLang(e.target.value)}
              required
            >
              <option value="EN-GB">English</option>
              <option value="DE">German</option>
              <option value="HU">Hungarian</option>
              <option value="RO">Romanian</option>
              <option value="FR">French</option>
              <option value="ES">Spanish</option>
              <option value="IT">Italian</option>
            </select>
          </div>
        </div>

        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Translate
        </button>
      </form>

      <div className=" container mx-auto px-4 py-4 columns-2 gap-4">
        <button onClick={() => { navigator.clipboard.writeText(translationDeepl) }}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6 hover:fill-cyan-700 active:fill-cyan-400">
            <path stroke-linecap="round" stroke-linejoin="round" d="M15.666 3.888A2.25 2.25 0 0013.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 01-.75.75H9a.75.75 0 01-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 01-2.25 2.25H6.75A2.25 2.25 0 014.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 011.927-.184" />
          </svg>

        </button>

        <div className="h-max overflow-scroll border">
          <h2 className="text-xl font-bold">Deepl:</h2>

          {translationDeepl && (
            <div className="flex justify-start">
              <p className="text-xl mt-3">{translationDeepl}</p>
            </div>
          )}

        </div>
        <button onClick={() => { navigator.clipboard.writeText(translationGoogle) }}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6 hover:fill-cyan-700 active:fill-cyan-400">
            <path stroke-linecap="round" stroke-linejoin="round" d="M15.666 3.888A2.25 2.25 0 0013.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 01-.75.75H9a.75.75 0 01-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 01-2.25 2.25H6.75A2.25 2.25 0 014.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 011.927-.184" />
          </svg>

        </button>

        <div className="h-max overflow-scroll border">
          <h2 className="text-xl font-bold">Google:</h2>
          {translationGoogle && (
            <div className="flex justify-start">
              <p className="text-xl mt-3">{translationGoogle}</p>
            </div>
          )}
        </div>

      </div>


    </main></div>
  );
}
