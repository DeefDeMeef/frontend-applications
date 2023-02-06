import React from "react";

const EmojiBoard = (props) => {
  let arr = []

  const onTrigger = (mood) => {
    arr.push(mood)

    props.parentCallback(mood);
  }

  return (
    <>
      <section className="moodButtons">
        <button onClick={() => onTrigger("rock")}>
          <span>🎸</span>
          Rock
        </button>
        <button onClick={() => onTrigger("reggae")}>
          <span>🪘</span>
          Reggae
        </button>
        <button onClick={() => onTrigger("dance")}>
          <span>🕺🏼</span>
          Dance
        </button>
        <button onClick={() => onTrigger("summer")}>
          <span>😎</span>
          Summer
        </button>
        <button onClick={() => onTrigger("techno")}>
          <span>⛓️</span>
          Techno
        </button>
        <button onClick={() => onTrigger("salsa")}>
          <span>🌮</span>
          Salsa
        </button>
        <button onClick={() => onTrigger("sad")}>
          <span>😢</span>
          Sad
        </button>
        <button onClick={() => onTrigger("piano")}>
          <span>🎹</span>
          Piano
        </button>
        <button onClick={() => onTrigger("house")}>
          <span>🏡</span>
          House
        </button>
        <button onClick={() => onTrigger("disco")}>
          <span>🪩</span>
          Disco
        </button>
      </section>
    </>
  );
}

export default EmojiBoard;