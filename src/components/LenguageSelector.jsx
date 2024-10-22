import { Form } from "react-bootstrap";
import { autoLanguage, supportedLenguages } from "../constants/constants";

export const LenguageSelector = ({ onChange, value, type }) => {
  const handleChange = (event) => {
    onChange(event.target.value);
  };

  return (
    <Form.Select aria-level="Selecciona el idioma" onChange={handleChange} value={value}>
      {/* {type === "from" && <option value={autoLanguage}>Detectar idioma</option>} */}

      {Object.entries(supportedLenguages).map(([key, name]) => (
        <option key={key} value={key}>
          {name}
        </option>
      ))}
    </Form.Select>
  );
};
