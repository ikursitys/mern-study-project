import React from "react";

export const LinkCard = ({ link }) => {
  return (
    <>
      <h2>Ссылка</h2>
      <p>
        Ваша ссылка:&nbsp;
        <a href={link.to} target="__blank" rel="noopener noreferrer">
          {link.to}
        </a>
      </p>
      <p>
        Откуда:&nbsp;
        <a href={link.from} target="__blank" rel="noopener noreferrer">
          {link.from}
        </a>
      </p>
      <p>
        Количество кликов по ссылке: <strong>{link.clicks}</strong>
      </p>
      <p>
        Дата создания:{" "}
        <strong>{new Date(link.date).toLocaleDateString()}</strong>
      </p>
    </>
  );
};
