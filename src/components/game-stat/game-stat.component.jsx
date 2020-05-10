import React from "react";
import { connect } from "react-redux";

import "./game-stat.styles.scss";
import { showStat } from "../../redux/switcher/switcher.actions";
import { selectCurrentGameStat } from "../../redux/game/game.selectors";
import {
  selectEasyModeHistory,
  selectMediumModeHistory,
  selectHardModeHistory,
  totalLifeTimeScore,
  totalLifeTimeClicks,
} from "../../redux/session-history/session-history.selector";
import { createStructuredSelector } from "reselect";

class GameStatistics extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      clicked: false,
      start_animation: false,
    };
  }

  handleClick = () => {
    //toggle
    this.setState({ clicked: !this.state.clicked });
  };

  componentDidMount = () => {
    this.setState({ start_animation: true });
  };

  render() {
    const {
      showStat,
      current: {
        base_score,
        total_score,
        time_bonus_desc,
        min_click_bonus_desc,
      },
    } = this.props;
    return (
      <div className="statistics-container">
        <div
          className={`${
            this.state.start_animation ? "appearance " : ""
          }statistics`}
        >
          <div className="face current-statistics">
            <span
              role="img"
              aria-label="home"
              className="home-button"
              onClick={() => showStat(false)}
            >
              🏠
            </span>
            <div className="section-title">Game summary</div>
            <div className="score-details">
              <table>
                <tbody>
                  <tr>
                    <td>Base score</td>
                    <td>{`${base_score.matched_cards} pair${
                      base_score.matched_cards > 1 ? "s" : ""
                    } found.`}</td>
                    <td>{base_score.points}</td>
                  </tr>
                  <tr>
                    <td>Time bonus</td>
                    <td>{`Finished with ${time_bonus_desc.time_saved} second${
                      time_bonus_desc.time_saved > 1 ? "s" : ""
                    } remaining (${time_bonus_desc.time_saved}x${
                      time_bonus_desc.rate
                    })`}</td>
                    <td>{time_bonus_desc.points}</td>
                  </tr>
                  <tr>
                    <td>Few clicks</td>
                    <td>{`Finished with ${min_click_bonus_desc.clicks} clicks`}</td>
                    <td>{min_click_bonus_desc.points}</td>
                  </tr>
                </tbody>
                <tfoot>
                  <tr className="table-head">
                    <th>Total</th>
                    <th></th>
                    <th>{total_score}</th>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>
          <div className="face session-statistics">
            <span className="go-back" onClick={this.handleClick}>
              &#11013;
            </span>
            This is the full summary
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  current: selectCurrentGameStat,
  easy: selectEasyModeHistory,
  medium: selectMediumModeHistory,
  hard: selectHardModeHistory,
  totalLifeTimeClicks: totalLifeTimeClicks,
  totalLifeTimeScore: totalLifeTimeScore,
});

const mapDispatchToProps = (dispatch) => ({
  showStat: (payload) => dispatch(showStat(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(GameStatistics);
