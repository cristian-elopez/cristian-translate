import { Form } from "react-bootstrap";
import { SelectionType } from "../constants/constants";

const commonStyles = {
  minHeight: "300px",
  resize: "none",
  overflow: "hidden",
};

const getPlaceholder = ({ type, loading }) => {
  if (type === SelectionType.from) return "Introducir texto";
  if (loading) return "Cargando...";
  return "Tradución";
};

export const TextArea = ({ type, loading, value, onChange, mode }) => {
  const styles =
    type === SelectionType.from
      ? mode
        ? { ...commonStyles, backgroundColor: "#bfbfbf" }
        : commonStyles
      : mode
      ? { ...commonStyles, backgroundColor: "#9f9f9f" }
      : { ...commonStyles, backgroundColor: "#f5f5f5" };

  return (
    <Form.Control
      as="textarea"
      placeholder={getPlaceholder({ type, loading })}
      autoFocus={type === SelectionType.from}
      disabled={type === SelectionType.to}
      style={styles}
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  );
};
