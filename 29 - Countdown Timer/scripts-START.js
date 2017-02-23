let countdown;
const timerDisplay = document.querySelector('.display__time-left')
const endTime = document.querySelector('.display__end-time')
const timerButtons = document.querySelectorAll('[data-time]')
const inputForm = document.customForm
// const inputMinutes = document.customForm.minutes

inputForm.addEventListener('submit', function(e) {
  e.preventDefault()
  const mins = this.minutes.value
  console.log(mins)
  this.reset()
  clearInterval(countdown)
  timer(mins * 60)
})

timerButtons.forEach( button => {
  button.addEventListener('click', startTimer)
});

function startTimer () {
  const seconds = parseInt(this.dataset.time)
  clearInterval(countdown)
  timer(seconds)
}

function timer(seconds) {
  const now = Date.now()
  const then = now + seconds * 1000
  displayEndTime(then)
  displayTimeLeft(seconds)

  countdown = setInterval(() => {
    const secondsLeft = Math.round((then - Date.now() )/ 1000)
    if (secondsLeft < 0) {
      clearInterval(countdown)
      return
    }
    displayTimeLeft(secondsLeft)
  }, 1000)
}

function displayTimeLeft(secondsLeft) {
  const minutes = Math.floor(secondsLeft / 60)
  const seconds = secondsLeft % 60
  const display = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`
  document.title = display;
  timerDisplay.textContent = display;
}

function displayEndTime(timestamp) {
  const end = new Date(timestamp);
  const hour = end.getHours()
  const minutes = end.getMinutes()
  endTime.textContent = `Be Back at ${hour > 12 ? (hour-12) : hour}:${minutes < 10 ? '0' : ''}${minutes} ${hour < 12 ? 'AM' : 'PM'}`
}