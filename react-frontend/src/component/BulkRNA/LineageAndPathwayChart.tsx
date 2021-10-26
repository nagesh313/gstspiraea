import {
  Button,
  Divider,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
} from "@material-ui/core";
import * as Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import _ from "lodash";
import * as React from "react";
import { JSONToCSVConvertor } from "./util";

export const CellLineageAndPathEnrichment = (props: any) => {
  const [selectedSampleIndex, setSelectedSampleIndex] = React.useState(-1);
  // const [selectedSample, setSelectedSample] = React.useState(-1);
  const cellLineageOptions: any = {
    chart: {
      type: "column",
    },
    title: {
      text: "Cell Lineage",
    },
    xAxis: {},
    credits: {
      enabled: false,
    },
    tooltip: {},
    series: [],
  };
  const pathEnrichmentOptions: any = {
    chart: {
      type: "column",
    },
    title: {
      text: "Path Enrichment",
    },
    xAxis: {},
    credits: {
      enabled: false,
    },
    tooltip: {},
    series: [],
  };
  if (props.cellLineage && props.pathEnrichment) {
    const cellLineage = _.cloneDeep(JSON.parse(props.cellLineage));
    const pathEnrichment = _.cloneDeep(JSON.parse(props.pathEnrichment));
    let cellLineageSeries: any = [];
    let pathEnrichmentSeries: any = [];
    if (selectedSampleIndex > -1) {
      const cellLineageData: any = { ...cellLineage };
      const pathEnrichmentData: any = { ...pathEnrichment };
      delete cellLineageData.Samples;
      delete pathEnrichmentData.Samples;
      Object.keys(cellLineageData).forEach((lineage: any, index: any) => {
        cellLineageSeries.push({
          data: [cellLineageData[lineage][selectedSampleIndex]],
          name: lineage,
          y: cellLineageData[lineage][selectedSampleIndex],
        });
      });
      cellLineageSeries = _.orderBy(cellLineageSeries, ["y"], ["desc"]).slice(
        0,
        5
      );
      cellLineageOptions.series = cellLineageSeries;
      cellLineageOptions.tooltip = {
        formatter: function () {
          return "<b>" + this.y + "</b>";
        },
      };
      Object.keys(pathEnrichmentData).forEach((path: any, index: any) => {
        pathEnrichmentSeries.push({
          data: [pathEnrichmentData[path][selectedSampleIndex]],
          name: path,
          y: pathEnrichmentData[path][selectedSampleIndex],
        });
      });
      pathEnrichmentSeries = _.orderBy(
        pathEnrichmentSeries,
        ["y"],
        ["desc"]
      ).slice(0, 5);
    }
    pathEnrichmentOptions.series = pathEnrichmentSeries;
    pathEnrichmentOptions.tooltip = {
      formatter: function () {
        return "<b>" + this.y + "</b>";
      },
    };
    const download = (type: any) => {
      const data =
        type === "CELL"
          ? JSON.parse(props.cellLineage)
          : JSON.parse(props.pathEnrichment);
      JSONToCSVConvertor(
        Object.keys(data).map((d) => {
          return data[d];
        }),
        "CELL LINEAGE",
        true
      );
    };
    const samples = _.uniq(Object.values(pathEnrichment.Samples));
    return (
      <Grid
        container
        className="lineage-chart"
        spacing={3}
        alignContent="center"
        justify="center"
        alignItems="center"
      >
        <Grid item xs={12}>
          <Divider />
        </Grid>
        <Grid item xs={6} style={{ marginBottom: "15px" }}>
          <FormControl fullWidth size="small">
            <InputLabel id="demo-simple-select-label">
              Please select a Sample to display Cell Lineage and Path Enrichment
            </InputLabel>

            <Select
              labelId="lineage-chart-label"
              id="lineage-chart"
              fullWidth
              label="Please select a Sample to display Cell Lineage and Path Enrichment"
              value={selectedSampleIndex}
              onChange={(event: any, data: any) => {
                // setSelectedSample(data.props.children);
                setSelectedSampleIndex(data?.props?.value);
              }}
            >
              <MenuItem value={-1}></MenuItem>
              {samples.map((k: any, index: any) => {
                return <MenuItem value={index}>{k}</MenuItem>;
              })}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={6} style={{ textAlign: "right" }}>
          <Button
            variant="contained"
            color="primary"
            size="small"
            className="ml-2"
            onClick={() => {
              download("CELL");
            }}
          >
            Download Cell Lineage
          </Button>
          <Button
            style={{ marginLeft: "10px" }}
            variant="contained"
            color="primary"
            size="small"
            onClick={() => {
              download("PATH");
            }}
          >
            Download Path Enrichment
          </Button>
        </Grid>
        <Grid item xs={6}>
          <HighchartsReact
            highcharts={Highcharts}
            options={cellLineageOptions}
            updateArgs={[true, true, true]}
          />
        </Grid>
        <Grid item xs={6}>
          <HighchartsReact
            highcharts={Highcharts}
            options={pathEnrichmentOptions}
            updateArgs={[true, true, true]}
          />
        </Grid>
        <Grid item xs={12}>
          <Divider />
        </Grid>{" "}
      </Grid>
    );
  } else {
    return <div></div>;
  }
};
