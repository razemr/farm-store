import {
  BugReport,
  FilterVintage,
  ReportProblem,
  Nature,
} from "@material-ui/icons";

export default function ProductCategoryIcon(props) {
  const { category } = props;

  switch (category) {
    case "Fertilizer":
      return <FilterVintage />;
    case "Herbicide":
      return <Nature />;
    case "Fungicide":
      return <ReportProblem />;
    case "Pesticide":
      return <BugReport />;
    default:
      return "";
  }
}
