import { useState, useEffect } from "react";
import axios from "axios";

const clientId = import.meta.env.VITE_DISCORD_CLIENT_ID
const clientSecret = import.meta.env.VITE_DISCORD_CLIENT_SECRET

const Discord = () => {
  const [accessToken, setAccessToken] = useState("");
  const [user, setUser] = useState({});
  const handleConnect = () => {
    const url =
      "https://discord.com/api/oauth2/authorize?client_id=1106614720355639349&redirect_uri=http%3A%2F%2F127.0.0.1%3A5173%2F&response_type=code&scope=identify";
    window.location.assign(url);
  };
  const params = new URLSearchParams(window.location.search);
  const code = params.get("code");

  const handleGetAuthToken = async () => {
    const data = await axios.post(
      "https://discord.com/api/v10/oauth2/token",
      {
        client_id: clientId,
        client_secret: clientSecret,
        grant_type: "authorization_code",
        code: code,
        redirect_uri: "http://127.0.0.1:5173/",
        scope: "identify",
      },
      {
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
      }
    );
    setAccessToken(data.data.access_token);
    window.localStorage.setItem("access_token", data.data.access_token);
  };

  const handleGetAuthData = async () => {
    const data = await axios("https://discord.com/api/oauth2/@me", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    setUser(data.data.user);
  };

  useEffect(() => {
    const accessToken = window.localStorage.getItem("access_token");
    if (accessToken) {
      setAccessToken(accessToken);
    }
  }, []);

  return (
    <div>
      <button className="bg-cyan-300" onClick={handleConnect}>
        Connect Discord
      </button>
      <div>{code}</div>
      <button className="bg-cyan-300" onClick={handleGetAuthToken}>
        Get Auth Token
      </button>
      <div>{accessToken}</div>
      <button className="bg-cyan-300" onClick={handleGetAuthData}>
        Get Auth Data
      </button>
      {user.id && (
        <div>
          <p>Username: {user.username}</p>
          <p>id: {user.id}</p>
          <p>Discriminator: {user.discriminator}</p>
        </div>
      )}
    </div>
  );
};

export default Discord;
