import OverviewText from "./overviewComponents/overviewText";
import PercentageBox from "./overviewComponents/percentageBox";
import VolumeChart from "./overviewComponents/volumeChart";

function NewsOverview() {

  return (
    <div className="news-overview">
      <div className="summary">
        <PercentageBox />
        <OverviewText />
      </div>
      <VolumeChart />
    </div>
  );
}

export default NewsOverview;

