import React, { Component, Fragment } from "react";
import { PropTypes } from "prop-types";
import { fetchPopularRepos } from "../utils/api";
import { FaUser, FaStar, FaCodeBranch, FaExclamationTriangle } from 'react-icons/fa';

function LanguagesNav({ selected, onUpdateLanguage }) {
  const languages = ["All", "Javascript", "Ruby", "Java", "CSS", "Python"];
  return (
    <ul className="flex-center">
      {languages.map((language) => (
        <li key={language}>
          <button
            className="btn-clear nav-link"
            style={language === selected ? { color: "rgb(187, 46, 31)" } : null}
            onClick={() => onUpdateLanguage(language)}
          >
            {language}
          </button>
        </li>
      ))}
    </ul>
  );
}

LanguagesNav.propTypes = {
  selected: PropTypes.string.isRequired,
  onUpdateLanguage: PropTypes.func.isRequired,
};

function ReposGrid({ repos }) {
  return (
    <ul className='grid space-around'>
      {repos.map((repo, index) => {
        const { name, owner, html_url, stargazers_count, forks, open_issues } = repo
        const { login, avatar_url } = owner

        return (
          <li key={html_url} className='repo bg-light'>
            <h4 className="header-lg center-text">
              #{index + 1}
            </h4> 
            <img 
            className='avatar' 
            src={avatar_url} 
            alt={`Avatar for ${login}`} 
            /> 
            <h2 className='center-text'>
              <a className='link' href={html_url}>{login}</a>
            </h2>
            <ul className="card-list">
              <li>
                <FaUser color='rgba(255,191,116)' size={22} />
                <a href={`https://github.com/${login}`}>{login}</a>
              </li>
              <li>
                <FaStar color='rgba(255,215,0)' size={22} />
                {stargazers_count.toLocaleString()}stars
              </li>
              <li>
                <FaCodeBranch color='rgba(255,195,245)' size={22} />
                {forks.toLocaleString()}forks
              </li>
              <li>
                <FaStar color='rgba(241,138,147)' size={22} />
                {open_issues.toLocaleString()} open issues
              </li>
              
            </ul>
          </li>
        )
      })}
      
    </ul>
  )
}
export default class Popular extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedLanguage: "All",
      repos: {},
      error: null,
    };
    this.updateLanguage = this.updateLanguage.bind(this);
    this.isLoading = this.isLoading.bind(this);
  }

  componentDidMount() {
    this.updateLanguage(this.state.selectedLanguage);
  }

  updateLanguage(selectedLanguage) {
    this.setState({
      selectedLanguage,
      error: null,
    });

    // make a fetch request if there is no data
    if (!this.state.repos[selectedLanguage]) { 

      fetchPopularRepos(selectedLanguage)
      .then((data) => {
        this.setState(({ repos }) => ({
          repos: {
            ...repos,
            [selectedLanguage]: data
          }
        }))
      })
        .catch(() => {
          console.warn("Error fetching repos: ", error);
  
          this.setState({
            error: `There was an error fetching the repositories`,
          })
        })
    }
  }

  isLoading() {
    const { selectedLanguage, repos, error } = this.state
    return !repos[selectedLanguage] && error === null
  }
  render() {
    const { selectedLanguage, repos, error } = this.state;

    return (
      <Fragment>
        <LanguagesNav
          selected={selectedLanguage}
          onUpdateLanguage={this.updateLanguage}
        />

        {this.isLoading() && <p>LOADING....</p>}

        {error && <p>{error}</p>}

        {repos[selectedLanguage] && <ReposGrid repos={repos[selectedLanguage]}/> }
      </Fragment>
    );
  }
}
