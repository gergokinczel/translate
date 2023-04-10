const deepl = require('deepl-node');

const translator = new deepl.Translator(process.env.DEEPL_API_KEY);

export default function handler(req, res) {
    const { text, targetLang, sourceLang } = req.body;
    console.log(req.body);
    translator
        .getUsage()
        .then((usage) => {
            console.log(usage);
            if (sourceLang === "")
                return translator.translateText(text, null, targetLang);
            return translator.translateText(text, sourceLang, targetLang);
        })
        .then((result) => {
            console.log(result.text); // Bonjour, le monde !
            res.send(JSON.stringify(result));
        })
        .catch((error) => {
            console.error(error);
            res.send(error);
            process.exit(1);
        });
}