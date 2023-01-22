import React, { useEffect, useState } from "react";
import { authEndpoint, clientId, redirectUri, scopes } from "./config";
import hash from "./hash";
import Player from "./Player";
import EmojiBoard from './EmojiBoard';
import "./styles/App.css";

import spotifyProvider from "./utility/spotifyProvider";

const App = () => {
  const [count, setCount] = useState(0);
  const [state, setState] = useState({
    mood: [],
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // useEffect om te checken of er iets update als dat gebeurd en er is een token dan interval initieren
  useEffect(() => {
    if (hash.access_token) {
      // if count = 0 dan is de gebruiker pas net ingelogd, om ervoor te zorgen dat de gebruiken niet 3s hoeft te wachten 1x getData
      // op deze manier uitvoeren
      const refreshData = tickerInterval();
      return () => clearInterval(refreshData);
    }
  }, []);

  // tickerInterval die elke 3s getData() uitvoerd
  const tickerInterval = () => {
    const interval = setInterval(() => {
      setCount((count) => count + 1);
      console.log(state)
    }, 1000);
    return interval;
  };

  const handleCallback = async (childData) => {
    // state.mood.push(childData);
    console.log(childData);

    let moodList = state.mood;
    // let dup = [...new Set(moodList)];

    if (moodList.indexOf(childData) !== -1) {
      console.log("Yes, the value exists!");
      moodList = moodList.filter(function (item) {
        return item !== childData;
      });
          try {
            await spotifyProvider.getTrackBasedOnSeed(hash.access_token, moodList).then((result) => {
              console.log(result);
              return result;
            });
          } catch (err) {
            setError(err.message);
          }
    } else {
      console.log("No, the value is absent.");
      moodList.push(childData);
          try {
            await spotifyProvider.getTrackBasedOnSeed(hash.access_token, moodList).then((result) => {
              console.log(result);
              return result;
            });
          } catch (err) {
            setError(err.message);
          }
      return moodList
    }

    state.mood = moodList
    setState(state);
  };

  // const getData = async () => {
  //   if (count === 0) setLoading(true);
  //   try {
  //     await spotifyProvider
  //       .getCurrentPlayingTrack(hash.access_token)
  //       .then((player) => {
  //         state.player = player;
  //         return player;
  //       })

  //     // set state met de nieuwe objecten zodat we dit kunnen laten zien in de dom
  //     setState(state);
  //     if (!loading) setLoading(false);
  //   } catch (err) {
  //     // if error setError in state zodat je dit kan tonen in de dom
  //     setError(err.message);
  //     setLoading(false);
  //   }
  // };

  return (
    <>
      {/* if state.player bestaat render PLayer component en geef de data mee als prop */}
      <header>{state.player && <Player data={state.player} />}</header>
      <section>
        {!hash.access_token && (
          <div className="login-btn-container">
            <a
              className="btn btn--loginApp-link"
              href={`${authEndpoint}?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes.join(
                "%20"
              )}&response_type=token&show_dialog=true`}>
              Login with Spotify
            </a>
          </div>
        )}

        {hash.access_token && !state.player && (
          <div className="login-btn-container">
            <h1>Je moet een nummer afspelen om data te kunnen zien</h1>
          </div>
        )}

        {state.seededTracks && <h1>Hij is geladen</h1>}

        {state.mood.map(function (d, idx) {
          return <li key={idx}>{d}</li>;
        })}

        <EmojiBoard token={hash.access_token} parentCallback={handleCallback} />
      </section>
    </>
  );
};

export default App;
