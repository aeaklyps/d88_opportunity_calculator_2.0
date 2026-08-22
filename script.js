/* ==========================================
   D88 EVALUATION FRAMEWORK
   WEBSITE + OPPORTUNITY SCORING
========================================== */

const STORAGE_KEY = "d88_businesses";


/* ==========================================
   WEBSITE SCORE CATEGORIES
========================================== */

const WEBSITE_CATEGORIES = [

    {
        id: "performance",
        name: "Performance",
        weight: 15
    },

    {
        id: "mobile",
        name: "Mobile Responsiveness",
        weight: 15
    },

    {
        id: "design",
        name: "Visual Design & Modernity",
        weight: 15
    },

    {
        id: "ux",
        name: "UX / Navigation",
        weight: 15
    },

    {
        id: "cta",
        name: "Calls-to-Action",
        weight: 10
    },

    {
        id: "content",
        name: "Content & Information",
        weight: 10
    },

    {
        id: "accessibility",
        name: "Accessibility",
        weight: 10
    },

    {
        id: "technical",
        name: "Technical / Structural Quality",
        weight: 10
    }

];


/* ==========================================
   OPPORTUNITY SCORE CATEGORIES
========================================== */

const OPPORTUNITY_CATEGORIES = [

    {
        id: "revenuePotential",
        name: "Revenue / Customer Potential",
        weight: 20
    },

    {
        id: "growthPotential",
        name: "Growth Potential",
        weight: 15
    },

    {
        id: "websiteImportance",
        name: "Website Importance to Sales",
        weight: 15
    },

    {
        id: "targetMarket",
        name: "Target Market / Reach",
        weight: 10
    },

    {
        id: "competitiveOpportunity",
        name: "Competitive Opportunity",
        weight: 10
    },

    {
        id: "digitalDependence",
        name: "Digital Dependence",
        weight: 10
    },

    {
        id: "redesignLikelihood",
        name: "Redesign Likelihood",
        weight: 10
    },

    {
        id: "d88Fit",
        name: "D88 Fit / Outreach Potential",
        weight: 10
    }

];


/* ==========================================
   CALCULATE WEIGHTED SCORE
========================================== */

function calculateWeightedScore(
    categories,
    scores
) {

    let total = 0;

    categories.forEach(function(category) {

        const element =
            document.getElementById(category.id);

        let score;

        if (element) {

            score =
                Number(element.value);

        } else {

            score =
                Number(scores[category.id]) || 0;
        }

        total +=
            score *
            (category.weight / 100);

    });

    return Math.round(total * 10) / 10;
}


/* ==========================================
   WEBSITE SCORE
========================================== */

function calculateWebsiteScore() {

    return calculateWeightedScore(
        WEBSITE_CATEGORIES,
        {}
    );
}


/* ==========================================
   OPPORTUNITY SCORE
========================================== */

function calculateOpportunityScore() {

    return calculateWeightedScore(
        OPPORTUNITY_CATEGORIES,
        {}
    );
}


/* ==========================================
   IMPROVEMENT POTENTIAL
========================================== */

function calculateImprovementPotential(
    websiteScore
) {

    return Math.round(
        (100 - websiteScore) * 10
    ) / 10;
}


/* ==========================================
   PRIORITY SCORE
========================================== */

/*
    Improvement Potential = 40%

    Opportunity Score = 60%
*/

function calculatePriorityScore(
    websiteScore,
    opportunityScore
) {

    const improvementPotential =
        calculateImprovementPotential(
            websiteScore
        );

    const priority =
        (
            improvementPotential *
            0.40
        ) +
        (
            opportunityScore *
            0.60
        );

    return Math.round(priority * 10) / 10;
}


/* ==========================================
   PRIORITY LABEL
========================================== */

function getPriorityLabel(score) {

    if (score >= 80) {

        return "HIGH PRIORITY";

    }

    if (score >= 60) {

        return "GOOD PRIORITY";

    }

    if (score >= 40) {

        return "MODERATE PRIORITY";

    }

    return "LOW PRIORITY";
}


