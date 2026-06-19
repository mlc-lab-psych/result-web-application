import React from "react";
import {Link} from "react-router-dom";
import HomeIcon from "../assets/home.png"
import ExperimentIcon from "../assets/experiment.png"
import DocumentationIcon from "../assets/documentation.png"
import AddIcon from "../assets/add.svg"

export default function NavBar() {
    return(
        <nav>
            <h1>
                MLC Result Web Application
            </h1>
            <div className={"nav-links"}>
                <Link to="/"><img title={"Go to Homepage"} alt={"Home Material UI Icon"} src={HomeIcon}/></Link>
                <Link to="/create-experiment"><img title={"Create a new Experiment"} alt={"Flask Material UI Icon"} src={ExperimentIcon}/></Link>
                <Link to="/add-json-file"> <img title={"Add JSON file"} alt={"Add Material UI Icon"} src={AddIcon}/> </Link>
                <a href={"https://docs.google.com/document/d/1YsZH_eDF6NheO90A4_2RRNJLGkxpZC32DzjqcyOJlxI/edit?usp=sharing"} target={"_blank"}><img title={"Go to Documentation"} alt={"Book Material UI Icon"} src={DocumentationIcon}/></a>
            </div>
        </nav>
    )
}