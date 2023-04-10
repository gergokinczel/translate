
const { Translate } = require('@google-cloud/translate').v2;

const translate = new Translate({ key: process.env.GOOGLE_API_KEY });


export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(400).json({ message: 'Invalid request method' });
    return;
  }

  const { text, targetLang } = req.body;

  try {
    const [translation] = await translate.translate(text, targetLang);
    console.log("Google: " + translation);
    res.status(200).json({ translation });
  } catch (error) {
    console.error(error);

    res.status(500).json({ message: 'Internal server error' });
  }
}
