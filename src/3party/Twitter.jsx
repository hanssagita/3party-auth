import React from "react";
import axios from "axios";

const consumerKey = import.meta.env.VITE_TWITTER_CLIENT_ID;
const consumerSecret = import.meta.env.VITE_TWITTER_CLIENT_SECRET;

const bearerTokenCredentials = `${consumerKey}:${consumerSecret}`;
const encodedBearerTokenCredentials = btoa(bearerTokenCredentials);

const Twitter = () => {

  const handleConnect = () => {
    const url =
      `https://twitter.com/i/oauth2/authorize?response_type=code&client_id=${consumerKey}&redirect_uri=http%3A%2F%2F127.0.0.1%3A5173%2F&scope=users.read&state=state&code_challenge=challenge&code_challenge_method=plain`;
      window.location.assign(url);
  }

  const handleGetAccessToken = async () => {
    const data = await axios.post(
      "https://api.twitter.com/oauth2/token",
      {
        grant_type: "client_credentials",
      },
      {
        headers: {
          Authorization: `Basic ${encodedBearerTokenCredentials}`,
          "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
        },
      }
    );
    console.log(data);
  };

  return (
    <div className="flex flex-col space-y-4 w-80">
      <button className="bg-cyan-300" onClick={handleConnect}>Link to twitter consent</button>
      <button className="bg-cyan-300" onClick={handleGetAccessToken}>Get Twitter Access Token</button>
    </div>
  );
};

export default Twitter;
