import React, { useState, useEffect, useMemo } from "react";
import INFO from "../../images/info.png";
import PHYS from "../../images/phys.png";
import MATH from "../../images/math.png";
import RADAR from "../../images/astro.png";
import PLANES from "../../images/plane.png";
import plus from "../../images/plus.png";
import moins from "../../images/moins.png";
import Scrollbar from "react-scrollbars-custom";
import Latex from "react-latex";
import MarkdownRender from "../MarkDown/MarkdownRender";
import ReactMarkdown from 'react-markdown';
import gfm from 'remark-gfm';
import MathJax from '@innodoc/react-mathjax-node';
import { deleteArticle } from "../../context/withBack4AppHoc";
/**
 * Stateless component for 
 *
 * @category Article
 * @author Bruno Boissie <bruno.boissie@aviation-civile.gouv.fr>
 * @copyright (c) 2020, DSNA/DTI. All rights reserved.
 *
 * @param {Object}	props		Incoming component properties
 * @return	{Node}		Rendered Component node
 */
const Article = props => {
    const { id, category, contenu, filecontenu } = props;
    const markdown = `A paragraph with *emphasis* and **strong importance**.

> A block quote with ~strikethrough~ and a URL: https://reactjs.org.

* Lists
* [ ] todo
* [x] done

`
    const tex = ` \\frac{arg1}{arg2} 
x ^ 2
e ^ { i\pi }\\
A_i\\
B_{ ij } \\
\\sqrt[n]{ arg }
`;


    const test2 = `# Hello, *world*!  \\frac{arg1}{arg2} 
x ^ 2
e ^ { i\pi }\\
A_i\\
B_{ ij } \\
\\sqrt[n]{ arg }`;


    const getIcon = (category) => {
        //console.log("Category=" + category);
        switch (category) {
            case 'Mathématiques':
                return MATH;
                break;
            case 'Informatique':
                return INFO;
                break;
            case 'Physique':
                return PHYS;
                break;
            default:
                return PLANES;
                break;
        }
    }
    const isScientific =() => category === "Mathématiques" || category === "Physique";

    return (
        <div className="article" id={category} >
            <div className="iconecategory">
                <img src={getIcon(category)} width="20px" height="20px" />
                <img src={plus} width="20px" height="20px" />
                <img src={moins} width="20px" height="20px" onClick={() => deleteArticle(id)} />
            </div>
            <div className="articlecontenu">

                <Scrollbar style={{ height: 100 }}>
                    {isScientific() ?

                      (  <MathJax.Provider>
                            <p>
                                <MathJax.MathJaxNode displayType="inline" texCode={tex} />
                            </p>
                        </MathJax.Provider>
                      )
                    :
                        <ReactMarkdown plugins={[gfm]} children={contenu} />
                    }
                    {/*
                    <ReactMarkdown># Hello, *world*!</ReactMarkdown>
                    */}
                </Scrollbar>


            </div>

        </div>
    );
};

export default Article;
