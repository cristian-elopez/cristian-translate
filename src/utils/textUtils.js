export function handleClipboard(text) {
  return navigator.clipboard.writeText(text);
}

export function handleSpeaker(text, lenguaje) {
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = lenguaje;
  speechSynthesis.speak(utterance);
}
