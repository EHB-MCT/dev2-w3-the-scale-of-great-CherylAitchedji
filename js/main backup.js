import { getAdjectives } from "./data.js";

let adjectives;
let sortDirection = "up";

function init() {
  const data = getAdjectives();
  adjectives = JSON.parse(data);
  addSortEvents();
  sort();
  render();
}

function addSortEvents() {
  document.querySelector("#sort-up").addEventListener("click", function () {
    sortDirection = "up";
    console.log(sortDirection);
    sort();
    render();
  });

  document.querySelector("#sort-down").addEventListener("click", function () {
    sortDirection = "down";
    console.log(sortDirection);
    sort();
    render();
  });
}

function addVoteEvents() {
  const upButton = document.querySelectorAll(".upvote-button");
  const downButton = document.querySelectorAll(".downvote-button");
  upButton.forEach(function (button) {
    button.addEventListener("click", function (event) {
      upVote(event.target.value);

      console.log(event);
    });
  });
  downButton.forEach(function (button) {
    button.addEventListener("click", function (event) {
      downVote(event.target.value);

      console.log(event);
    });
  });
}

function sort() {
  console.log("sorting", sortDirection);
  if (sortDirection == "up") {
    adjectives.sort(function (a, b) {
      if (a.score > b.score) {
        return -1;
      } else {
        return 1;
      }
    });
  } else {
    adjectives.sort(function (a, b) {
      if (a.score > b.score) {
        return 1;
      } else {
        return -1;
      }
    });
  }
}

function render() {
  console.log(adjectives);
  document.querySelector("#container").innerHTML = "";
  adjectives.forEach(function (adjective) {
    let wordScore = "bad";
    if (adjective.score >= 6) {
      wordScore = "good";
    }
    document.querySelector("#container").innerHTML += `<div class="word-item">
        <span class="word-score ${wordScore}">${adjective.score}</span>
        <span>${adjective.word}</span>
        <div class="vote-buttons">
            <button value="${adjective.word}" class="upvote-button">👍</button>
            <button value="${adjective.word}" class="downvote-button">👎</button>
        </div>
    </div>`;
  });
  addVoteEvents();
}

function upVote(target) {
  adjectives.forEach(function (adjective) {
    if (adjective.word == target) {
      updateScore(adjective.word, 0.1);
    }
  });
  sort();
  render();
}

function downVote(target) {
  adjectives.forEach(function (adjective) {
    if (adjective.word == target) {
      updateScore(adjective.word, -0.1);
    }
  });
  sort();
  render();
}

function updateScore(word, scoreChange) {
  const foundIndex = adjectives.findIndex(function (item, index) {
    if (item.word == word) {
      return true;
    }
  });

  if (foundIndex != null) {
    let newScore = adjectives[foundIndex]["score"] + scoreChange;
    adjectives[foundIndex]["score"] = Math.round(newScore * 100) / 100;
  }
}

init();
