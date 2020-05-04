import React from "react";
import { connect } from "react-redux";

import "./card.styles.scss";
import { cardClick } from "../../redux/card/card.actions";
import { updateScore, endGame } from "../../redux/game/game.actions";

const CLICK_INTENSITY = 1000;

class Card extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      clicked: false,
    };
  }

  handleClick = (event) => {
    event.preventDefault(); // Not required though
    this.props.cardClick({
      card_value: this.props.card_icon,
      card_id: this.props.card_id,
    });
    this.setState({ clicked: true });
    setTimeout(() => {
      if (this.state.clicked) this.setState({ clicked: false });
    }, CLICK_INTENSITY);
  };

  updateGameScore = () => {
    const { matched_cards, updateScore, card_icons, endGame } = this.props;
    const current_score = matched_cards.length;
    updateScore(current_score);
    // End game when all cards matched
    if (matched_cards.length === card_icons.length / 2) {
      // Do not immediate end the game, because that is not polite.
      setTimeout(() => {
        endGame(current_score);
      }, CLICK_INTENSITY);
    }
  };

  componentDidUpdate = () => {
    this.updateGameScore();
  };

  render() {
    const { match_found, card_icon, matched_cards } = this.props;
    const is_matched_card =
      match_found === card_icon || matched_cards.includes(card_icon);
    return (
      <div
        className="card-container"
        onClick={is_matched_card ? () => {} : this.handleClick}
      >
        <div
          className={`${
            is_matched_card ? "disable " : this.state.clicked ? "clicked " : ""
          }card`}
        >
          <div className="card-face front" />
          <div className="card-face back">
            <span>{String.fromCharCode(card_icon)}</span>
          </div>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  cardClick: (card_icon) => dispatch(cardClick(card_icon)),
  updateScore: (score) => dispatch(updateScore(score)),
  endGame: (score) => dispatch(endGame(score)),
});

const mapStateToProps = ({
  card: { match_found, matched_cards },
  game: { card_icons },
}) => ({
  match_found: match_found,
  matched_cards: matched_cards,
  card_icons: card_icons,
});

export default connect(mapStateToProps, mapDispatchToProps)(Card);
