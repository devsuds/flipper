import React from "react";
import { connect } from "react-redux";

import "./menu.styles.scss";
import { prepareNewGame } from "../../redux/game/game.actions";
import { startOver } from "../../redux/card/card.actions";

class Menu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      clicked: false,
    };
  }

  handleClick = (event) => {
    event.preventDefault(); // Not required though
    //toggle
    this.setState({ clicked: !this.state.clicked });
  };

  onSelectGameMode = (event) => {
    const { startOver, prepareNewGame } = this.props;
    prepareNewGame(event.currentTarget.innerHTML.toLowerCase());
    startOver();
  };

  render() {
    const { game_score } = this.props;
    return (
      <div className="menu-container">
        <div className={`${this.state.clicked ? "clicked " : ""}menu`}>
          <div className="menu-face front">
            <span className="game-score">
              {game_score ? `Score : ${game_score}` : "Click to begin"}
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

const mapDispatchToProps = (dispatch) => ({
  prepareNewGame: (mode) => dispatch(prepareNewGame(mode)),
  startOver: () => dispatch(startOver()),
});

const mapStateToProps = ({ game: { game_score } }) => ({
  game_score: game_score,
});

export default connect(mapStateToProps, mapDispatchToProps)(Menu);
