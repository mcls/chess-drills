import Chess from 'chess.js'

function component() {
    const element = document.createElement('div');
  
    // const chess = new Chess()  
    const chess = new Chess(
        'r1k4r/p2nb1p1/2b4p/1p1n1p2/2PP4/3Q1NB1/1P3PPP/R5K1 b - c3 0 19'
    )  

    let ascii = chess.ascii()

    // White pieces
    ascii = ascii.replace(/P/g, "♙")
    ascii = ascii.replace(/R/g, "♖")
    ascii = ascii.replace(/B/g, "♗")
    ascii = ascii.replace(/N/g, "♘")
    ascii = ascii.replace(/Q/g, "♕")
    ascii = ascii.replace(/K/g, "♔")

    // Black pieces
    ascii = ascii.replace(/p/g, "♟")
    ascii = ascii.replace(/r/g, "♜")
    ascii = ascii.replace(/b/g, "♝")
    ascii = ascii.replace(/n/g, "♞")
    ascii = ascii.replace(/q/g, "♛")
    ascii = ascii.replace(/r/g, "♚")
    element.innerHTML = "<pre style='font-size: 20px'>" + ascii + "</pre>"
  
    return element;
  }
  
  document.body.appendChild(component());