import {
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
} from "@material-ui/core";
import * as Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import HighchartsMore from "highcharts/highcharts-more";
import _ from "lodash";
import * as React from "react";
import { JSONToCSVConvertor } from "./BulkRNA/util";

HighchartsMore(Highcharts);
const pcaOptions: any = {
  chart: {
    type: "scatter",
    zoomType: "xy",
  },
  title: {
    text: "PCA Plot",
  },
  legend: {
    enabled: false,
  },
  xAxis: {
    title: {
      enabled: true,
      text: "Principal 1",
    },
    startOnTick: true,
    endOnTick: true,
    showLastLabel: true,
  },

  yAxis: {
    title: {
      text: "Principal 2",
    },
  },
  plotOptions: {
    scatter: {
      marker: {
        radius: 5,
        states: {
          hover: {
            enabled: true,
            lineColor: "rgb(100,100,100)",
          },
        },
      },
      states: {
        hover: {
          marker: {
            enabled: false,
          },
        },
      },
    },
  },
  series: [],
};

export const PCAPlotComponent = (props: any) => {
  const download = (type: any) => {
    const data = props.chartData;
    JSONToCSVConvertor(
      Object.keys(data).map((d) => {
        return data[d];
      }),
      "PCA",
      true
    );
  };
  if (props.chartData) {
    const result: any = [];
    Object.values(props.chartData?.Samples).forEach((SM: any, index: any) => {
      result.push([
        props.chartData["principal component 1"][index],
        props.chartData["principal component 2"][index],
      ]);
    });
    pcaOptions.series = [
      {
        data: result,
      },
    ];
    pcaOptions.tooltip = {
      formatter: function () {
        const { x, y, point } = this;
        const tool =
          "<b>Sample" +
          point.index +
          "</b><br/>" +
          "<b>X: </b>" +
          x +
          " <br/><b>Y: </b>" +
          y;
        return tool;
      },
    };
    return (
      <Grid container style={{ marginBottom: "20px" }}>
        <Grid item xs={12} style={{ textAlign: "right" }}>
          <Button
            variant="contained"
            color="primary"
            size="small"
            className="ml-2"
            onClick={() => {
              download("CELL");
            }}
          >
            Download PCA Data
          </Button>
        </Grid>
        <Grid item xs={12}>
          <HighchartsReact
            highcharts={Highcharts}
            options={pcaOptions}
            updateArgs={[true, true, true]}
          />
        </Grid>
      </Grid>
    );
  } else {
    return <div></div>;
  }
};

const topPredictedDrugsBar: any = {
  chart: {
    type: "column",
  },
  title: {
    text: "Top Predicted Results",
  },
  xAxis: { tickInterval: 100 },
  credits: {
    enabled: false,
  },
  tooltip: {},
  series: [],
};

export const TopPredictedDrugsBarPlotComponent = (props: any) => {
  const [selectedSample, setSelectedSample] = React.useState("");
  const topPredictedDrugsBarOptions: any = { ...topPredictedDrugsBar };
  const download = (type: any) => {
    const data = props.chartData;
    JSONToCSVConvertor(
      Object.keys(data).map((d) => {
        return data[d];
      }),
      "PCA",
      true
    );
  };
  if (props.chartData) {
    const chartData = _.cloneDeep(props.chartData);
    const categories: any = [];
    const series: any = [];

    Object.values(chartData.Sample).forEach((SM: any, index: any) => {
      if (chartData.Sample[index] === selectedSample) {
        series.push({
          name: chartData.Drug[index],
          data: [
            {
              y: chartData?.AVG[index],
              extraData: {
                CI: chartData.CI[index],
                MIN: chartData.MIN[index],
                AVG: chartData.AVG[index],
                MAX: chartData.MAX[index],
              },
            },
          ],
        });
        categories.push(chartData.Drug[index]);
      }
    });
    topPredictedDrugsBarOptions.series = series;
    topPredictedDrugsBarOptions.xAxis.categories = categories;
    topPredictedDrugsBarOptions.tooltip = {
      formatter: function () {
        const { point } = this;
        const tool =
          "<b>MIN : </b>" +
          point.extraData.CI +
          "<br/>" +
          "<b>AVG : </b>" +
          point.extraData.AVG +
          "<br/>" +
          "<b>MAX : </b>" +
          point.extraData.MAX +
          "<br/>" +
          "<b>CI : </b>" +
          point.extraData.CI +
          "<br/>";
        return tool;
      },
    };
    const samples = _.uniq(Object.values(props.chartData.Sample));
    return (
      <Grid
        container
        className="top-predicted"
        style={{ marginTop: "20px" }}
        alignItems="center"
      >
        <Grid item xs={6} style={{ marginBottom: "15px" }}>
          <FormControl fullWidth size="small">
            <InputLabel id="demo-simple-select-label">
              Please select a Sample to display Top Predicted Results
            </InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              fullWidth
              label="Please select a Sample to display Top Predicted Results"
              value={selectedSample}
              onChange={(event: any, data: any) => {
                setSelectedSample(data?.props?.children);
              }}
            >
              {samples.map((k: any, index: any) => {
                return <MenuItem value={k}>{k}</MenuItem>;
              })}
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={6} style={{ marginBottom: "15px", textAlign: "right" }}>
          <Button
            variant="contained"
            color="primary"
            size="small"
            className="ml-2"
            onClick={() => {
              download("Top Predicted Results");
            }}
          >
            Download Top Predicted Results
          </Button>
        </Grid>
        <Grid item xs={12}>
          <HighchartsReact
            highcharts={Highcharts}
            options={topPredictedDrugsBarOptions}
            updateArgs={[true, true, true]}
          />
        </Grid>
      </Grid>
    );
  } else {
    return <div></div>;
  }
};
