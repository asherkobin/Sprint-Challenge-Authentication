import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import Axios from "axios";

const DadJokesApp = () => {
  const [dadJokes, setDadJokes] = useState();

  useEffect(() => {
    const getDadJokes = async () => {
      try {
        try {
          await Axios.post("http://localhost:3300/api/auth/register", {
            username: "dadJokeGuy",
            password: "hello123"
          });
        }
        catch(e) {
          console.log("User already registered");
        }

        const loginRes = await Axios.post("http://localhost:3300/api/auth/login", {
          username: "dadJokeGuy",
          password: "hello123"
        });

        const authToken = loginRes.data.token;
        
        const jokesRes = await Axios.get("http://localhost:3300/api/jokes", {
            headers: {
              Authorization: authToken
            }
          }
        );

        setDadJokes(jokesRes.data);
      } catch (e) {
        setDadJokes(["Error", e.toString()]);
      }
    };

    getDadJokes();
  }, []);

  return (
    <div>
      <div>Dad Jokes</div>
      <div>
        {dadJokes ? (
          dadJokes.map(j => {
            return (<div key={j.id}>{j.joke}</div>);
          })
        ) : (
          <div>Loading...</div>
        )}
      </div>
    </div>
  );
};

ReactDOM.render(<DadJokesApp />, document.getElementById("reactApp"));
