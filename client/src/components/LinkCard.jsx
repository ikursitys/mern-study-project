import React from "react";

export const LinkCard = ({ link }) => {
  return (
    <>
      <h2>Link Page</h2>
      <p>
        Your shortened link:&nbsp;
        <a href={link.to} target="__blank" rel="noopener noreferrer">
          {link.to}
        </a>
      </p>
      <p>
        Original link:&nbsp;
        <a href={link.from} target="__blank" rel="noopener noreferrer">
          {link.from}
        </a>
      </p>
      <p>
        Clicks: <strong>{link.clicks}</strong>
      </p>
      <p>
        Date of creation:{" "}
        <strong>{new Date(link.date).toLocaleDateString()}</strong>
      </p>
    </>
  );
};
