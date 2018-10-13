var loaded = false;
var students = [];

function renderStudents() {
  var list = document.getElementById('students');
  list.innerHTML = null;
  students.forEach( function(student) {
    var li = document.createElement('li')
    li.innerText = student.name
    list.append(li)
  })
}

function sample() {
  var index = Math.floor(Math.random() * students.length)
  var student = students[index]
  students.splice(index, 1)
  return student
}

function selectStudents() {
  var left = sample();
  var right = sample();
  renderStudents();
  return [left, right]
}

function placeFighters(fighting) {
  var left = Avatar('left', fighting[0])
  var right = Avatar('right', fighting[1])
  var leftBox = document.getElementById('left')
  var rightBox = document.getElementById('right')
  leftBox.innerHTML = left;
  rightBox.innerHTML = right;
}

function startFight() {
  loaded = true
  var left = document.getElementById('left')
  var right = document.getElementById('right')
  left.className = 'left fight-box';
  right.className = 'left fight-box';
  var fighting = selectStudents();
  placeFighters(fighting)
}

function pullStudents() {
  if (!loaded) {
    var xhr = new XMLHttpRequest()
    xhr.onreadystatechange = function() {
      if (xhr.readyState == XMLHttpRequest.DONE) {
        students = JSON.parse(xhr.responseText);
        renderStudents()
        document.getElementById('load_students').remove()
        startFight();
      }
    }
    xhr.open('GET', 'https://canvas-students.herokuapp.com/api/student_list/64', true)
    xhr.send(null)
  }
}

function winner(position){
  var fighter = document.getElementById('fighter_' + position)
  var data = fighter.dataset
  var label = document.getElementById('winner')
  label.innerHTML = "Winner:" + data.name 
  students.push(data)
    if (students.length !== 1) {
    var fighting = selectStudents()
    placeFighters(fighting)
    else {
      var avatar = Avatar(position, data);
      var div = document.createElement('div')
      div.className =  'winner'
      div.innerHTML = avatar
      var left = document.getElementById('left')
      var right = document.getElementById('right')
      var fightZone = document.getElementById('fight-zone')

    }
}

var button = document.getElementById('loading_zone')
var leftFighter = document.getElementById('left')
var rightFighter = document.getElementById('right')
button.addEventListener('click', pullStudents)
leftFighter.addEventListener('click', function() { winner('left') })
rightFighter.addEventListener('click', function() { winner('right') })
