import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Col, Container, Row, Stack } from "react-bootstrap";

import { useStore } from "./reducers/useStore";
import { autoLanguage, SelectionType } from "./constants/constants";
import { LenguageSelector } from "./components/LenguageSelector";
import { TextArea } from "./components/TextArea";
import { useEffect } from "react";
import { translateText } from "./services/myMemoryTranslator";
import { PiArrowsLeftRightBold } from "react-icons/pi";
import { useToggleMode } from "./reducers/darkMode";
import { buttonsStyles, darkBodyStyles, lightBodyStyles } from "./styles/generalStyles";
import { useDebounce } from "./reducers/useDebounce";
import { handleClipboard, handleSpeaker } from "./utils/textUtils";

import { IoInvertMode } from "react-icons/io5";
import { FaCopy } from "react-icons/fa";
import { IoMdVolumeHigh } from "react-icons/io";

function App() {
  const {
    fromLanguage,
    toLanguage,
    fromText,
    result,
    loading,
    handleInterchangeLanguages,
    handleSetFromLenguages,
    handleSetToLenguages,
    handleSetFromText,
    handleSetResult,
  } = useStore();

  const { mode, handleToggleMode } = useToggleMode();
  const debauncedFromText = useDebounce(fromText, 300);

  useEffect(() => {
    if (debauncedFromText === "") return;

    translateText({ fromLanguage, toLanguage, text: debauncedFromText })
      .then((result) => {
        if (result === null) return;
        handleSetResult(result);
      })
      .catch((error) => {
        console.error("Error al traducir el texto:", error);
      });
  }, [fromText, fromLanguage, toLanguage]);

  return (
    <Container
      style={mode ? darkBodyStyles : lightBodyStyles}
      fluid
      className="text-center align-content-center"
    >
      <Row className="justify-content-md-center">
        <Col>
          <img
            src="https://res.cloudinary.com/dja0b7qbo/image/upload/f_auto,q_auto/v1/PROYECTOS/PORTFOLIO/avatar_cristian"
            alt="Avatar de Cristian"
            style={{ maxWidth: "80px" }}
          />
          <h1>Cristian Translate</h1>
        </Col>
      </Row>

      <Row className="justify-content-md-center">
        <Col md={4}>
          <Stack gap={2}>
            <h2>De</h2>
            <LenguageSelector
              onChange={handleSetFromLenguages}
              value={fromLanguage}
              type={SelectionType.from}
            />
            <div style={{ position: "relative" }}>
              <TextArea type={SelectionType.from} value={fromText} onChange={handleSetFromText} mode={mode} />
              <div style={buttonsStyles}>
                <Button variant="link" onClick={() => handleSpeaker(fromText, fromLanguage)}>
                  <IoMdVolumeHigh color={mode ? "white" : "black"} size={25} />
                </Button>
              </div>
            </div>
          </Stack>
        </Col>
        <Col xs="auto">
          <Button
            variant="link"
            onClick={() => handleInterchangeLanguages()}
            disabled={fromLanguage === autoLanguage}
          >
            <PiArrowsLeftRightBold color={mode ? "white" : "black"} size={25} />
          </Button>
        </Col>
        <Col md={4}>
          <Stack gap={2}>
            <h2>A</h2>
            <LenguageSelector onChange={handleSetToLenguages} value={toLanguage} type={SelectionType.to} />
            <div style={{ position: "relative" }}>
              <TextArea
                type={SelectionType.to}
                value={result}
                onChange={handleSetResult}
                loading={loading}
                mode={mode}
              />
              <div style={buttonsStyles}>
                <Button variant="link" onClick={() => handleClipboard(result)}>
                  <FaCopy color={mode ? "white" : "black"} size={25} />
                </Button>
                <Button variant="link" onClick={() => handleSpeaker(result, toLanguage)}>
                  <IoMdVolumeHigh color={mode ? "white" : "black"} size={25} />
                </Button>
              </div>
            </div>
          </Stack>
        </Col>
      </Row>

      <Row className="justify-content-md-center">
        <Col xs="auto">
          <Button variant="link" onClick={() => handleToggleMode()}>
            <IoInvertMode color={mode ? "white" : "black"} size={25} />
          </Button>
        </Col>
      </Row>
    </Container>
  );
}

export default App;
