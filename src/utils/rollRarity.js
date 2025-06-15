function rollRarity(probabilities) {
  const total = probabilities.reduce((sum, p) => sum + p, 0);
  const random = Math.random() * total;

  let cumulative = 0;
  for (let i = 0; i < probabilities.length; i++) {
    cumulative += probabilities[i];
    if (random < cumulative) {
      return i + 1; // sao bắt đầu từ 1
    }
  }
}

export default rollRarity;
