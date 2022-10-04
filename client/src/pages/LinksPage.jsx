import React, { useCallback, useState, useContext, useEffect } from "react";
import { Loader } from "../components/Loader";

import { AuthContext } from "../context/AuthContext";
import { useHttp } from "../hooks/http.hook";
import { LinksList } from "../components/LinksList";

export const LinksPage = () => {
  const [links, setLinks] = useState([]);
  const { loading, request } = useHttp();
  const { token } = useContext(AuthContext);

  const fetchLinks = useCallback(async () => {
    try {
      const fetched = await request("/api/link", "GET", null, {
        Authorization: `Bearer ${token}`,
      });
      setLinks(fetched);
    } catch (e) {}
  }, [token, request]);

  const deleteHandler = async (id) => {
    try {
      await request(
        "/api/link/delete",
        "POST",
        { id },
        {
          Authorization: `Bearer ${token}`,
        }
      );
      fetchLinks();
    } catch (e) {}
  };

  useEffect(() => {
    fetchLinks();
  }, [fetchLinks]);

  if (loading) {
    return <Loader />;
  }

  if (!links.length) {
    return <p className="center">There are no links yet...</p>;
  }

  return (
    <>
      {!loading && (
        <table>
          <thead>
            <tr>
              <th>#</th>
              <th>Original Link</th>
              <th>Shortened Link</th>
              <th>Open link</th>
            </tr>
          </thead>
          <tbody>
            <LinksList links={links} deleteHandler={deleteHandler} />
          </tbody>
        </table>
      )}
    </>
  );
};
