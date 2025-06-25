export const sproutPreStyle = {
  1: { width: 150, height: 150, marginBottom: -75 },
  2: { width: 180, height: 180, marginBottom: -80 },
  3: { width: 200, height: 300, marginBottom: -95 },
  4: { width: 220, height: 330, marginBottom: -95 },
  5: { width: 250, height: 375, marginBottom: -95 },
  6: { width: 290, height: 435, marginBottom: -95 },
  7: { width: 350, height: 525, marginBottom: -110 },
  8: { width: 420, height: 630, marginBottom: -150 },
};

export const treePreStyle = {
  1: { 1: -200, 2: -200, 3: -190, 4: -170, 11: -150, 12: -130, 13: -170, 14: -170, 15: -170, 16: -190, 18: -150 },
  2: { 1: -140, 2: -170, 3: -170, 7: -170, 8: -170, 9: -190, 14: -200 },
  3: { 4: -160, 6: -160, 11: -140, 12: -150, 13: -170 },
  4: { 1: -140, 6: -170, 7: -140, 8: -170, 9: -170, 11: -160, 12: -160, 13: -160, 15: -200 },
  5: { 1: -120, 2: -170 },
};

export const defaultTreePreStyle = (level) => ({
  width: 500 + 25 * (level - 1),
  height: 750 + 25 * (level - 1),
  marginBottom: -180,
});
