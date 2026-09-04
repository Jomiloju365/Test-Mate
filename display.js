

function displayToPage() {
  const fullName = document.getElementById("fullName")
const studyHours = document.getElementById("studyHours")
const totalScore = document.getElementById("totalScore")
const percentage = document.getElementById("percentage")
const subjectsDisplay = document.getElementById("subjectsDisplay")

  
  
  const stats = JSON.parse(localStorage.getItem("stats"))
  let subjects = JSON.parse(localStorage.getItem("subjects")) 
  fullName.textContent = stats.fullName
  studyHours.textContent = `Study Hours: ${stats.studyHours} hours`
  totalScore.textContent = `Total Score: ${stats.totalScore}/${100 * subjects.length}`
  percentage.textContent = `Average Percentage: ${stats.percentage}%`


  for (let i = 0; i < subjects.length; i++) {
    const subject = subjects[i]

    const subjectDisplay = document.createElement("div")
    subjectDisplay.classList = "board"

    subjectDisplay.innerHTML = `
      <p>${subject.subjectName} - ${subject.subjectGrade} - ${subject.rank}</p>
    `

    subjectsDisplay.appendChild(subjectDisplay)
    
  }
  
}


  
function studyGuide() {
  const subjects = JSON.parse(localStorage.getItem("subjects")) 
  const stats = JSON.parse(localStorage.getItem("stats"))
 
  let aimScore = 100 * subjects.length
  let totalTickets = aimScore - stats.totalScore
   let studyGuide =  []
  
  let studyHours = stats.studyHours
  let studyMinutes = (studyHours * 60)
  console.log(studyMinutes)
  
 for (var i = 0; i < subjects.length; i++) {
    let subjectTickets = (100 - subjects[i].subjectGrade)
    let hoursPercentage = (subjectTickets / totalTickets * 100) 
    let subjectStudyMinutes = (hoursPercentage / 100) * studyMinutes
    let subjectStudyHours =  `${Math.floor(subjectStudyMinutes / 60)} hours and ${Math.floor(subjectStudyMinutes % 60)} minutes`
    
    console.log(subjectStudyHours)
    
    studyGuide.push(
      {
        subject: subjects[i].subjectName,
        subjectStudyHours: subjectStudyHours,
        rank: subjects[i].rank
      } 
    ) 
  } 
  localStorage.setItem("studyGuide", JSON.stringify(studyGuide))
}

function renderGuide(){
  const guideDisplay = document.getElementById("guideDisplay")
  let studyGuide = localStorage.getItem("studyGuide")
  studyGuide = JSON.parse(studyGuide)
  
  for (let i = 0; i < studyGuide.length; i++) {
    const guide = studyGuide[i]

    const guideCard = document.createElement("div")
    guideCard.classList = "guideCard"

    guideCard.innerHTML = `
      <h2>Subject: ${guide.subject}</h2>
      <h3>Subject strength: ${guide.rank}</h3>
      <p>Recommended study time: ${guide.subjectStudyHours}</p>
    `

    guideDisplay.appendChild(guideCard)
    
  }
  
}

displayToPage()
studyGuide()
renderGuide()