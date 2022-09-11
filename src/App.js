import logo from "./logo.png";
// import "./App.css";
import leaderboardBg from "./images/leaderboardBackground.jpg";
import Table from "./Components/Table/Table";
import firstPlace from "./images/firstPlace.jpg";
import { db } from "./firebase";
import { collection, getDoc, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
// https://res.cloudinary.com/shulgirit/image/upload/v1641896455/wiply/Platform%20Default%20Images/background.jpg

function App() {
  const [players, setPlayers] = useState([]);
  useEffect(
    () => {
    // This creates reference to firebase firestores collection of player documents
    const getPlayers = async () => {
      let params = new URLSearchParams(document.location.search);

    const collectionRef = collection(db, "games", params.get("gameId"), "players");
    // This makes actual query to the firestore database
    const querySnapShot = await getDocs(collectionRef);

    setPlayers(querySnapShot.docs.map((doc) => {
        const player = doc.data()
        return {
          username: player.name,
          score: player.score,
          email: player.email
        }
      } ).filter(player => player.name != undefined || player.score != undefined).sort((playerA, playerB) => playerB.score - playerA.score))
    }
    getPlayers()

    return () => {

    }
    
  
    
  }
  , []);
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
        <div className="grid place-items-center">
          <header className="App-header rounded-lg border-2 w-3/4 bg-wiply-theme mx-8 h-16 flex justify-center">
            <img src={logo} className="w-1/4" alt="logo" />
          </header>
        </div>
        <div className="grid place-items-center ">
          <div className=" w-3/4 h-16 ">
            <div className="main-header rounded-lg border-2 bg-wiply-theme inset-x-0 bottom-0 ">
              Leaderboard
            </div>
          </div>
          <div className="row w-3/4">
            <div className="overflow-table rounded-lg col-lg-12 overflow-auto h-96">
              <Table players={players}/>
            </div>
            <footer className="grid place-items-center">
              <div className="App-header box-border w-1/2 bottom-4 border-4  relative rounded-lg flex space-x-8 justify-centerb bg-wiply-theme ">
                <img src={firstPlace} className="w-1/6" alt="logo" />
                <span className="relative self-center">Top Score: {players && players[0].score}</span>
              </div>
            </footer>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
