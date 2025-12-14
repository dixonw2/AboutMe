import styles from "./InputField.module.css";

const InputField = ({
  children,
  id,
  value,
  onChange,
}: {
  children: React.ReactNode;
  id: string;
  value: string;
  onChange: (value: string) => void;
}) => {
  return (
    <div className={styles.inputGroup}>
      <label htmlFor={id}>{children}</label>
      <input id={id} value={value} onChange={(e) => onChange(e.target.value)} />
    </div>
  );
};

export default InputField;
