"use client";

import styles from "./SearchBar.module.scss";

type SearchBarProps = {
  query: string;
  setQuery: (value: string) => void;
  resultCount: number;
  isFetching: boolean;
};

export const SearchBar = ({ query, setQuery, resultCount, isFetching }: SearchBarProps) => {
  const resultsLabel = isFetching
    ? "Searching..."
    : `${resultCount} ${resultCount === 1 ? "RESULT" : "RESULTS"}`;

  return (
    <div className={styles.root}>
      <div className={styles.inputWrap}>
        <input
          type="search"
          className={styles.input}
          placeholder="Search for a smartphone..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          aria-label="Search for a smartphone"
          aria-busy={isFetching}
        />
        {query && (
          <button
            type="button"
            className={styles.clearButton}
            onClick={() => setQuery("")}
            aria-label="Clear search"
          >
            <svg
              className={styles.clearIcon}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              aria-hidden="true"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>
      <p className={styles.count} aria-live="polite">
        {resultsLabel}
      </p>
    </div>
  );
};
