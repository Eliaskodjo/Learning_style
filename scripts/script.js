function calculateResults() {
  const form = document.getElementById('quizForm');
  const formData = new FormData(form);

  let scores = { A: 0, B: 0, C: 0, D: 0 };

  for (let i = 1; i <= 5; i++) {
    let answer = formData.get(`q${i}`);
    if (answer) scores[answer]++;
  }

  // Section 2 Scoring
  const visual = parseInt(formData.get('s1'));
  const auditory = parseInt(formData.get('s2'));
  const reading = parseInt(formData.get('s3'));
  const kinesthetic = parseInt(formData.get('s4'));

  if (visual >= auditory && visual >= reading && visual >= kinesthetic) scores['A']++;
  else if (auditory >= visual && auditory >= reading && auditory >= kinesthetic) scores['B']++;
  else if (reading >= visual && reading >= auditory && reading >= kinesthetic) scores['C']++;
  else if (kinesthetic >= visual && kinesthetic >= auditory && kinesthetic >= reading) scores['D']++;

  // Find highest score
  const highest = Object.keys(scores).reduce((a, b) => scores[a] > scores[b] ? a : b);

  let resultText = "";

  switch (highest) {
    case 'A':
      resultText = "<h3>You are a Visual Learner 🎨</h3><p>Use mind maps, charts, diagrams, and videos to boost your learning!</p>";
      break;
    case 'B':
      resultText = "<h3>You are an Auditory Learner 🎧</h3><p>Listen to lectures, participate in discussions, and talk out loud to learn better.</p>";
      break;
    case 'C':
      resultText = "<h3>You are a Reading/Writing Learner 📚</h3><p>Focus on text-based materials, notes, and writing summaries to succeed.</p>";
      break;
    case 'D':
      resultText = "<h3>You are a Kinesthetic Learner ✋</h3><p>Engage in physical activities, simulations, and real-world tasks to learn effectively.</p>";
      break;
    default:
      resultText = "<h3>Multimodal Learner 🌟</h3><p>You can use multiple styles! Try mixing different study techniques for the best outcome.</p>";
  }

  const resultsDiv = document.getElementById('results');
  resultsDiv.innerHTML = resultText;
  resultsDiv.classList.remove('hidden');

  window.scrollTo({ top: resultsDiv.offsetTop, behavior: 'smooth' });
}
