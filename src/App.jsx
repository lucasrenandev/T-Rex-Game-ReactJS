import { useEffect, useState } from 'react'
import './App.css'

export default function App() {
  {/* Variáveis para o jogo */}
  let [score] = useState(0)
  let [gameInterval] = useState(null)
  let [toJump] = useState(false)
  
  {/* Criando pontuacão do jogo de forma dinâmica */}
  const createScore = () => {
    const scoreElement = document.getElementById("score")
    scoreElement.textContent = score
  }
  useEffect(() => {
    createScore()
  }, [])
  
  {/* Função para T-Rex pular */}
  const jumpRex = () => {
    document.addEventListener("keydown", function(e) {
      if(e.code === "Space" || e.code === "ArrowUp") {
        jump()
      }
    })
  }
  
  {/* Função para pular */}
  const jump = () => {
    const dinoElement = document.getElementById("dino")
    if(!dinoElement.classList.contains("jump")) {
      dinoElement.classList.add("jump")
      toJump = true
      setTimeout(() => {
        dinoElement.classList.remove("jump")
        toJump = false
      }, 1000)
    }
  }

  {/* Função para controlar pontuação */}
  const scoreControl = () => {
    clearTimeout(gameInterval)
  }

  {/* Função para iniciar o jogo */}
  const startGame = () => {
    scoreControl()
    const scoreElement = document.getElementById("score")
    const cactoElement = document.getElementById("cacto")
    gameInterval = setInterval(() => {
      score ++
      scoreElement.textContent = score
      cactoElement.style.animationPlayState = "running"
      jumpRex()
      gameOver()
    }, 10);
  } 

  {/* Função para reiniciar o jogo */}
  const refreshGame = () => {
    location.reload()
  }

  {/* Função para o fim do jogo */}
  const gameOver = () => {
    const dinoElement = document.getElementById("dino")
    const cactoElement = document.getElementById("cacto")
    const refreshGame = document.getElementById("refresh-game")
    const startGame = document.getElementById("start-game")
    let dinoBottom = parseInt(window.getComputedStyle(dinoElement).getPropertyValue("bottom"))
    let cactoLeft = parseInt(window.getComputedStyle(cactoElement).getPropertyValue("left"))
    if(cactoLeft >= 50 && cactoLeft <= 210 && dinoBottom <=70 && !toJump) {
      dinoElement.style.animationPlayState = "paused"
      cactoElement.style.animationPlayState = "paused"
      clearInterval(gameInterval)
      gameInterval = null
      startGame.style.display = "none"
      refreshGame.style.display = "inline-block"
      alert("Game Over!!!")
    }
  }

  return (
    <>
      <section className='container'>
        <div className="score-box">
          <h3>Score: <span id='score'></span></h3>
        </div>{/* End score box */}
        <main className="game-box">
          <div className='dino' id="dino"></div>
          <div className='cacto' id="cacto"></div>
        </main>{/* End game box */}
        <div className="button-box">
          <button onClick={startGame} 
          id='start-game' type='button'>Play</button>
          <button onClick={refreshGame} 
          id='refresh-game' type='button'>Refresh</button>
        </div>{/* End button box */}
      </section>{/* End container */}
    </>
  )
}