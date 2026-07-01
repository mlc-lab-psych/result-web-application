import {Redirect, useHistory} from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Icon from "./assets/survey.svg"
import Icon2 from "./assets/data-work.svg"
import Icon3 from "./assets/search-data.svg"
import Icon4 from "./assets/chart-data.svg"
import Arrow from "./assets/arrow.svg"


function App() {
    const navigate = useNavigate();

    function redirects(experiment){
        if(experiment === "2b"){
            navigate("/alive-2b")
        }
        else if(experiment === "3"){
            navigate("/alive-3")
        }
        else if(experiment === "4"){
            navigate("/alive-4")
        }
        else if(experiment === "4b"){
            navigate("/alive-4b")
        }
        else if(experiment === "pilot-1"){
            navigate("/pilot-1")
        }
        else if(experiment === "pilot-1-2"){
            navigate("/pilot-1-session-2")
        }
        else if(experiment === "alive-indiv-diff-1"){
            navigate("/alive-indiv-diff-1")
        }
        else if(experiment === "alive-indiv-diff-2"){
            navigate("/alive-indiv-diff-2")
        }
        else if(experiment === "alignment-voice"){
            navigate("/alignment-voice")
        }
        else if(experiment === "iat-anart"){
            navigate("/iat-anart")
        }
        else if(experiment === "iat-hyuart"){
            navigate("/iat-hyuart")
        }
        else if(experiment === "iat-anpla"){
            navigate("/iat-anpla")
        }
        else if(experiment === "iat-plaart"){
            navigate("/iat-plaart")
        }
        else if(experiment === "iat-natveh"){
            navigate("/iat-natveh")
        }
        else if(experiment === "iat-annat"){
            navigate("/iat-annat")
        }
        else if(experiment === "iat-planat"){
            navigate("/iat-planat")
        }
        else if(experiment === "iat-natart"){
            navigate("/iat-natart")
        }
        else if(experiment === "iat-plaveh"){
            navigate("/iat-plaveh")
        }
        else if(experiment === "iat-animals"){
            navigate("/iat-animals")
        }
        else if(experiment === "iat-humans"){
            navigate("/iat-humans")
        }
        else if(experiment === "categorization-order"){
            navigate("/categorization-order")
        }
        else if(experiment === "categorization-order-reverse"){
            navigate("/categorization-order-reverse")
        }
        else if(experiment === "alive-indiv-rep"){
            navigate("/alive-indiv-rep")
        }
        else if(experiment === "alive-indiv-rep-session-2"){
            navigate("/alive-indiv-rep-session-2")
        }
    }

  return (
      <>
        <main>
          <header>
              <h1>
                  RIT Meaning, Language, and Cognition (MLC) Lab
              </h1>
              <p>
                  The MLC Lab investigates how people conceptualize the world, how we express our thoughts through
                  language, and how the relationship between language and cognition may (or may not) vary depending
                  on each person's linguistic and cultural background. For example, do people think that plants and
                  animals can act intentionally in the same way that humans can, and do thoughts about intention differ
                  depending on one's language? The lab addresses these questions by conducting behavioral experiments
                  with adults across a range of different languages and analyzing the language that people produce in
                  everyday life. The capacity to make meaning is fundamental to human life — in the MLC lab, we seek a
                  deeper understanding of what meanings are shared across all people, and what are constructed based on
                  a person's individual traits and experiences.
              </p>
          </header>
          <section className={"experiments"}>
              <div className={"experiments-section"}>
                  <div className={"experiments-info"}>
                      <h2> Alive Experiment </h2>
                  </div>

                  <div className={"experiments-carousal"}>
                      {/* <div onClick={()=>navigate("/alive-2b")} className={"experiment-blob"}>
                          <img src={Icon} alt={"unDraw illustration"}/>
                          <span>
                              Alive 2b Experiment
                              <img src={Arrow} alt={"Arrow Icon"} className={"arrow"}/>
                          </span>
                      </div>
                      <div onClick={()=>navigate("/alive-3")} className={"experiment-blob"}>
                          <img src={Icon2} alt={"unDraw illustration"}/>
                          <span>
                              Alive 3 Experiment
                              <img src={Arrow} alt={"Arrow Icon"} className={"arrow"}/>
                          </span>
                      </div>
                      <div onClick={()=>redirects("4")} className={"experiment-blob"}>
                          <img src={Icon3} alt={"unDraw illustration"}/>
                          <span>
                              Alive 4 Experiment
                              <img src={Arrow} alt={"Arrow Icon"} className={"arrow"}/>
                          </span>
                      </div>
                      <div onClick={()=>redirects("4b")} className={"experiment-blob"}>
                          <img src={Icon4} alt={"unDraw illustration"}/>
                          <span>
                              Alive 4b Experiment
                              <img src={Arrow} alt={"Arrow Icon"} className={"arrow"}/>
                          </span>
                      </div> */}
                      <div onClick={()=>navigate("/pilot-1")} className={"experiment-blob"}>
                          <img src={Icon} alt={"unDraw illustration"}/>
                          <span>
                              Pilot 1 Session 1
                              <img src={Arrow} alt={"Arrow Icon"} className={"arrow"}/>
                          </span>
                      </div>
                      <div onClick={()=>navigate("/pilot-1-session-2")} className={"experiment-blob"}>
                          <img src={Icon2} alt={"unDraw illustration"}/>
                          <span>
                              Pilot 1 Session 2
                              <img src={Arrow} alt={"Arrow Icon"} className={"arrow"}/>
                          </span>
                      </div>
                      <div onClick={()=>navigate("/alive-indiv-diff-1")} className={"experiment-blob"}>
                          <img src={Icon3} alt={"unDraw illustration"}/>
                          <span>
                              Pilot Indiv Diff Session 1
                              <img src={Arrow} alt={"Arrow Icon"} className={"arrow"}/>
                          </span>
                      </div>
                      <div onClick={()=>navigate("/alive-indiv-diff-2")} className={"experiment-blob"}>
                          <img src={Icon4} alt={"unDraw illustration"}/>
                          <span>
                              Pilot Indiv Diff Session 2
                              <img src={Arrow} alt={"Arrow Icon"} className={"arrow"}/>
                          </span>
                      </div>
                      <div onClick={()=>navigate("/alive-indiv-rep-session-1")} className={"experiment-blob"}>
                          <img src={Icon} alt={"unDraw illustration"}/>
                          <span>
                              Alive Indiv Rep Session 1
                              <img src={Arrow} alt={"Arrow Icon"} className={"arrow"}/>
                          </span>
                      </div>
                      <div onClick={()=>navigate("/alive-indiv-rep-session-2")} className={"experiment-blob"}>
                          <img src={Icon2} alt={"unDraw illustration"}/>
                          <span>
                              Alive Indiv Rep Session 2
                              <img src={Arrow} alt={"Arrow Icon"} className={"arrow"}/>
                          </span>
                      </div>
                  </div>
              </div>
              <div className={"experiments-section"}>
                  <div className={"experiments-info"}>
                      <h2> Implication Association Test (IAT) Experiment</h2>
                      {/*<p>*/}
                      {/*    In this study participants will complete an Implicit Association Test (IAT) in which they will be asked*/}
                      {/*    to sort words and pictures into groups as fast as they can. They will sort words into categories that don’t*/}
                      {/*    have names in English - we will just call them ‘Category 1 Words’ and ‘Category 2 Words’.*/}
                      {/*</p>*/}
                  </div>
                  <div className={"experiments-carousal"}>
                      <div onClick={()=>navigate("/iat-anart")} className={"experiment-blob"}>
                          <img src={Icon3} alt={"unDraw illustration"}/>
                          <span>
                              IAT Animal Artifact Experiment
                              <img src={Arrow} alt={"Arrow Icon"} className={"arrow"}/>
                          </span>
                      </div>
                      <div onClick={()=>navigate("/iat-hyuart")} className={"experiment-blob"}>
                          <img src={Icon4} alt={"unDraw illustration"}/>
                          <span>
                              IAT Human Artifact Experiment
                              <img src={Arrow} alt={"Arrow Icon"} className={"arrow"}/>
                          </span>
                      </div>
                      <div onClick={()=>navigate("/iat-anpla")} className={"experiment-blob"}>
                          <img src={Icon} alt={"unDraw illustration"}/>
                          <span>
                              IAT Animal Plant Experiment
                              <img src={Arrow} alt={"Arrow Icon"} className={"arrow"}/>
                          </span>
                      </div>
                      <div onClick={()=>navigate("/iat-plaart")} className={"experiment-blob"}>
                          <img src={Icon2} alt={"unDraw illustration"}/>
                          <span>
                              IAT Plant Artifact Experiment
                              <img src={Arrow} alt={"Arrow Icon"} className={"arrow"}/>
                          </span>
                      </div>
                      <div onClick={()=>navigate("/iat-natveh")} className={"experiment-blob"}>
                          <img src={Icon3} alt={"unDraw illustration"}/>
                          <span>
                              IAT Nature Vehicle Experiment
                              <img src={Arrow} alt={"Arrow Icon"} className={"arrow"}/>
                          </span>
                      </div>
                      <div onClick={()=>navigate("/iat-annat")} className={"experiment-blob"}>
                          <img src={Icon4} alt={"unDraw illustration"}/>
                          <span>
                              IAT Animal Nature Experiment
                              <img src={Arrow} alt={"Arrow Icon"} className={"arrow"}/>
                          </span>
                      </div>
                      <div onClick={()=>navigate("/iat-natart")} className={"experiment-blob"}>
                          <img src={Icon} alt={"unDraw illustration"}/>
                          <span>
                              IAT Nature Artifact Experiment
                              <img src={Arrow} alt={"Arrow Icon"} className={"arrow"}/>
                          </span>
                      </div>
                      <div onClick={()=>navigate("/iat-planat")} className={"experiment-blob"}>
                          <img src={Icon2} alt={"unDraw illustration"}/>
                          <span>
                              IAT Plant Nature Experiment
                              <img src={Arrow} alt={"Arrow Icon"} className={"arrow"}/>
                          </span>
                      </div>
                      <div onClick={()=>navigate("/iat-plaveh")} className={"experiment-blob"}>
                          <img src={Icon3} alt={"unDraw illustration"}/>
                          <span>
                              IAT Plant Vehicle Experiment
                              <img src={Arrow} alt={"Arrow Icon"} className={"arrow"}/>
                          </span>
                      </div>
                      <div onClick={()=>navigate("/iat-animals")} className={"experiment-blob"}>
                          <img src={Icon4} alt={"unDraw illustration"}/>
                          <span>
                              IAT Animals Experiment
                              <img src={Arrow} alt={"Arrow Icon"} className={"arrow"}/>
                          </span>
                      </div>
                      <div onClick={()=>navigate("/iat-humans")} className={"experiment-blob"}>
                          <img src={Icon} alt={"unDraw illustration"}/>
                          <span>
                              IAT Humans Experiment
                              <img src={Arrow} alt={"Arrow Icon"} className={"arrow"}/>
                          </span>
                      </div>
                        <div onClick={()=>navigate("/mlc-1048-animals")} className={"experiment-blob"}>
                          <img src={Icon2} alt={"unDraw illustration"}/>
                          <span>
                              MLC-1048 Word Animals
                              <img src={Arrow} alt={"Arrow Icon"} className={"arrow"}/>
                          </span>
                      </div>
                  </div>
              </div>
              <div className={"experiments-section"}>
                  <div className={"experiments-info"}>
                      <h2> Categorization Order Experiment</h2>
                      {/*<p>*/}
                      {/*    In this study, participants will be tasked with listening to a series of quick audio clips, repeating*/}
                      {/*    after them, and answering questions related to them and the clips they repeat after.*/}
                      {/*</p>*/}
                  </div>
                  <div className={"experiments-carousal"}>
                      <div onClick={()=>redirects("categorization-order")} className={"experiment-blob"}>
                          <img src={Icon} alt={"unDraw illustration"}/>
                          <span>
                              Categorization Order
                              <img src={Arrow} alt={"Arrow Icon"} className={"arrow"}/>
                          </span>
                      </div>
                      <div onClick={()=>redirects("categorization-order-reverse")} className={"experiment-blob"}>
                          <img src={Icon2} alt={"unDraw illustration"}/>
                          <span>
                              Categorization Order Reverse
                              <img src={Arrow} alt={"Arrow Icon"} className={"arrow"}/>
                          </span>
                      </div>
                      <div className={"experiment-blob"} style={{opacity:"0", cursor:"unset"}}>
                          Categorization Order
                      </div>
                  </div>
              </div>
              <div className={"experiments-section"}>
                  <div className={"experiments-info"}>
                      <h2> Alignment Voice Experiment</h2>
                      {/*<p>*/}
                      {/*    In this study, participants will be tasked with listening to a series of quick audio clips, repeating*/}
                      {/*    after them, and answering questions related to them and the clips they repeat after.*/}
                      {/*</p>*/}
                  </div>
                  <div className={"experiments-carousal"}>
                      <div onClick={()=>redirects("alignment-voice")} className={"experiment-blob"}>
                          <img src={Icon4} alt={"unDraw illustration"}/>
                          <span>
                              Alignment Voice
                              <img src={Arrow} alt={"Arrow Icon"} className={"arrow"}/>
                          </span>
                      </div>
                      <div className={"experiment-blob"} style={{opacity:"0", cursor:"unset"}}>
                        Alignment Voice
                      </div>
                      <div className={"experiment-blob"} style={{opacity:"0", cursor:"unset"}}>
                        Alignment Voice
                      </div>
                  </div>
              </div>
          </section>
      </main>
      </>
  )
}

export default App;
