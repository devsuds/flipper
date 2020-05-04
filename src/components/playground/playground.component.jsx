import React from "react";
import { connect } from "react-redux";

import "./playground.styles.scss";
import Card from "../card/card.component";
import { endGame } from "../../redux/game/game.actions";

class PlayGround extends React.Component {
  timeOutId;
  componentDidMount = () => {
    const { endGame, duration, matched_cards } = this.props;
    this.timeOutId = setTimeout(() => {
      const current_score = matched_cards.length;
      endGame(current_score);
    }, duration);
  };

  componentWillUnmount = () => {
    clearTimeout(this.timeOutId);
  };

  render() {
    return (
      <div className="playground-container">
        <div className="playground">
          {this.props.card_icons.map((icon, index) => (
            <Card key={index} card_id={index} card_icon={icon} />
          ))}
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({
  game: {
    card_icons,
    game_conf: { duration },
  },
  card: { matched_cards },
}) => ({
  card_icons: card_icons,
  duration: duration,
  matched_cards: matched_cards,
});

const mapDispatchToProps = (dispatch) => ({
  endGame: (score) => dispatch(endGame(score)),
});

export default connect(mapStateToProps, mapDispatchToProps)(PlayGround);
