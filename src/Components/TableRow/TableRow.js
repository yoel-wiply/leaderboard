import React from "react";
import PropTypes from "prop-types";

import "./TableRow.css";
import userleaderBoards from "../../images/userleaderboards.png";
import firstPlace from "../../images/firstPlace.jpg";
import secondPlace from "../../images/secondPlace.png";
import thirdPlace from "../../images/thirdPlace.png";

const TableRow = (props) => {
  const { alltime, img, recent, username } = props.rowData;
  const fccURL = `http://www.freecodecamp.com/${username}`;

  return (
    <tr>
      <td>
        {props.id == 1 ? (
          <img className="camper-image" src={firstPlace} alt="no img" />
        ) : props.id == 2 ? (
          <img className="camper-image" src={secondPlace} alt="no img" />
        ) : props.id === 3 ? (
          <img className="camper-image" src={thirdPlace} alt="no img" />
        ) : (
          props.id
        )}
      </td>

      <td align="left">
        <a href={fccURL} target="_blank">
          <img
            className="camper-image"
            src={userleaderBoards}
            alt="no img"
          ></img>
          <span className="camper-name">{username}</span>
        </a>
      </td>
      <td>{recent}</td>
      <td>{alltime}</td>
    </tr>
  );
};

TableRow.propTypes = {
  id: PropTypes.number,
  rowData: PropTypes.object,
};

export default TableRow;
