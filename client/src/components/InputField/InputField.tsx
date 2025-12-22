import styles from "./InputField.module.css";

type InputFieldProps<T extends string | number | null> = {
  children: React.ReactNode;
  id: string;
  value: T;
  onChange: (value: T) => void;
  type?: "text" | "number";
};

const InputField = <T extends string | number | null>({
  children,
  id,
  value,
  onChange,
  type = "text",
}: InputFieldProps<T>) => {

  return (
    <div className={styles.inputGroup}>
      <label htmlFor={id}>{children}</label>
      <input
        id={id}
        type={type}
        value={value ?? ""}
        onChange={(e) =>
          onChange(
            type === "number"
              ? (Number(e.target.value) as T)
              : (e.target.value as T)
          )
        }
      />
    </div>
  );
};

export default InputField;
