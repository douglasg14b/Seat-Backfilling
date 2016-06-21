var height = 25;
var width = 10;

var sheet = SpreadsheetApp.openById("1czTERuUR3NIEhKvfPkiem5g0-ilykNKPzo2cQ6qdqfo").getSheetByName("Sheet1");
var range = sheet.getRange(1, 1, height, width);

var moves = 0;

function GenerateRandom(){
  var values = range.getValues();  
  
  for(var  i = 0; i < values.length; i++){
    for(var  ii = 0; ii < values[i].length; ii++){
      var val = Math.random();
      values[i][ii] = val < 0.5 ? 0 : 1;
    }
  }
  range.setValues(values);
}

function FillRows() {
  var testArray = 
  [[1,2,3],
   [4,5,6],
   [7,8,9]];
  
  var currentSeats = 
  [[1,0,0],
   [1,0,1],
   [1,1,1]];
  
  ProcessSeats(range.getValues());
}

function ProcessSeats(currentSeats){
  for(var  r = 0; r < currentSeats.length; r++){
    for(var s = 0; s < currentSeats[r].length; s++){
      if(currentSeats[r][s] == 0){
        FillSeat(currentSeats, r, s);
      }
    }
  }
  sheet.getRange(1, 13).setValue(moves)
  range.setValues(currentSeats);
}

function FillSeat(currentSeats, row, seat){
  var nextIndex = DetermineNextSeatToMove(currentSeats, row, seat);
  if(nextIndex){
    var currentSeatVal = currentSeats[row][seat];
    var nextSeatVal = currentSeats[nextIndex.row][nextIndex.seat];
  
    currentSeats[nextIndex.row][nextIndex.seat] = currentSeatVal;
    currentSeats[row][seat] = nextSeatVal;   
    moves++;
  }
}


function DetermineNextSeatToMove(currentSeats, row, seat){
  var gotToSeat = false;
  for(var r = 0; r < currentSeats.length; r++){
    if(r < row){
      continue;
    }
    for(var s = gotToSeat ? 0 : seat; s < currentSeats[r].length; s++){
      gotToSeat = true;
      if(currentSeats[r][s] == 1){
        return {row: r, seat: s}
      }
    }
  }
  return false;
}
