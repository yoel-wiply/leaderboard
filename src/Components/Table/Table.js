import React, { Component } from "react";

import TableRow from "../TableRow/TableRow";
import ToSortHeader from "../ToSortHeader/ToSortHeader";
import "./Table.css";
import firstPlace from "../../images/firstPlace.jpg";

const Table = ({ players }) => {
  const sortByMapping = [
    // {type: 'past30Days', heading: 'Points in past 30 days'},
    { type: "score", heading: "Score" },
  ];

  const data = [
    {
      alltime: 100,
      img: null,
      recent: 30,
      username: "Yoel",
    },
    {
      alltime: 100,
      img: null,
      recent: 30,
      username: "Yoel",
    },
    {
      alltime: 100,
      img: null,
      recent: 30,
      username: "Yoel",
    },
    {
      alltime: 100,
      img: null,
      recent: 30,
      username: "Yoel",
    },
    {
      alltime: 100,
      img: null,
      recent: 30,
      username: "Yoel",
    },
    {
      alltime: 100,
      img: null,
      recent: 30,
      username: "Yoel",
    },
    {
      alltime: 100,
      img: null,
      recent: 30,
      username: "Yoel",
    },
    {
      alltime: 100,
      img: null,
      recent: 30,
      username: "Yoel",
    },
    {
      alltime: 100,
      img: null,
      recent: 30,
      username: "Yoel",
    },
    {
      alltime: 100,
      img: null,
      recent: 30,
      username: "Yoel",
    },
    {
      alltime: 100,
      img: null,
      recent: 30,
      username: "Yoel",
    },
    {
      alltime: 100,
      img: null,
      recent: 30,
      username: "Yoel",
    },
    {
      alltime: 100,
      img: null,
      recent: 30,
      username: "Yoel",
    },
  ];

  const handleSort = (sortType) => {
    if (sortType === "past30Days") {
      this.sortRowsRecentData();
    } else if (sortType === "allTime") {
      this.sortAllTimeData();
    }
  };

  const sortRowsRecentData = () => {
    const { recentData, recentDataDesc } = this.state;

    const sortedRecentData = recentDataDesc
      ? recentData.sort((a, b) => a.recent - b.recent)
      : recentData.sort((a, b) => b.recent - a.recent);
    this.setState({
      defaultData: sortedRecentData,
      recentDataDesc: !this.state.recentDataDesc,
    });
  };

  const sortAllTimeData = () => {
    const { allTimeData, allTimeDataDesc } = this.state;

    const sortedAllTimeData = allTimeDataDesc
      ? allTimeData.sort((a, b) => a.alltime - b.alltime)
      : allTimeData.sort((a, b) => b.alltime - a.alltime);
    this.setState({
      defaultData: sortedAllTimeData,
      allTimeDataDesc: !this.state.allTimeDataDesc,
    });
  };

  return (
    <div className="overflow-table rounded-lg col-lg-12 overflow-auto h-96 lg:h-128">
      <table>
        <tbody>
          <tr>
            <th scope="col">#Rank</th>
            <th scope="col">Username</th>
            {sortByMapping.map((toSortBy, i) => {
              return (
                <ToSortHeader
                  key={i}
                  sortBy={toSortBy.type}
                  heading={toSortBy.heading}
                  onClick={handleSort}
                />
              );
            })}
          </tr>
          {players.map((rowData, i) => {
            return <TableRow key={i} id={i + 1} rowData={rowData} />;
          })}
        </tbody>
      </table>
      <footer className="grid place-items-center">
        <div className="App-header box-border w-1/2 bottom-4 border-4  relative rounded-lg flex space-x-8 justify-center bg-wiply-theme ">
          <img src={firstPlace} className="w-1/6" alt="logo" />
          <span className="relative self-center">
            Top Score: {players && players[0]?.score}
          </span>
        </div>
      </footer>
    </div>
  );
};

export default Table;
