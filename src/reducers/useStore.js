import { useReducer } from "react";
import { autoLanguage, translatorOptions } from "../constants/constants";

const initialState = {
  fromLanguage: "en", // lenguaje inicial
  toLanguage: "es", // lenguaje destino
  fromText: "", // texto original
  result: "", // resultado
  loading: false, // si esta cargando
};

function translatorReducer(state, action) {
  switch (action.type) {
    case translatorOptions.INTERCHANGE_LANGUAGES:
      if (state.fromLanguage === autoLanguage) return state; // impide que el lenguaje destino sea automatico
      return {
        ...state,
        fromLanguage: state.toLanguage,
        toLanguage: state.fromLanguage,
        fromText: state.result,
        result: state.fromText,
        loading: state.fromText !== "",
      };
    case translatorOptions.SET_FROM_LANGUAGE:
      return {
        ...state,
        fromLanguage: action.payload,
        result: "",
        loading: state.fromText !== "",
      };
    case translatorOptions.SET_TO_LANGUAGE:
      return {
        ...state,
        toLanguage: action.payload,
        result: "",
        loading: state.fromText !== "",
      };
    case translatorOptions.SET_FROM_TEXT:
      return {
        ...state,
        fromText: action.payload,
        result: "", // limpia el resultado si hay cambios en el texto
        loading: action.payload !== "", // si hay texto pone cargando sino no
      };
    case translatorOptions.SET_RESULT:
      return {
        ...state,
        result: action.payload,
        loading: false,
      };
    default:
      return state;
  }
}

export function useStore() {
  const [{ fromLanguage, toLanguage, fromText, result, loading }, dispatch] = useReducer(
    translatorReducer,
    initialState
  );

  const handleInterchangeLanguages = () => dispatch({ type: translatorOptions.INTERCHANGE_LANGUAGES });
  const handleSetFromLenguages = (payload) =>
    dispatch({ type: translatorOptions.SET_FROM_LANGUAGE, payload });
  const handleSetToLenguages = (payload) => dispatch({ type: translatorOptions.SET_TO_LANGUAGE, payload });
  const handleSetFromText = (payload) => dispatch({ type: translatorOptions.SET_FROM_TEXT, payload });
  const handleSetResult = (payload) => dispatch({ type: translatorOptions.SET_RESULT, payload });

  return {
    fromLanguage,
    toLanguage,
    fromText,
    result,
    loading,
    handleInterchangeLanguages,
    handleSetFromLenguages,
    handleSetToLenguages,
    handleSetFromText,
    handleSetResult, // se puede dejar este método para actualizar el resultado en tiempo real
  };
}
