import React from "react";
import PropTypes from "prop-types";

import "./TableRow.css";
import userleaderBoards from "../../images/userleaderboards.png";
import firstPlace from "../../images/firstPlace.jpg";
import secondPlace from "../../images/secondPlace.png";
import thirdPlace from "../../images/thirdPlace.png";

const TableRow = (props) => {
  const { alltime, img, score, username, rank } = props.rowData;

  return (
    <tr>
      <td>
        {rank ?( rank == 1 ? (
          <img className="camper-image" src={firstPlace} alt="no img" />
        ) : rank == 2 ? (
          <img className="camper-image" src={secondPlace} alt="no img" />
        ) : rank === 3 ? (
          <img className="camper-image" src={thirdPlace} alt="no img" />
        ) : (
          rank
        ) ) : 
        (props.id === 1 ? (
          <img className="camper-image" src={firstPlace} alt="no img" />
        ) : props.id === 2 ? (
          <img className="camper-image" src={secondPlace} alt="no img" />
        ) : props.id === 3 ? (
          <img className="camper-image" src={thirdPlace} alt="no img" />
        ) : (
          props.id
        ))}
      </td>

      <td align="left">
  
          <img
            className="camper-image inline-block"
            src={userleaderBoards}
            alt="no img"
          ></img>
          <span className="camper-name inline-block">{username}</span>
      </td>
      <td>{score}</td>
    </tr>
  );
};

TableRow.propTypes = {
  id: PropTypes.number,
  rowData: PropTypes.object,
};

export default TableRow;
