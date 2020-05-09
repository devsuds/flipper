import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import "./game-timer.styles.scss";
import { updateTimeRemaining, timeUp } from "../../redux/game/game.actions";
const ONE_SECOND = 1000;
const GAME_END_SOON = 10;

class GameTimer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      time_remaining: 0,
    };
  }

  timerId;

  clearTimer = () => {
    clearInterval(this.timerId);
  };

  componentDidMount = () => {
    const { duration } = this.props;
    if (this.state.time_remaining === 0) {
      this.setState({ time_remaining: duration });
    }
    this.timerId = setInterval(() => {
      this.setState({
        time_remaining: this.state.time_remaining - 1,
      });
    }, ONE_SECOND);
  };

  componentDidUpdate() {
    const { time_remaining } = this.state;
    const { timeUp, updateTimeRemaining } = this.props;
    // Update time each second
    updateTimeRemaining(this.state.time_remaining);
    if (time_remaining === 0) {
      this.clearTimer();
      timeUp();
    }
  }

  componentWillUnmount = () => {
    this.clearTimer();
  };

  render() {
    const { time_remaining } = this.state;
    return (
      <div
        className={`${time_remaining < GAME_END_SOON ? "end-soon " : ""}timer`}
      >
        {time_remaining ? time_remaining : "Game Over"}
      </div>
    );
  }
}

const mapStateToProps = ({
  game: {
    game_conf: { duration },
  },
}) => ({
  duration: duration / ONE_SECOND,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators({ updateTimeRemaining, timeUp }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(GameTimer);
