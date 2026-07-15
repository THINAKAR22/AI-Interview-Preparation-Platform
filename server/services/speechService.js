/**
 * Speech Service – Audio transcription helper.
 * Swap the placeholder with a real provider (Google Speech-to-Text, Deepgram, etc.)
 */

/**
 * Transcribe audio buffer / file URL to text.
 * @param {Buffer|string} audioInput - raw audio buffer or URL
 * @returns {Promise<string>} transcribed text
 */
const transcribeAudio = async (audioInput) => {
  // Placeholder implementation
  // Replace with real provider, e.g.:
  // const { SpeechClient } = require('@google-cloud/speech');
  // const client = new SpeechClient();
  // const [response] = await client.recognize({ audio: { content: audioInput }, config: { ... } });
  // return response.results.map(r => r.alternatives[0].transcript).join('\n');

  console.log('[Speech Service] transcribeAudio called — returning placeholder.');
  return 'This is a placeholder transcription. Connect a real speech-to-text provider.';
};

/**
 * Analyze speech for confidence/pace/filler words.
 * @param {string} transcript - transcribed text
 * @returns {object} analysis metrics
 */
const analyzeSpeech = (transcript) => {
  const words = transcript.trim().split(/\s+/);
  const fillerWords = ['um', 'uh', 'like', 'you know', 'basically', 'actually'];
  const fillerCount = words.filter((w) => fillerWords.includes(w.toLowerCase())).length;

  return {
    wordCount: words.length,
    fillerWordCount: fillerCount,
    fillerWordRate: words.length > 0 ? ((fillerCount / words.length) * 100).toFixed(1) : 0,
    estimatedDurationSeconds: Math.round(words.length / 2.5), // ~150 WPM
    confidenceScore: Math.max(0, 100 - fillerCount * 5),
  };
};

module.exports = { transcribeAudio, analyzeSpeech };
