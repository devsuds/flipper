import React from "react";
import { connect } from "react-redux";

import "./main.styles.scss";
import PlayGround from "../playground/playground.component";
import OtherPages from "../other-pages/other-pages.component";
import GameTimer from "../game-timer/game-timer.component";

class Main extends React.Component {
  render() {
    const { start_game } = this.props;
    return (
      <div className="main-container">
        <div className="header">
          <div className="header-items logo-container">
            <span className="flip-letter">F</span>
            <span className="rest-of-letters">lipper</span>
          </div>
          <div className="header-items realtime-game-info">
            {start_game ? <GameTimer /> : ""}
          </div>
          <div className="header-items links"></div>
        </div>
        <div className="game-area">
          {start_game ? <PlayGround /> : <OtherPages />}
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ game: { start_game } }) => ({
  start_game: start_game,
});

export default connect(mapStateToProps)(Main);
