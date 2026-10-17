const fullNameSetting = document.getElementById("fullNameSetting")
const studyTimeSetting = document.getElementById("studyHoursSetting")
const settingSubjectsDisplay = document.getElementById("subjectSettingsList")
const deleteConformationDialog= document.getElementById("deleteConformation")
const addDialog = document.getElementById("subjectAddDialog")
const addSubmitBtn = document.getElementById("addSubmitBtn")
const addCancelBtn = document.getElementById("addCancelBtn")
const subjectAddForm = document.getElementById("subjectAddForm")
const settingsSaveBtn = document.getElementById("settingsSaveBtn")

let stats = JSON.parse(localStorage.getItem("stats"))
let subjects = JSON.parse(localStorage.getItem("subjects")) || []

fullNameSetting.value = stats.fullName
studyTimeSetting.value = stats.studyHours



function renderSubjects() {
settingSubjectsDisplay.innerHTML = ""
  for (let i = 0; i < subjects.length; i++) {
    const subject = subjects[i]
    const subjectBoard = document.createElement("div")
    subjectBoard.classList = "board"

    subjectBoard.innerHTML = `
      <p>${subject.subjectName} - ${subject.subjectGrade} - ${subject.rank}</p>
      <button onclick="deleteConformationPopUp()">Delete</button>
    `

    settingSubjectsDisplay.appendChild(subjectBoard)
  }
}
function confirmDelete(index){
    subjects.splice(index, 1)
    console.log(subjects)
    localStorage.setItem("subjects",JSON.stringify(subjects))
    deleteConformation.close()
    window.location.reload()
  }

function deleteConformationPopUp()
{
  deleteConformation.showModal()
  const deleteBtn = document.getElementById("finalDelete")
  const cancelBtn = document.getElementById("cancelDelete")
    
  deleteBtn.addEventListener("click", confirmDelete)
  
  cancelBtn.addEventListener("click", () => {
    deleteConformation.close()
  })
}

function openAddDialog() {
  addDialog.showModal()
}

function closeAddDialog(event) {
  event.preventDefault()
  addDialog.close()
}

function addSubject(event){
  event.preventDefault()

  let subjectName = document.getElementById("subjectName")
  let subjectGrade = document.getElementById("subjectGrade")

  let grade = Number(subjectGrade.value)
  if (grade > 100) {
    grade  = 100
  }

  subjects.push({
    id: Date.now(),
    subjectName: subjectName.value,
    subjectGrade: grade,
    rank: "",
  })


  subjectGrade.value = ""
  subjectName.value = ""
  closeAddDialog(event)

  localStorage.setItem("subjects", JSON.stringify(subjects))
  renderSubjects()
}
subjectAddForm.addEventListener("submit", addSubject)
addCancelBtn.addEventListener("click", closeAddDialog)

renderSubjects()

function analyze(event) {
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

  if(subjects.length > 0){
    event.preventDefault()
  localStorage.setItem("subjects", JSON.stringify(subjects))
 const fullName = document.getElementById("fullNameSetting").value
  const studyHours = document.getElementById("studyHoursSetting").value
  
  let totalDisplayScore = totalScore()
  let percentageDisplay = averagePercentage()
  rankSubjects()
  stats = {
    fullName: fullName,
    studyHours: studyHours,
    totalScore: totalDisplayScore,
    percentage: percentageDisplay,
  }
  localStorage.setItem("stats", JSON.stringify(stats))
  
  window.location.href = "displayPage.html"
  } else{
    window.location.href = "displayPage.html"
  }

}
settingsSaveBtn.addEventListener("click", analyze)
