//Retrieve Data
//Declaring object variables
const addBtn = document.getElementById("addBtn")
const dialog = document.getElementById("subjectDialog")
const dialogSubmitBtn = document.getElementById("submitBtn")
const dialogCancelBtn = document.getElementById("cancelBtn")
const display = document.getElementById("display")
const subjectForm = document.getElementById("subjectForm")
const analyzeForm = document.getElementById("analyzeForm")



//Dialog opening function
function openDialog() {
  dialog.showModal()
}

//Dialog closing function
function closeDialog(event) {
  event.preventDefault()
  dialog.close()
}

//subject saving function
let subjects = JSON.parse(localStorage.getItem("subjects")) || []

function saveSubject(event) {
  event.preventDefault()

  let subjectName = document.getElementById("subjectName")
  let subjectGrade = document.getElementById("subjectGrade")
  
  if (Number(subjectGrade) > 100) {
    subjectGrade = 100
  }

  subjects.push({
    id: Date.now(),
    subjectName: subjectName.value,
    subjectGrade: subjectGrade.value,
    rank: "",
  })


  renderSubjects()
  subjectGrade.value = ""
  subjectName.value = ""
  closeDialog(event)

}

renderSubjects()

//subject rendering function
function renderSubjects() {
display.innerHTML = ""
  for (let i = 0; i < subjects.length; i++) {
    const subject = subjects[i]
    const subjectBoard = document.createElement("div")
    subjectBoard.classList = "board"

    subjectBoard.innerHTML = `
      <p>${subject.subjectName} - ${subject.subjectGrade} - ${subject.rank}</p>
      <button onclick="deleteSubject(${i})">Delete</button>
    `

    display.appendChild(subjectBoard)
  }
}



function deleteSubject(index) {
  subjects.splice(index, 1)

  localStorage.setItem("subjects", JSON.stringify(subjects))

  window.location.reload()
}


addBtn.addEventListener("click", openDialog)
dialogCancelBtn.addEventListener("click", closeDialog)
subjectForm.addEventListener("submit", saveSubject)
  

//Calculations
const analyzeBtn = document.getElementById("analyzeBtn")

function totalScore() {
  let totalScore = JSON.parse(subjects[0].subjectGrade)
  for (var i = 1; i < subjects.length; i++){
    totalScore = totalScore + JSON.parse(subjects[i].subjectGrade)
  }
  return totalScore
}

function averagePercentage() {
  let totalPercentage = totalScore()
  let averagePercentage = totalPercentage / subjects.length
  averagePercentage = averagePercentage.toFixed(2)
  
  return averagePercentage
}

function rankSubjects() {
  for (var i = 0; i < subjects.length; i++) {
    let determinantGrade = JSON.parse(subjects[i].subjectGrade)
    let subjectRank =  subjects[i].rank
    
    if (determinantGrade > 69) {
      subjectRank = "🟢 Strong Subject"
      subjects[i].rank = subjectRank
    } else if (determinantGrade > 44 ) {
      subjectRank = "🟡 Average Subject"
      subjects[i].rank = subjectRank
    } else if(determinantGrade < 45){
      subjectRank = "🔴 Weak Subject "
      subjects[i].rank = subjectRank
    }
    localStorage.setItem("subjects", JSON.stringify(subjects))
    
    
  }
  renderSubjects()
}

function analyze(event) {
  event.preventDefault()
  localStorage.setItem("subjects", JSON.stringify(subjects))
 const fullName = document.getElementById("fullNameInput").value
  const studyHours = document.getElementById("studyHoursInput").value
  
  let totalDisplayScore = totalScore()
  let percentageDisplay = averagePercentage()
  rankSubjects()
  let stats = {
    fullName: fullName,
    studyHours: studyHours,
    totalScore: totalDisplayScore,
    percentage: percentageDisplay,
  }
  localStorage.setItem("stats", JSON.stringify(stats))
  
  window.location.href = "displayPage.html"
}

analyzeForm.addEventListener("submit", analyze)
