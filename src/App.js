import logo from "./logo.png";

import leaderboardBg from "./images/leaderboardBackground.jpg";
import Table from "./Components/Table/Table";
import firstPlace from "./images/firstPlace.jpg";
import { db } from "./firebase";
import { collection, getDoc, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
// https://res.cloudinary.com/shulgirit/image/upload/v1641896455/wiply/Platform%20Default%20Images/background.jpg

function App() {
  const [players, setPlayers] = useState([]);
  useEffect(() => {
    // This creates reference to firebase firestores collection of player documents
    const getPlayers = async () => {
      let params = new URLSearchParams(document.location.search);

      const collectionRef = collection(
        db,
        "games",
        params.get("gameId"),
        "players"
      );
      // This makes actual query to the firestore database
      const querySnapShot = await getDocs(collectionRef);

      setPlayers(
        querySnapShot.docs
          .map((doc) => {
            const player = doc.data();
            return {
              username: player.name,
              score: player.score,
              email: player.email,
            };
          })
          .filter(
            (player) => player.name != undefined || player.score != undefined
          )
          .sort((playerA, playerB) => playerB.score - playerA.score)
      );
    };
    getPlayers();

    return () => {};
  }, []);
  return (
    <div
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
