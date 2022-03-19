import { Button, Typography } from "@material-ui/core";
import React, { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { GlobalContext } from "../../global.context";
import { validateResponse } from "../../httpUtils";
import { renderObjectProperty } from "./accordionRenders";

const retrieveDetails = (url: string): Promise<object> =>
  fetch(url)
    .then(validateResponse)
    .then((response) => response.json());

export const DetailPage: React.FC = () => {
  const { id } = useParams();
  const [details, setDetails] = useState<object>();
  const { detailsUrlMapper } = useContext(GlobalContext);

  useEffect(() => {
    if (detailsUrlMapper) {
      retrieveDetails(detailsUrlMapper(id)).then((responseData) =>
        setDetails(responseData)
      );
    }
  }, [detailsUrlMapper, id]);

  return (
    <>
      <Typography variant="h4">Detail page</Typography>
      {renderObjectProperty(details)}
      <Button variant="text">
        <Link to="..">Back to list page</Link>
      </Button>
    </>
  );
};
