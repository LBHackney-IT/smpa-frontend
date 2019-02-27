export function createFirstFlow ({commit}, data) {
  return new Promise((resolve) => {
    setTimeout(() => {
      commit('createFirstFlow', data);
      resolve();
    }, 1000);
  });
}

export function updateFlow ({commit}, data) {
  return new Promise((resolve) => {
    setTimeout(() => {
      commit('updateFlow', data);
      resolve();
    }, 1000);
  });
}

