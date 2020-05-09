import { createSelector } from "reselect";

// Input selector
const selectHistory = (state) => state.history;

// Output selectors
export const selectEasyModeHistory = createSelector(
  [selectHistory],
  (history) => ({
    own: history.easy.filter((game) => game.result === 1),
    lost: history.easy.filter((game) => game.result === 0),
  })
);

export const selectMediumModeHistory = createSelector(
  [selectHistory],
  (history) => ({
    own: history.medium.filter((game) => game.result === 1),
    lost: history.medium.filter((game) => game.result === 0),
  })
);

export const selectHardModeHistory = createSelector(
  [selectHistory],
  (history) => ({
    own: history.hard.filter((game) => game.result === 1),
    lost: history.hard.filter((game) => game.result === 0),
  })
);

export const totalLifeTimeScore = createSelector([selectHistory], (history) =>
  Object.values(history).reduce(
    (accumulator, mode) =>
      accumulator +
      mode.reduce((accumulator, game) => accumulator + game.final_score, 0),
    0
  )
);

export const totalLifeTimeClicks = createSelector([selectHistory], (history) =>
  Object.values(history).reduce(
    (accumulator, mode) =>
      accumulator +
      mode.reduce((accumulator, game) => accumulator + game.n_clicks, 0),
    0
  )
);
