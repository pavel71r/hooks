import React, { useState } from "react";
import "./Filters.css";

type FiltersType = {
  buttonsFilter: (event: string) => void;
};

const Filters = (props: FiltersType) => {
  const [filter, setFilter] = useState({
    all: true,
    active: false,
    completed: false,
  });

  const onFilter = (event: React.BaseSyntheticEvent) => {
    props.buttonsFilter(event.target.innerText);
    if (event.target.innerText === "all") {
      setFilter({ all: true, active: false, completed: false });
    }
    if (event.target.innerText === "active") {
      setFilter({ all: false, active: true, completed: false });
    }
    if (event.target.innerText === "completed") {
      setFilter({ all: false, active: false, completed: true });
    }
  };

  let all = "btn";
  let active = "btn";
  let completed = "btn";
  if (filter.all) {
    all += " color";
  }
  if (filter.active) {
    active += " color";
  }
  if (filter.completed) {
    completed += " color";
  }
  return (
    <div className="Filters">
      <button
        className={all}
        onClick={(event) => {
          onFilter(event);
        }}
      >
        all
      </button>
      <button
        className={active}
        onClick={(event) => {
          onFilter(event);
        }}
      >
        active
      </button>
      <button
        className={completed}
        onClick={(event) => {
          onFilter(event);
        }}
      >
        completed
      </button>
    </div>
  );
};

export default Filters;
