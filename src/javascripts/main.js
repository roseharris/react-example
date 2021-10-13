// Required by Webpack - do not touch
require.context("../", true, /\.(html|json|txt|dat)$/i);
require.context("../images/", true, /\.(gif|jpg|png|svg|eot|ttf|woff|woff2)$/i);
require.context("../stylesheets/", true, /\.(css|scss)$/i);

//TODO - Your ES6 JavaScript code (if any) goes here
import React, { createContext, useContext, useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
  Link,
  useParams
} from "react-router-dom";
import ReactDOM from "react-dom";

export const VocabContext = createContext();

export function App(props) {
  let [vocabs, setVocabs] = useState([
    {
      group: "Pronouns",
      words: [
        ["i", "ich"],
        ["you (informal)", "du"],
        ["you (formal)", "Sie"],
        ["he", "er"],
        ["she", "sie"],
        ["it", "es"],
        ["we", "wir"],
        ["you (plural", "ihr"],
        ["they", "sie"],
      ],
    },
    {
      group: "Numbers",
      words: [
        ["zero", "null"],
        ["one", "eins"],
        ["two", "zwei"],
        ["three", "drei"],
        ["four", "vier"],
        ["five", "fünf"],
        ["six", "sechs"],
        ["seven", "sieben"],
        ["eight", "acht"],
        ["nine", "neun"],
        ["ten", "zehn"],
      ],
    },
  ]);
  let [color, setColor] = useState("steelblue");
  return (
    <VocabContext.Provider value={{ vocabs, setVocabs, color, setColor }}>
      <Router>
        <header style={{ borderBottomColor: color, color: color }}>
          <h1>German Vocabulary Flash Cards</h1>
        </header>
        <Switch>
          <Route exact path="/vocab">
            <Vocab />
          </Route>
          <Route exact path="/vocab/:gid">
            <Group />
          </Route>
          <Route path="/vocab/:gid/word/:wid">
            <Word />
          </Route>
          <Redirect from="" to="/vocab" />
        </Switch>
        <footer style={{ backgroundColor: color }}>
          &copy; 2021 WEB 3430 - All rights reserved
        </footer>
      </Router>
    </VocabContext.Provider>
  );
}

export function Vocab(props) {
  let { vocabs, setVocabs, color, setColor } = useContext(VocabContext)
  useEffect(() => {
    setColor("var(--purple)")
  }, [])
    return (
    <div className="vbox">
      <h1>{vocabs.length} groups</h1>
      <nav>
        <ul>
          {
            vocabs.map((g, ndx) => {
              return <li key={ndx}><Link to={"/vocab/" + ndx}>{g.group}</Link></li>
            })
          }
        </ul>
      </nav>
    </div>
  );
}

export function Group(props) {
  let { vocabs, setVocabs, color, setColor } = useContext(VocabContext)
  let {gid} = useParams()
  useEffect(() => {
    setColor("var(--orange)")
  }, [])  
  return (
    <div className="gbox">
      <h1>{vocabs[+gid].words.length}</h1>
      <nav>
        <ul>
          <li><Link to="/vocab">Main page</Link></li>
          <li><Link to={"/vocab/" + gid + "/word/0"}>Start here</Link></li>
        </ul>
      </nav>
    </div>
  )
}

export function Word(props) {
  let { vocabs, setVocabs, color, setColor } = useContext(VocabContext)
  let {gid, wid} = useParams()
  useEffect(() => {
    setColor("var(--teal)")
  }, [])
    return (
    <div className="wbox">
      <h1>{vocabs[+gid].words[+wid][1]}</h1>
      <h3>{vocabs[+gid].words[+wid][0]}</h3>
      <nav>
        <ul>
          <li><Link to="/vocab">Main page</Link></li>
          {
            (+wid) - 1  >= 0
            ? <li><Link to={"/vocab/" + gid + "/word/" + ((+wid) - 1)}>&lt;&lt; Prev</Link></li>
            : <></>
          }
          {
            (+wid) + 1  < vocabs[+gid].words.length
            ? <li><Link to={"/vocab/" + gid + "/word/" + ((+wid) + 1)}>Next &gt;&gt;</Link></li>
            : <></>
          }
   
        </ul>
      </nav>
    </div>
  )
}
ReactDOM.render(<App />, document.getElementById("main"));
