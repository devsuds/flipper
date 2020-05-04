import React from "react";
import { connect } from "react-redux";

import "./game-timer.styles.scss";
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

  componentDidMount = () => {
    if (!this.state.time_remaining) {
      this.setState({ time_remaining: this.props.duration });
    }
    this.timerId = setInterval(() => {
      this.setState({
        time_remaining: this.state.time_remaining - 1,
      });
    }, ONE_SECOND);
  };

  componentWillUnmount = () => {
    clearInterval(this.timerId);
  };

  render() {
    return (
      <div
        className={`${
          this.state.time_remaining < GAME_END_SOON ? "end-soon " : ""
        }timer`}
      >
        {this.state.time_remaining}
      </div>
    );
  }
}

const mapStateToProps = ({
  game: {
    game_conf: { duration },
    time_remaining,
    start_game,
  },
}) => ({
  duration: duration / ONE_SECOND,
  game_end: !start_game,
});

export default connect(mapStateToProps)(GameTimer);
