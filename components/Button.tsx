import styles from "./Button.module.scss";

interface ButtonProps {
  text: string;
  tooltip?: string;
  onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

export const Button = ({ text, tooltip, onClick }: ButtonProps) => {
  return (
    <button className={styles.button} onClick={onClick}>
      {text}
      {tooltip ? <div className={styles.tooltip}>{tooltip}</div> : ""}
    </button>
  );
};
