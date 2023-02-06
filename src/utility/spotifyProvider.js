class SpotifyProvider {
  // spotify API calls
  async getSeeds(token) {
    let response = await fetch("https://api.spotify.com/v1/recommendations/available-genre-seeds", {
      method: "get",
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    });
    if (response.ok) return response.json();
    else return null;
  }

  async getTrackBasedOnSeed(token, seed) {
    let response = await fetch("https://api.spotify.com/v1/recommendations?seed_genres=" + seed, {
      method: "get",
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    });
    if (response.ok) return response.json();
    else return null;
  }

  async saveTrackByID(token, trackId) {
    let response = await fetch("https://api.spotify.com/v1/me/tracks?ids=" + trackId, {
      method: "PUT",
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    });
    if (response.ok) return console.log("added");
    else return console.log("RES", response);
  }
}

export default new SpotifyProvider();
