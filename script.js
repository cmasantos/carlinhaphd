document.addEventListener('DOMContentLoaded', () => {
    const storySection = document.getElementById('story-section');
    const choicesSection = document.getElementById('choices-section');
    const actionButton = document.getElementById('action-button');
    let currentStage = 0;
    let decisionPoints = 0; // Track decisions
  let decisionMetrics = {
        academicPerformance: 0,
        socialSupport: 0,
        stressLevel: 0
    };

     const stages = [
        {
            text: "Welcome to the Carla Pinto ques to to the literature Phd. Best of luck.",
            choices: [ 
                { text: "Begin", impact: { academicPerformance: 1, socialSupport: 1, stressLevel: 0 }},
            ]
        },
    {
        text: "Carla needs to write papers to get accepted into the Ph.D. program. Does she ask for help?",
        choices: [
            { text: "Ask Carlos for help", impact: { academicPerformance: 1, socialSupport: 2, stressLevel: -1 }},
            { text: "Ask Carolina for help", impact: { academicPerformance: 1, socialSupport: 2, stressLevel: -1 }},
            { text: "Do it alone", impact: { academicPerformance: 2, socialSupport: -1, stressLevel: 2 }}
        ]
    },
    {
        text: "Carla attends Ph.D. classes and gathers knowledge. She finds one course particularly challenging. How does she approach it?",
        choices: [
            { text: "Seek help from her advisor", impact: { academicPerformance: 2, socialSupport: 1, stressLevel: -2 }},
            { text: "Form a study group with classmates", impact: { academicPerformance: 1, socialSupport: 3, stressLevel: -1 }},
            { text: "Study harder on her own", impact: { academicPerformance: 3, socialSupport: -2, stressLevel: 3 }}
        ]
    },
    {
        text: "Carla proposes her thesis topic to her advisor, but he suggests a different direction. What should she do?",
        choices: [
            { text: "Follow her advisor's suggestion", impact: { academicPerformance: 1, socialSupport: 2, stressLevel: -1 }},
            { text: "Argue for her original idea", impact: { academicPerformance: 2, socialSupport: -1, stressLevel: 2 }},
            { text: "Seek a second opinion from another professor", impact: { academicPerformance: 1, socialSupport: 1, stressLevel: 1 }}
        ]
    },
    {
        text: "Writing the thesis is challenging and requires a lot of effort. Carla feels overwhelmed. How does she deal with stress?",
        choices: [
            { text: "Take a short break and travel", impact: { academicPerformance: -1, socialSupport: 0, stressLevel: -3 }},
            { text: "Talk to Carlos for moral support", impact: { academicPerformance: 0, socialSupport: 3, stressLevel: -2 }},
            { text: "Visit her family for comfort", impact: { academicPerformance: -2, socialSupport: 2, stressLevel: -1 }}
        ]
    },
    {
        text: "Carla defends her thesis in front of a tough jury. She's asked a question she hadn't anticipated. How does she handle it?",
        choices: [
            { text: "Admit she doesn't know the answer", impact: { academicPerformance: -1, socialSupport: 1, stressLevel: -2 }},
            { text: "Attempt to reason through the answer", impact: { academicPerformance: 2, socialSupport: 0, stressLevel: 1 }},
            { text: "Deflect the question subtly", impact: { academicPerformance: 1, socialSupport: 0, stressLevel: 2 }}
        ]
    },
    {
        text: "Carla's mother calls asking for help with house chores during a crucial phase of her research. What does Carla do?",
        choices: [
            { text: "Politely decline and focus on her research", impact: { academicPerformance: 2, socialSupport: -1, stressLevel: -1 }},
            { text: "Help her mother and try to manage her time", impact: { academicPerformance: -1, socialSupport: 2, stressLevel: 2 }},
            { text: "Ask Carlos to help her mother instead", impact: { academicPerformance: 0, socialSupport: 1, stressLevel: -2 }}
        ]
    },
    {
        text: "Carla is close to completing her thesis but faces writer's block. How does she overcome it?",
        choices: [
            { text: "Take a break and go for a walk", impact: { academicPerformance: 0, socialSupport: 0, stressLevel: -2 }},
            { text: "Discuss her ideas with Carolina", impact: { academicPerformance: 1, socialSupport: 2, stressLevel: -1 }},
            { text: "Read inspiring literature", impact: { academicPerformance: 2, socialSupport: -1, stressLevel: 1 }}
        ]
    },
    {
        text: "Congratulations! Carla successfully completes her Ph.D.! How does she celebrate?",
        choices: [
            { text: "Throw a big party with friends", impact: { academicPerformance: 0, socialSupport: 3, stressLevel: -3 }},
            { text: "Have a quiet celebration with family", impact: { academicPerformance: 0, socialSupport: 2, stressLevel: -2 }},
            { text: "Plan a vacation to relax", impact: { academicPerformance: 0, socialSupport: 1, stressLevel: -1 }}
        ]
    }
];

 

// Rest of the script remains the same...
  
 


    function updateStory() {
      const imageElement = document.getElementById('game-image');
      imageElement.src = getImageForStage(currentStage);

      console.log(currentStage)
      
        if (currentStage < stages.length) {
            storySection.textContent = stages[currentStage].text;
            updateChoices();
        } else {
            determineEnding();
        }
    }

     function updateChoices() {
        choicesSection.innerHTML = '';
        stages[currentStage].choices.forEach((choice) => {
            const button = document.createElement('button');
            button.textContent = choice.text;
            button.onclick = () => makeChoice(choice.impact);
            choicesSection.appendChild(button);
        });
    }
  
   function makeChoice(impact) {
        // Update decision metrics based on choice impact
        Object.keys(impact).forEach(key => {
            decisionMetrics[key] += impact[key];
        });
        currentStage++;
        updateStory();
        actionButton.disabled = currentStage < stages.length;
    }

    function makeChoice(choiceIndex) {
        decisionPoints += choiceIndex; // Simple way to accumulate decisions
        currentStage++;
        updateStory();
        actionButton.disabled = currentStage < stages.length;
    }

    function determineEnding() {
        
        choicesSection.innerHTML = '';
        actionButton.style.display = 'inline'

        // Logic to determine ending based on decisionMetrics
        // Example:
        let endingText;
        if (decisionMetrics.academicPerformance > 5 && decisionMetrics.stressLevel < 5) {
            endingText = "Carla excelled academically with manageable stress, leading to a successful Ph.D.";
        } else if (decisionMetrics.socialSupport > 5) {
            endingText = "Carla's strong support network helped her overcome challenges in her Ph.D. journey.";
        } else {
            endingText = "Carla's journey was filled with learning experiences, shaping her future endeavors.";
        }
        storySection.textContent = endingText;
        actionButton.textContent = "Restart";
        actionButton.onclick = () => location.reload(); // Restart the game
    }
    
   

    updateStory();
  
  function getImageForStage(stage) {
    // Define your stage-specific images here
    const stageImages = [
        "images/path_to_image_for_stage_1.jpg",
        "images/stage_1.png", 
        "images/stage_2.png", 
        "images/stage_3.png", 
        "images/stage_4.png", 
        "images/stage_5.png", 
        "images/stage_6.png", 
        "images/stage_7.png", 
        "images/stage_8.png",
        "images/stage_9.jpg",
    ];
    return stageImages[stage] || "path_to_default_image.jpg";
}
});
