import React from "react";
import spotifyProvider from "./utility/spotifyProvider";

const EmojiBoard = (props) => {
  let arr = []

  const onTrigger = (mood) => {
    arr.push(mood)
    console.log("emoji: ", arr)

    props.parentCallback(mood);
  }

  return (
    <>
      <section>
        <button onClick={() => spotifyProvider.getTrackBasedOnSeed(props.token, "house,salsa")}>Disco</button>
        <button onClick={() => onTrigger("house")}>House</button>
        <button onClick={() => onTrigger("disco")}>disco</button>
      </section>
    </>
  );
}

export default EmojiBoard;