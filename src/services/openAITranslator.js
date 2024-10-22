// traductor con open AI API
import OpenAI from "openai";
import { supportedLenguages } from "../constants/constants";

const apiKey = "";

const openai = new OpenAI({ apiKey, dangerouslyAllowBrowser: true }); // dangerouslyAllowBrowser para indicar que confie en la ejecucion en el navegador

export async function translateTextAI({ fromLanguage, toLanguage, text }) {
  if (fromLanguage === toLanguage) return text;

  const messages = [
    {
      role: "system",
      content:
        "You are a AI that translates text. You receive a text from user. Do not answer, just translate the text. The original language is surrounded by `{{`and`}}`. You can also receive {{auto}} which means that you have to detect the language. The language you translate to is surrounded by `[[`and`]]`.",
    },
    {
      role: "user",
      content: `Hola mundo {{Español}}} [[English]]`,
    },
    {
      role: "assistant",
      content: `Hello world`,
    },
    {
      role: "user",
      content: `How are you {{auto}}} [[Deutsch]]`,
    },
    {
      role: "assistant",
      content: `Wie geht es dir`,
    },
    {
      role: "user",
      content: `Bom dia, com estas? {{auto}}} [[Español]]`,
    },
    {
      role: "assistant",
      content: `Buenos días, ¿cómo estas?`,
    },
  ];

  const fromCode = fromLanguage === "auto" ? "auto" : supportedLenguages[fromLanguage];
  const toCode = supportedLenguages[toLanguage];

  const completion = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      ...messages,
      {
        role: "user",
        content: `${text} {{${toCode}}} [[${fromCode}]]`,
      },
    ],
    temperature: 0.7,
    max_tokens: 64,
    top_p: 1,
  });

  return completion.choices[0]?.message?.content;
}
