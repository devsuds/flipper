import React from "react";
import { connect } from "react-redux";

import "./menu.styles.scss";
import { prepareNewGame } from "../../redux/game/game.actions";
import { startOver } from "../../redux/card/card.actions";
import { showStat, showInfo } from "../../redux/switcher/switcher.actions";
import { bindActionCreators } from "redux";

class Menu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      clicked: false,
    };
  }

  handleClick = () => {
    //toggle
    this.setState({ clicked: !this.state.clicked });
  };

  onSelectGameMode = (event) => {
    const { startOver, prepareNewGame } = this.props;
    prepareNewGame(event.currentTarget.innerHTML.toLowerCase());
    startOver();
  };

  render() {
    const { game_score, game_result, showStat, showInfo } = this.props;
    return (
      <div className="menu-container">
        <div className={`${this.state.clicked ? "clicked-play " : ""}menu`}>
          <div className="menu-face front">
            <span className="info-button">&#9432;</span>
            <span role="img" className="reaction-emoticon">
              {game_result === 1 ? "😍🎉🥳🍻" : "😢"}
            </span>
            <span className="game-score">
              {game_score ? `Score : ${game_score}` : "Click to begin"}
              <span
                role="img"
                className="game-stat-button"
                onClick={() => showStat(true)}
              >
                {" "}
                📊
              </span>
            </span>
            <span className="play-retry" onClick={this.handleClick}>
              {`${
                game_score
                  ? String.fromCharCode("8635")
                  : String.fromCharCode("9654")
              }`}
            </span>
          </div>
          <div className="menu-face back">
            <span className="go-back" onClick={this.handleClick}>
              &#11013;
            </span>
            {["Easy", "Medium", "Hard"].map((mode, index) => (
              <span
                key={index}
                className="modes"
                onClick={this.onSelectGameMode}
              >
                {mode}
              </span>
            ))}
          </div>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    { prepareNewGame, startOver, showStat, showInfo },
    dispatch
  );

const mapStateToProps = ({ game: { game_score, game_result } }) => ({
  game_score,
  game_result,
});

export default connect(mapStateToProps, mapDispatchToProps)(Menu);