/* ==========================================
   WEBSITE LABEL
========================================== */

function getWebsiteLabel(score) {

    if (score >= 80) {

        return "STRONG WEBSITE";

    }

    if (score >= 60) {

        return "DECENT WEBSITE";

    }

    if (score >= 40) {

        return "NEEDS IMPROVEMENT";

    }

    return "POOR / OUTDATED";
}


/* ==========================================
   OPPORTUNITY LABEL
========================================== */

function getOpportunityLabel(score) {

    if (score >= 80) {

        return "EXCELLENT OPPORTUNITY";

    }

    if (score >= 60) {

        return "GOOD OPPORTUNITY";

    }

    if (score >= 40) {

        return "MODERATE OPPORTUNITY";

    }

    return "LOW OPPORTUNITY";
}


/* ==========================================
   UPDATE SLIDER DISPLAY
========================================== */

function updateSliderValue(slider) {

    const output =
        document.getElementById(
            slider.id + "Value"
        );

    if (!output) {

        return;
    }

    output.textContent =
        slider.value + "%";
}


/* ==========================================
   INITIALIZE SLIDERS
========================================== */

function initializeSliders() {

    const sliders =
        document.querySelectorAll(
            ".score-slider"
        );

    sliders.forEach(function(slider) {

        updateSliderValue(
            slider
        );

        slider.addEventListener(
            "input",
            function() {

                updateSliderValue(
                    slider
                );

            }
        );

    });
}


/* ==========================================
   ANALYZE WEBSITE
========================================== */

function analyze() {

    const businessInput =
        document.getElementById(
            "business"
        );

    const websiteInput =
        document.getElementById(
            "website"
        );


    if (!businessInput || !websiteInput) {

        return;
    }


    const businessName =
        businessInput.value.trim();

    let website =
        websiteInput.value.trim();


    if (
        businessName === "" ||
        website === ""
    ) {

        alert(
            "Please enter a business name and website URL."
        );

        return;
    }


    /* ======================================
       NORMALIZE URL
    ====================================== */

    if (
        !website.startsWith("http://") &&
        !website.startsWith("https://")
    ) {

        website =
            "https://" + website;
    }


    /* ======================================
       CALCULATE SCORES
    ====================================== */

    const websiteScore =
        calculateWebsiteScore();


    const opportunityScore =
        calculateOpportunityScore();


    const improvementPotential =
        calculateImprovementPotential(
            websiteScore
        );


    const priorityScore =
        calculatePriorityScore(
            websiteScore,
            opportunityScore
        );


    const priority =
        getPriorityLabel(
            priorityScore
        );


    /* ======================================
       COLLECT INDIVIDUAL WEBSITE SCORES
    ====================================== */

    const websiteScores = {};

    WEBSITE_CATEGORIES.forEach(
        function(category) {

            const slider =
                document.getElementById(
                    category.id
                );

            websiteScores[
                category.id
            ] =
                Number(slider.value);

        }
    );


    /* ======================================
       COLLECT INDIVIDUAL OPPORTUNITY SCORES
    ====================================== */

    const opportunityScores = {};

    OPPORTUNITY_CATEGORIES.forEach(
        function(category) {

            const slider =
                document.getElementById(
                    category.id
                );

            opportunityScores[
                category.id
            ] =
                Number(slider.value);

        }
    );


    /* ======================================
       CREATE BUSINESS
    ====================================== */

    const business = {

        id:
            Date.now(),

        name:
            businessName,

        website:
            website,

        websiteScores:
            websiteScores,

        opportunityScores:
            opportunityScores,

        websiteScore:
            websiteScore,

        opportunityScore:
            opportunityScore,

        improvementPotential:
            improvementPotential,

        priorityScore:
            priorityScore,

        priority:
            priority,

        websiteLabel:
            getWebsiteLabel(
                websiteScore
            ),

        opportunityLabel:
            getOpportunityLabel(
                opportunityScore
            ),

        testedAt:
            new Date().toISOString()

    };


    /* ======================================
       SAVE
    ====================================== */

    let businesses =
        getBusinesses();


    businesses.push(
        business
    );


    saveBusinesses(
        businesses
    );


    /* ======================================
       DISPLAY RESULT
    ====================================== */

    const result =
        document.getElementById(
            "result"
        );


    result.innerHTML = `

        <h2>
            ANALYSIS COMPLETE
        </h2>

        <div class="result-scores">

            <div class="result-score">

                <span class="label">
                    WEBSITE SCORE
                </span>

                <span class="number">
                    ${Math.round(websiteScore)}
                </span>

            </div>


            <div class="result-score">

                <span class="label">
                    OPPORTUNITY SCORE
                </span>

                <span class="number">
                    ${Math.round(opportunityScore)}
                </span>

            </div>


            <div class="result-score">

                <span class="label">
                    PRIORITY SCORE
                </span>

                <span class="number">
                    ${Math.round(priorityScore)}
                </span>

            </div>

        </div>


        <p>
            WEBSITE:
            ${getWebsiteLabel(websiteScore)}
        </p>

        <p>
            OPPORTUNITY:
            ${getOpportunityLabel(opportunityScore)}
        </p>

        <p>
            IMPROVEMENT POTENTIAL:
            ${Math.round(improvementPotential)}/100
        </p>

        <p>
            PRIORITY:
            ${priority}
        </p>

        <p>
            ${escapeHTML(businessName)}
            has been saved to the database.
        </p>

        <p>

            <a href="businesses.html">
                VIEW ALL BUSINESSES →
            </a>

        </p>

    `;


    /* ======================================
       SCROLL TO RESULT
    ====================================== */

    result.scrollIntoView({
        behavior: "smooth",
        block: "center"
    });

}


