var player1=prompt("Player 1 enter your name: you will be Blue")
var player1color='rgb(86, 151, 255)';

var player2=prompt("Player 2 enter your name: you will be red")
var player2color='rgb(237, 45, 73)';

var game_on=true;
var table=$('table tr');
// function to report win
function reportwin(rownum,colnum) {
  console.log("You won starting this row,col");
  console.log(rownum);
  console.log(colnum);

}
// function to change color of particular row and column
function changecolor(rowindex,colindex,color) {
  return table.eq(rowindex).find('td').eq(colindex).find('button').css('background-color',color)

}
// function which report color of the particular row and column,it returns color in the form of rgb string
function returncolor(rowindex,colindex) {
  return table.eq(rowindex).find('td').eq(colindex).find('button').css('background-color')

}
// function to tells which lowest row is not having color
function checkBottom(colindex) {
  var colorReport = returncolor(5,colindex)
  for (var row = 5; row > -1; row--) {
    colorReport = returncolor(row,colindex)
    if (colorReport === 'rgb(128, 128, 128)') {
      console.log('row is' + row);
      return row

    }

  }

}
// function which matches color of the four cells
function colormatchCheck(one,two,three,four) {
  return (one===two && one===three && one===four && one!=='rgb(128, 128, 128)' && one!==undefined)
  // here first we are checking for color match of four cells and then we are checking that four selected cells are not gray buttons and at last we are checking that our four selected cells are not locataed outside our table


}

// check horizontal win
function horizontalWinCheck() {
  for (var row= 0; row < 6; row++) {
    for (var col= 0; col < 4; col++) {
      if (colormatchCheck(returncolor(row,col) ,returncolor(row,col+1) ,returncolor(row,col+2) ,returncolor(row,col+3))) {
        console.log('horiz');
        reportwin(row,col);
        return true;


      }else {
        continue;
      }
    }

  }

}

// check vertical win
function verticalWinCheck() {
  for (var col = 0; col < 7; col++) {
    for (var row = 0; row < 3; row++) {
      if (colormatchCheck(returncolor(row,col) ,returncolor(row+1,col) ,returncolor(row+2,col) ,returncolor(row+3,col))) {
        console.log('vertiz');
        reportwin(row,col);
        return true;
      }else {
        continue;
      }
    }
  }
}

  // diagonal win checking
  function diagonalalWinCheck() {
    for (var col = 0; col < 7; col++) {
      for (var row = 0; row < 6; row++) {
        if (colormatchCheck(returncolor(row,col) ,returncolor(row+1,col+1) ,returncolor(row+2,col+2) ,returncolor(row+3,col+3))) {
          console.log("diag");
          reportwin(row,col);
          return true;
        }else if (colormatchCheck(returncolor(row,col) ,returncolor(row-1,col+1) ,returncolor(row-2,col+2) ,returncolor(row-3,col+3))) {
          console.log("diag");
          reportwin(row,col);
          return true;

        }else {
          continue;
        }


      }
    }

  }



// start with player 1
var currentPlayer = 1;
var currentName = player1;
var currentColor = player1color;


$('h3').text(player1 + " it is your turn,pick a column to drop in!")

$('.board button').on('click',function(){
  var col = $(this).closest('td').index();

  console.log(col);
  // this closest and index keyword returns the index of closest element which is clicked in td

  var bottomAvail = checkBottom(col)



  changecolor(bottomAvail,col,currentColor)

  if (horizontalWinCheck() || verticalWinCheck() || diagonalalWinCheck()) {
    $('h1').text(currentName + ' you have won');
    $('h3').fadeOut('fast')
    $('h2').fadeOut('fast')


  }
  currentPlayer = currentPlayer*-1;

  if (currentPlayer === 1) {
    currentName = player1
    $('h3').text(currentName + ' it is your turn')
    currentColor = player1color

  }else {
    currentName = player2
    $('h3').text(currentName + ' it is your turn')
    currentColor = player2color

  }


});
