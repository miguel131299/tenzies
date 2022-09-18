import "../styles/Die.css";

export default function Die(props) {
  return (
    <div
      className={props.isHeld ? "die-container held" : "die-container"}
      onClick={() => props.holdDice()}
    >
      {props.value}
    </div>
  );
}
