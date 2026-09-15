const { useState, useRef } = React;

export function Board() {
  const results = useRef(null);
  const buttons = useRef([]);
  const buttonIndexes = [0, 1, 2, 3, 4, 5, 6, 7, 8]
  const winConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];
  const [selectedSquare, setSelectedSquare] = useState(0);
  const choices = ["X", "O"];
  const [nextPlayer, setNextPlayer] = useState(choices[0]);
  const handleClick = (e) => {
    if (e.target.innerHTML !== "&nbsp;") return;
    e.target.innerHTML = nextPlayer;
    setNextPlayer(choices[0]===nextPlayer?choices[1]:choices[0]);
    const nextSquare = selectedSquare+1
    setSelectedSquare(nextSquare);
    const winResult = checkWin()
    if (winResult !== "") {
      results.current.innerHTML = `Winner: ${winResult}`
    }
    else {
      if (nextSquare >= 9) {
        results.current.innerHTML = "It's a Draw!"
      };
    }

  };
  const checkWin = () => {
    let winner = "";
    let winMaps = choices.map(()=>[])
    winConditions.forEach((winCondition)=>{
      choices.forEach((choice, index)=>winMaps[index].push(winCondition.map((position)=>buttons.current[position].innerHTML === choice)))
    })
    choices.forEach((choice, index)=>{
    winMaps[index].forEach((winMap)=>{
      if (!winMap.includes(false)) {
        winner = choice
      }
    })
    })
    return winner;
  }
  const handleReset = () => {
    buttons.current.forEach((button)=>{
      button.innerHTML = "&nbsp";
    })
  }
  return (
    <>
      <h2 ref={results}></h2>
      <div className="square-container">
      {buttonIndexes.map((buttonIndex)=> ( <button className="square" onClick={(e)=>handleClick(e)} ref={(element) => {buttons.current[buttonIndex] = element}} key={buttonIndex}>&nbsp;</button>))}
      </div>
      <button id="reset" onClick={handleReset}>Reset</button>
    </>
  )
}