/* ==========================================
   GET BUSINESSES
========================================== */

function getBusinesses() {

    const savedData =
        localStorage.getItem(
            STORAGE_KEY
        );


    if (!savedData) {

        return [];

    }


    try {

        const businesses =
            JSON.parse(
                savedData
            );


        if (
            Array.isArray(
                businesses
            )
        ) {

            return businesses;

        }

    } catch (error) {

        console.error(
            "Could not read saved businesses:",
            error
        );

    }


    return [];
}


/* ==========================================
   SAVE BUSINESSES
========================================== */

function saveBusinesses(
    businesses
) {

    localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(
            businesses
        )
    );
}


/* ==========================================
   DISPLAY BUSINESSES
========================================== */

function displayBusinesses() {

    const businessList =
        document.getElementById(
            "businessList"
        );


    if (!businessList) {

        return;
    }


    let businesses =
        getBusinesses();


    const sortElement =
        document.getElementById(
            "sort"
        );


    const sortOption =
        sortElement
            ? sortElement.value
            : "priority";


    /* ======================================
       SORT
    ====================================== */

    if (
        sortOption ===
        "priority"
    ) {

        businesses.sort(
            function(a, b) {

                return (
                    Number(
                        b.priorityScore
                    ) -
                    Number(
                        a.priorityScore
                    )
                );

            }
        );

    }


    else if (
        sortOption ===
        "opportunity"
    ) {

        businesses.sort(
            function(a, b) {

                return (
                    Number(
                        b.opportunityScore
                    ) -
                    Number(
                        a.opportunityScore
                    )
                );

            }
        );

    }


    else if (
        sortOption ===
        "website"
    ) {

        /*
            Lower Website Score means
            more room for improvement.
        */

        businesses.sort(
            function(a, b) {

                return (
                    Number(
                        a.websiteScore
                    ) -
                    Number(
                        b.websiteScore
                    )
                );

            }
        );

    }


    else if (
        sortOption ===
        "recent"
    ) {

        businesses.sort(
            function(a, b) {

                return (
                    new Date(
                        b.testedAt
                    ) -
                    new Date(
                        a.testedAt
                    )
                );

            }
        );

    }


    /* ======================================
       EMPTY DATABASE
    ====================================== */

    if (
        businesses.length === 0
    ) {

        businessList.innerHTML = `

            <div class="business-card">

                <h2>
                    NO BUSINESSES FOUND
                </h2>

                <p>
                    Test a website to add a
                    business to the database.
                </p>

            </div>

        `;

        return;
    }


    /* ======================================
       CLEAR DISPLAY
    ====================================== */

    businessList.innerHTML =
        "";


    /* ======================================
       CREATE CARDS
    ====================================== */

    businesses.forEach(
        function(business) {

            const date =
                new Date(
                    business.testedAt
                ).toLocaleString();


            const websiteScore =
                Number(
                    business.websiteScore
                ) || 0;


            const opportunityScore =
                Number(
                    business.opportunityScore
                ) || 0;


            const priorityScore =
                Number(
                    business.priorityScore
                ) || 0;


            const improvementPotential =
                Number(
                    business.improvementPotential
                ) || 0;


            const card =
                document.createElement(
                    "div"
                );


            card.className =
                "business-card";


            card.innerHTML = `

                <h2>
                    ${escapeHTML(
                        business.name
                    )}
                </h2>


                <p>

                    <a
                        href="${escapeHTML(
                            business.website
                        )}"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        ${escapeHTML(
                            business.website
                        )}
                    </a>

                </p>


                <div class="business-scores">


                    <div class="business-score">

                        <span class="score-number">
                            ${Math.round(
                                websiteScore
                            )}
                        </span>

                        <span class="score-name">
                            WEBSITE
                        </span>

                    </div>


                    <div class="business-score">

                        <span class="score-number">
                            ${Math.round(
                                opportunityScore
                            )}
                        </span>

                        <span class="score-name">
                            OPPORTUNITY
                        </span>

                    </div>


                    <div class="business-score">

                        <span class="score-number">
                            ${Math.round(
                                priorityScore
                            )}
                        </span>

                        <span class="score-name">
                            PRIORITY
                        </span>

                    </div>

                </div>


                <p>

                    <strong>
                        WEBSITE:
                    </strong>

                    ${escapeHTML(
                        business.websiteLabel ||
                        getWebsiteLabel(
                            websiteScore
                        )
                    )}

                </p>


                <p>

                    <strong>
                        OPPORTUNITY:
                    </strong>

                    ${escapeHTML(
                        business.opportunityLabel ||
                        getOpportunityLabel(
                            opportunityScore
                        )
                    )}

                </p>


                <p>

                    <strong>
                        IMPROVEMENT POTENTIAL:
                    </strong>

                    ${Math.round(
                        improvementPotential
                    )}/100

                </p>


                <div class="business-priority">

                    PRIORITY:
                    ${escapeHTML(
                        business.priority ||
                        getPriorityLabel(
                            priorityScore
                        )
                    )}

                </div>


                <p>

                    <strong>
                        TESTED:
                    </strong>

                    ${date}

                </p>


                <button
                    class="delete-button"
                    onclick="deleteBusiness(${business.id})"
                >
                    DELETE
                </button>

            `;


            businessList.appendChild(
                card
            );

        }
    );

}


/* ==========================================
   DELETE BUSINESS
========================================== */

function deleteBusiness(id) {

    let businesses =
        getBusinesses();


    businesses =
        businesses.filter(
            function(business) {

                return (
                    business.id !== id
                );

            }
        );


    saveBusinesses(
        businesses
    );


    displayBusinesses();

}


/* ==========================================
   HTML ESCAPING
========================================== */

function escapeHTML(value) {

    return String(value)

        .replace(
            /&/g,
            "&amp;"
        )

        .replace(
            /</g,
            "&lt;"
        )

        .replace(
            />/g,
            "&gt;"
        )

        .replace(
            /"/g,
            "&quot;"
        )

        .replace(
            /'/g,
            "&#039;"
        );

}


/* ==========================================
   PAGE INITIALIZATION
========================================== */

document.addEventListener(
    "DOMContentLoaded",
    function() {

        initializeSliders();

        displayBusinesses();

    }
);
