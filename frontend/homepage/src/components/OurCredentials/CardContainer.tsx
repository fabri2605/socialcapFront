import Image from "next/image";
import styles from "./card.module.css";
import { StackProps } from "@chakra-ui/react";

const CardContainer = ({ children }: StackProps) => (
    <div className={styles.stack}>{children}</div>
);

export default CardContainer;
