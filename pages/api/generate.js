import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export default async function (req, res) {
  let completion;
  try {
    completion = await openai.createCompletion({
      model: "text-davinci-002",
      prompt: generatePrompt(req.body.name, req.body.mitzvah),
      temperature: 0,
      max_tokens: 150,
    });
    console.log(completion.data)
  } catch (err) {
    console.log(err.response.statusText);
    return res.status(500).json({ result: err.response.statusText })
  }
  res.status(200).json({ result: completion.data.choices[0].text });
}

function generatePrompt(name, mitzvah) {
  return `
    A "mitzvah note" is a common practice for young children at school - parents will write a short "mitzvah" note 
    praising their child for a mitzvah (or good deed) they did. The teacher might read it aloud to the class 
    or paste it to a wall or board.

    Pretend to be the child's parent, you should write a 75 word, cheerful, child-friendly mitzvah note, 
    it should be addressed to the "Morah" (teacher).
    Use the following name for the child: ${name}
    and write a note praising the child for doing the following mitzvah: ${mitzvah}.
  `;
}
