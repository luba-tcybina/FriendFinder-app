var express = require('express')
var router = express.Router();
var fs = fs = require('fs');

function readFile() {
  var rawdata = fs.readFileSync('app/data/friends.js');
  return JSON.parse(rawdata);
}

function writeFile(friends) {
  var data = JSON.stringify(friends);
  fs.writeFileSync('app/data/friends.js', data);
}

function getScore(user1Score, user2Score) {
  var score = 0;
  for (var i=0; i<10; i++) {
    score += Math.abs(user1Score[i] - user2Score[i]);
  }
  return score;
};

function getClosestFriend(friendsList, sourceFriend) {
  var closestFriend = '';
  var leastScore = 9999;
  friendsList.forEach((friend) => {
    var score = getScore(sourceFriend.scores, friend.scores);
    if (score < leastScore) {
      leastScore = score;
      closestFriend = friend;
    }
  });
  return closestFriend;
};

router.get('/friends', (req, res) => res.send(readFile()));

router.post('/friends', function(req, res, next) {
  var friend = req.body;
  var friendsList = readFile();
  var closestFriend = getClosestFriend(friendsList, friend);
  friendsList.push(friend);
  writeFile(friendsList);
  res.send(closestFriend)
});

module.exports = router;
