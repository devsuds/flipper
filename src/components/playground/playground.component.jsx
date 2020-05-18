import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import "./playground.styles.scss";
import Card from "../card/card.component";
import { endGame, updateFinalScore } from "../../redux/game/game.actions";
import { updateGameHistory } from "../../redux/session-history/session-history.actions";
import { selectCardIcons } from "../../redux/game/game.selectors";
const ONE_SECOND = 1000;

class PlayGround extends React.Component {
  updateHistory = () => {
    const {
      game_duration,
      matched_cards,
      card_icons,
      game_final_score,
      click_count,
      time_saved,
      game_mode,
      updateGameHistory,
    } = this.props;

    updateGameHistory({
      game_mode: game_mode,
      game_duration: game_duration,
      result: parseInt(matched_cards.length / (card_icons.length / 2)),
      n_clicks: click_count,
      final_score: game_final_score,
      time_saved: time_saved,
    });
  };

  componentDidUpdate = () => {
    const {
      matched_cards,
      card_icons,
      updateFinalScore,
      endGame,
      time_up,
    } = this.props;
    // End game when all cards matched
    if (time_up || matched_cards.length === card_icons.length / 2) {
      updateFinalScore({
        game_result: parseInt(matched_cards.length / (card_icons.length / 2)),
        no_of_matched_cards: matched_cards.length,
      });
      setTimeout(() => {
        endGame();
      }, ONE_SECOND);
    }
  };

  componentWillUnmount = () => {
    this.updateHistory();
  };

  render() {
    const { card_icons } = this.props;
    return (
      <div className="playground">
        {card_icons.map((icon, index) => (
          <Card key={index} card_id={index} card_icon={icon} />
        ))}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const {
    card: { matched_cards, match_found },
    game: {
      game_mode,
      click_count,
      game_score,
      time_saved,
      time_up,
      game_conf: { duration },
    },
  } = state;

  return {
    game_mode: game_mode,
    match_found: match_found,
    matched_cards: matched_cards,
    card_icons: selectCardIcons(state),
    game_duration: duration,
    click_count: click_count,
    game_final_score: game_score,
    time_saved: time_saved,
    time_up: time_up,
  };
};
// updateFinalScore, endGame;
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    { updateFinalScore, endGame, updateGameHistory },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(PlayGround);
