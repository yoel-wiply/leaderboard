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
  const [fullLeaderboard, setFullLeaderboard] = useState(false);
  const [localPlayers, setLocalPlayers] = useState([]);

  let params = new URLSearchParams(document.location.search);

  const currentPlayer = {
    username: params.get("username") || "test",
    email: params.get('email') || 'test123@gmail.com',
    score: params.get("score") || '4',
  };

  useEffect(() => {
    // This creates reference to firebase firestores collection of player documents
    //  console.log(gapi.client)

    setTimeout(() => {
      getValues(
        window.client,
        "1gowLOYDNh91TJdiw99aFbsAmtHZuoQBH-mJtnPjanJ8",
        "Sheet1",
        null
      );
      setLoading(false);
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
          result.shift();

          let temp = result
            .map((player) => {
              return {
                username: player[0],
                email: player[1],
                score: player[2],
              };
            })
          
          temp.push(currentPlayer)

          temp =  temp.sort((playerA, playerB) => playerB.score - playerA.score);

          console.log(temp)

          const playerRank = (player) => player.email === currentPlayer.email


          const rank = temp.findIndex(playerRank)
          console.log(temp)
          console.log(rank)


          if (temp.length >= 4) {
            // if(currentPlayer === temp[0] || currentPlayer  === temp[1]  || currentPlayer  === temp[1])
            setLocalPlayers([{...temp[0], rank: 1}, {...temp[1], rank: 2}, {...temp[2], rank: 3}, {...currentPlayer, rank}]);
          } else {
            console.log(temp);
            setLocalPlayers(temp);
          }

          setPlayers(temp);


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
    <div
      className="App h-screen"
      style={{
        backgroundImage: `url(${leaderboardBg})`,
        backgroundPositionY: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {loading ? (
        <Spinner />
      ) : (
        <div className="relative top-12">
          <div className="grid place-items-center lg:top-4">
            <header className="App-header rounded-lg border-2 lg:border-4 w-3/4 lg:w-1/2 bg-wiply-theme mx-8 h-16 lg:h-32 flex justify-center">
              <img src={logo} className="w-1/4 lg:w-1/6" alt="logo" />
            </header>
          </div>
          <div className="grid place-items-center ">
            <div className="main-header rounded-lg border-2 bg-wiply-theme text-center relative w-3/4 lg:w-1/2 mt-5 lg:h-12">
              <div className=" inline-block top-2/4 bottom-2/4 absolute">
                Leaderboards!
              </div>
              <div className=" inline-block float-right ">
                {" "}
                <button
                  className="w-16 h-16 "
                  onClick={() => setFullLeaderboard(!fullLeaderboard)}
                >
                  {" "}
                  header
                </button>
              </div>
            </div>
            <div className=" w-3/4 lg:w-1/2">
              <Table players={fullLeaderboard ? players : localPlayers} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
