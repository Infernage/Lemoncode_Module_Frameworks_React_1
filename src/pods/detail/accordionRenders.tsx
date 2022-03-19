import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
} from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import React from "react";

const styles = {
  display: "block",
};

export const renderSimpleProperty = (entry: unknown): JSX.Element => (
  <Typography>{entry ?? ""}</Typography>
);

export const renderObjectProperty = (
  entry: object
): Array<JSX.Element> | null => {
  if (typeof entry === "object" && entry !== null) {
    return Object.entries(entry).map(renderProperty);
  }

  return null;
};

export const renderArrayProperty = (
  array: Array<unknown>
): Array<JSX.Element> | null => {
  if (Array.isArray(array)) {
    return array.map((element, index) =>
      renderProperty([(index + 1).toString(), element])
    );
  }

  return null;
};

export const renderProperty = (property: [string, unknown]): JSX.Element => (
  <Accordion
    key={property[0]}
    disabled={property[1] === null || property[1] === ""}
  >
    <AccordionSummary expandIcon={<ExpandMoreIcon />} id={property[0]}>
      <Typography variant="h6">{property[0]}</Typography>
    </AccordionSummary>
    <AccordionDetails style={styles}>
      {property &&
        (renderArrayProperty(property[1] as Array<unknown>) ??
          renderObjectProperty(property[1] as object) ??
          renderSimpleProperty(property[1]))}
    </AccordionDetails>
  </Accordion>
);
