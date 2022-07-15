import React, { useEffect, useState, useMemo } from "react";
import axios from "axios";
import styles from "./styles.module.css";

export default function Github() {
  const [user, setUser] = useState([]);
  const [repos, setRepos] = useState([]);
  const [search, setSearch] = useState("");
  const [terms, setTerms] = useState("");
  const [errorMsg, setErrorMsg] = useState("Não foi possível encontrar");

  useEffect(() => {
    // simular um debounce
    const handler = setTimeout(() => setTerms(search), 300);
    return () => clearTimeout(handler);
  }, [search]);

  useEffect(() => {
    const params = !terms
      ? { q: "user:dandankara" }
      : { q: `user:dandankara ${terms} in:name` };
    axios
      .get(`https://api.github.com/search/repositories`, {
        params,
      })
      .then(({ data: { items }, ...rest }) => {
        setRepos(items);
      })
      .catch((err) => {
        setErrorMsg();
        console.log("Info erro repo", { err });
      });

    axios
      .get("https://api.github.com/users/dandankara")
      .then(({ data }) => {
        setUser(data);
      })
      .catch((err) => {
        console.log("Info erro login", { err });
      });
  }, [terms]);

  const ListRepo = repos;

  const sortedListRepo = () => {
    return [...repos].sort((a, b) => a.name.localeCompare(b.name));
  };

  const onSearchChangeValue = (ev) => {
    const { value } = ev.target;
    setSearch(value);
  };
  return (
    <div className={styles.container}>
      <div className={styles.infos}>
        <button
          className={styles.buttonOrdenation}
          onClick={() => {
            setRepos(sortedListRepo());
          }}
        >
          <span>Ordenar de A-Z</span>
        </button>
        <button
          className={styles.buttonOrdenation}
          onClick={() => {
            setRepos(sortedListRepo().reverse());
          }}
        >
          <span>Ordenar de Z-A</span>
        </button>
        <input
          className={styles.inputSearch}
          type="search"
          placeholder="Buscar"
          value={search}
          onChange={onSearchChangeValue}
        />
      </div>
      <div className={styles.listProjects}>
        {repos.map((item) => (
          <div className={styles.cardProjects} key={item.id}>
            <a className={styles.linkCard} href={item.html_url} key={item.id}>
              <p className={styles.nameRepo}>{item.name}</p>
              <p className={styles.languageRepo}>{item.language}</p>
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}
