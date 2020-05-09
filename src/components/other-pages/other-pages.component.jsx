import React from "react";
import { connect } from "react-redux";

import "./other-pages.styles.scss";
import Menu from "../menu/menu.component";
import GameStat from "../game-stat/game-stat.component";
import GameInfo from "../game-info/game-info.component";

const OtherPages = ({ show_stat, show_info }) => (
  <div className="pages">
    {show_stat ? <GameStat /> : show_info ? <GameInfo /> : <Menu />}
  </div>
);

const mapStateToProps = ({ switcher: { show_stat, show_info } }) => ({
  show_stat,
  show_info,
});

export default connect(mapStateToProps)(OtherPages);
