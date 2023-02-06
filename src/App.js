import React, { useEffect, useState } from "react";
import { authEndpoint, clientId, redirectUri, scopes } from "./config";
import hash from "./hash";
import EmojiBoard from './EmojiBoard';
import "./styles/App.css";

import spotifyProvider from "./utility/spotifyProvider";

import { Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react/swiper-react";

import "swiper/swiper.min.css";
import "swiper/modules/pagination/pagination.min.css";
import { Navigation } from "swiper";

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
    let moodList = state.mood;
    state.tracks = [];
    if (moodList.indexOf(childData) !== -1) {
      console.log("Yes, the value exists!");
      moodList = moodList.filter(function (item) {
        return item !== childData;
      });
    state.mood = moodList;
          try {
            await spotifyProvider
              .getTrackBasedOnSeed(hash.access_token, moodList)
              .then((result) => {
                return result;
              })
              .then((res) => {
                state.tracks = res.tracks;
              });
          } catch (err) {
            setError(err.message);
          }
    } else {
      console.log("No, the value is absent.");
      moodList.push(childData);
      state.mood = moodList;
        try {
          await spotifyProvider.getTrackBasedOnSeed(hash.access_token, moodList).then((result) => {
            return result;
          }).then(res => {
            state.tracks = res.tracks
          });
        } catch (err) {
          setError(err.message);
        }
      return moodList
    }

    console.log(state)
    setState(state);
  };

  return (
    <>
      {/* if state.player bestaat render PLayer component en geef de data mee als prop */}
      <header>
        {state.mood && (
          <ul className="selectedMoodList">
            {state.mood.map(function (d, idx) {
              return <li key={idx}>{d}</li>;
            })}
          </ul>
        )}
      </header>
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

        {hash.access_token && !state.tracks && (
          <div className="login-btn-container">
            <h1>Je moet een mood kiezen om nummers te zien</h1>
          </div>
        )}

        {state.tracks && (
          <Swiper
            className="swiper-container"
            spaceBetween={50}
            grabCursor={true}
            slidesPerView={1}
            pagination={{
              type: "progressbar",
            }}
            modules={[Pagination]}>
            {state.tracks.map(function (d, idx) {
              if (d.preview_url != null) {
                return (
                  <SwiperSlide key={idx}>
                    <div className="trackSlide-inner">
                      <div className="albumCover-container">
                        <img src={d.album.images[1].url} alt="" />
                      </div>
                      <div className="trackCredentials">
                        <p>
                          {d.artists[0].name} - {d.name}
                        </p>
                        <audio controls>
                          <source src={d.preview_url} />
                        </audio>
                        <button class="btn-secondary" onClick={() => spotifyProvider.saveTrackByID(hash.access_token, d.id)}>
                          🔥 Fantastico
                        </button>
                      </div>
                    </div>
                  </SwiperSlide>
                );
              }
            })}
          </Swiper>
        )}

        { hash.access_token && <EmojiBoard token={hash.access_token} parentCallback={handleCallback} />}
      </section>
    </>
  );
};

export default App;
