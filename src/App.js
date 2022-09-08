import logo from "./logo.png";
import "./App.css";
import leaderboardBg from "./images/leaderboardBackground.jpg";
import Table from "./Components/Table/Table";
import firstPlace from "./images/firstPlace.jpg";
// https://res.cloudinary.com/shulgirit/image/upload/v1641896455/wiply/Platform%20Default%20Images/background.jpg

function App() {
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
        <div className="grid place-items-center top-4">
          <header className="App-header rounded-lg border-4  w-1/2 mx-8 h-32 flex justify-center">
            <img src={logo} className="w-1/6" alt="logo" />
          </header>
        </div>
        <div className="grid place-items-center ">
          <div className="row w-1/2">
            <div className="col-lg-12">
              <div className="main-header rounded-lg border-2">Leaderboard</div>
            </div>
          </div>
          <div className="row w-1/2">
            <div className="overflow-table rounded-lg col-lg-12 overflow-auto h-128">
              <Table />
            </div>
            <footer className="grid place-items-center">
              <div className="App-header box-border w-1/2 bottom-4 border-4  relative rounded-lg flex space-x-8 justify-center ">
                <img src={firstPlace} className="w-1/6" alt="logo" />
                <span className="relative self-center">Top Score: 4000</span>
              </div>
            </footer>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
