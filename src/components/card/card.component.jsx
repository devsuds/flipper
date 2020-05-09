import React from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import "./card.styles.scss";
import { cardClick } from "../../redux/card/card.actions";
import { updateClickCount } from "../../redux/game/game.actions";

const CLICK_INTENSITY = 1000;

class Card extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      clicked: false,
    };
  }

  handleClick = () => {
    const { updateClickCount, cardClick } = this.props;
    updateClickCount();
    cardClick({
      card_value: this.props.card_icon,
      card_id: this.props.card_id,
    });
    this.setState({ clicked: true });
    setTimeout(() => {
      if (this.state.clicked) this.setState({ clicked: false });
    }, CLICK_INTENSITY);
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

const mapDispatchToProps = (dispatch) =>
  bindActionCreators({ cardClick, updateClickCount }, dispatch);

const mapStateToProps = ({ card: { match_found, matched_cards } }) => ({
  match_found: match_found,
  matched_cards: matched_cards,
});

export default connect(mapStateToProps, mapDispatchToProps)(Card);
