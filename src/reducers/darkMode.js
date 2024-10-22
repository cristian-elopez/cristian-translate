import { useReducer } from "react";
import { modeActions } from "../constants/constants";

const inicialState = {
  mode: false,
};

function darkModeReducer(state, action) {
  switch (action.type) {
    case modeActions.setMode:
      return { ...state, mode: !state.mode };
    default:
      return state;
  }
}

export function useToggleMode() {
  const [{ mode }, dispatch] = useReducer(darkModeReducer, inicialState);

  const handleToggleMode = () => dispatch({ type: modeActions.setMode });

  return {
    mode,
    handleToggleMode,
  };
}
