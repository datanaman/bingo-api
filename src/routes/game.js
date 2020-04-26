import { Router } from 'express';
const router = Router();

var gameData = [];

router.get('/', (req, res) => {
  gameData =[];
  return res.send('Cleared');
});



router.get('/:gameId', (req, res) => {
  var id = req.params.gameId;
  var gamerecord = gameData.find(record=> record.id==id);
  var result  = [];
  if(gamerecord)
  {
    result = gamerecord.calledoutnumbers;
  }
  return res.send(result);
});

router.get('/:gameId/generate', (req, res) => {
  var id = req.params.gameId;
  var calledoutnumbers = [];

  var gamerecord = gameData.find(record=> record.id==id);
  if(gamerecord)
  {
    calledoutnumbers = gamerecord.calledoutnumbers;
    if(calledoutnumbers.length<100)
    {
    var newNumber = generateNumber(calledoutnumbers);
    if(newNumber)
    {
      calledoutnumbers.push(newNumber);
    }
     }
  }
  else {
    var newNumber = generateNumber(null);
    calledoutnumbers.push(newNumber);
    var gamereocrd = { id , calledoutnumbers };
    gameData.push(gamereocrd);
  } 
  return res.send(calledoutnumbers);
});

function generateNumber(calledoutnumbers)
{
  const newNumber = Math.floor(Math.random() * 100) + 1;
  if(calledoutnumbers && calledoutnumbers.find(x=>x==newNumber))
  {
    generateNumber(calledoutnumbers);
  }
  return newNumber;
}

export default router;
