import React from "react";
import { connect } from "react-redux";

import "./game-info.styles.scss";
import { showInfo } from "../../redux/switcher/switcher.actions";

class GameStatistics extends React.Component {
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

  componentDidMount = () => {
    this.setState({ start_animation: true });
  };

  render() {
    const { showInfo } = this.props;
    return (
      <div className="statistics-container">
        <div className="statistics">
          <div className="face current-statistics">
            <span
              role="img"
              aria-label="home"
              className="home-button"
              onClick={() => showInfo(false)}
            >
              🏠
            </span>
            <div className="section-title">Rules</div>
            <div className="game-details custom-scroll">
              <p>Flipper is a timed card memory game.</p>
              <p>
                Click to see what symbol they uncover and try to find the
                matching symbol underneath the other cards.
              </p>
              <p>
                Uncover two matching Symbol/Item at once to score. Your goal is
                to uncover all within time limit.
              </p>
              <p>
                Players get bonus points if you uncover all before time runs
                out. Extra bonus points if you uncover all with minimum
                clicking.
              </p>
              <p></p>
              <p>Have fun with Flipper!</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  showInfo: (payload) => dispatch(showInfo(payload)),
});

export default connect(null, mapDispatchToProps)(GameStatistics);
