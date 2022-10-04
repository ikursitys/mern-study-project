import React from "react";
import { Link } from "react-router-dom";
import "./linkslist.css";

export const LinksList = ({ links, deleteHandler }) => {
  return (
    <>
      {links.map((link, index) => {
        return (
          <tr key={link._id}>
            <td>{index + 1}</td>
            <td>{link.from}</td>
            <td>{link.to}</td>
            <td>
              <Link to={`/detail/${link._id}`}>Open Link Page</Link>
            </td>
            <td>
              <button
                className="btn red accent-2"
                onClick={() => deleteHandler(link._id)}
              >
                Delete
              </button>
            </td>
          </tr>
        );
      })}
    </>
  );
};
