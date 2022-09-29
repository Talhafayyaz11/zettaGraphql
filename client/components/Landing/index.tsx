import React, { useState } from "react";
import { gql, useQuery } from "@apollo/client";
import SEARCH from "../../queries/search.graphql";
import TextField from "../TextField";
import useDebounce from '../../hooks/useDebounce'
import "./style.css"

const Landing = () => {
  const [message, setMessage] = useState("");
  const debouncedMessage = useDebounce(message,100);
  const {
    data: { records: { emoticons = [], mentions = [], links = [] } = {} } = {},
  } = useQuery(gql(SEARCH), {
    variables: { message: debouncedMessage },
  });

  return (
    <div className="container">
      <TextField handleChange={setMessage} />
      <div className="metaContainer">
        <ul>
          <li>
            URLS:
            <ol>
              {links.map(({ url, title }) => (
                <>
                  <li><strong>URL:</strong> {url}</li>
                  <li><strong>Title:</strong> {title}</li>
                </>
              ))}
            </ol>
          </li>
          <li>
            Mentions: <strong>{mentions?.join(',')}</strong>
          </li>
          <li>
            Emoticons: <strong>{emoticons?.join(',')}</strong>
          </li>
        </ul>
      </div>
    </div>
  );
};
export default Landing;
