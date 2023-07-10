import Image from "next/image";
import styles from "./card.module.css";
export interface Card {
  index: number;
  title: string;
  content: string;
  image: string;
}
interface Props {
  card: Card;
}
const Card = ({ card }: Props) => (
  <li key={card.index} className={styles.card}>
    <div className={styles.cardBody}>
      <h3>{card.title}</h3>
      <p>{card.content}</p>
    </div>
    <Image
      alt={"card"}
      src={card.image}
      width={100}
      height={100}
      className={styles.cardImg}
    />
  </li>
);

export default Card;
