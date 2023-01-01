import logo from "./logo.png";
import Spinner from "./Components/Spinner/index";

import leaderboardBg from "./images/leaderboardBackground.jpg";
import Table from "./Components/Table/Table";
import firstPlace from "./images/firstPlace.jpg";
import { db } from "./firebase";
import { collection, getDoc, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";


function App() {
  const [players, setPlayers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // This creates reference to firebase firestores collection of player documents
    //  console.log(gapi.client)
    let params = new URLSearchParams(document.location.search);

    const id = params.get("gameId")

      setTimeout(() => {
        getValues(
          window.client,
          "1gowLOYDNh91TJdiw99aFbsAmtHZuoQBH-mJtnPjanJ8",
          "Sheet1",
          null
        );
        setLoading(false)
        
      }, 1000);
  }, []);

  function getValues(client, spreadsheetId, range, callback) {
    try {
      console.log(client);
      client.sheets.spreadsheets.values
        .get({
          spreadsheetId: spreadsheetId,
          range: range,
        })
        .then((response) => {
          const result = response.result.values;
          console.log(result);

          // organize player leaderboards
          result.shift()

          setPlayers(
            result
              .map((player) => {
                return {
                  username: player[0],
                  score: player[2],
                };
              })
              .sort((playerA, playerB) => playerB.score - playerA.score)
          );

          const numRows = result.values ? result.values.length : 0;
          console.log(`${numRows} rows retrieved.`);
          if (callback) callback(response);
        });
    } catch (err) {
      console.log(err.message);
      return;
    }
  }
  return (
    loading ? <Spinner/> : <div
      className="App h-screen"
      style={{
        backgroundImage: `url(${leaderboardBg})`,
        backgroundPositionY: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="relative top-12">
        <div className="grid place-items-center lg:top-4">
          <header className="App-header rounded-lg border-2 lg:border-4 w-3/4 lg:w-1/2 bg-wiply-theme mx-8 h-16 lg:h-32 flex justify-center">
            <img src={logo} className="w-1/4 lg:w-1/6" alt="logo" />
          </header>
        </div>
        <div className="grid place-items-center ">
          <div className=" w-3/4 lg:w-1/2 h-16 relative">
            <div className="main-header rounded-lg border-2 bg-wiply-theme inset-x-0 bottom-0 absolute lg:h-12">
              Leaderboard
            </div>
          </div>
          <div className=" w-3/4 lg:w-1/2">
            <Table players={players} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
