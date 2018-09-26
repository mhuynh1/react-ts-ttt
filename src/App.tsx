import * as React from "react";
import { Component } from "react";

const enum Player {
  None = 0,
  One = 1,
  Two = 2
}

interface IState {
  board: Player[];
  playerTurn: Player;
  winner: Player | null;
}

export default class App extends Component<{}, IState> {
  public state = {
    board: Array(9).fill(Player.None),
    playerTurn: Player.One,
    winner: null
  };

  private handleClick = (i: number) => () => {
    const board = [...this.state.board];
    const { playerTurn } = this.state;

    board[i] = playerTurn;

    const winner = this.checkGameWinner(board);

    this.setState({ board, playerTurn: 3 - playerTurn, winner });
  };

  private checkGameWinner = (board: Player[]) => {
    let winner;
    // check rows
    if (board[0] === board[1] && board[0] === board[2]) {
      winner = board[0];
    } else if (board[3] === board[4] && board[3] === board[5]) {
      winner = board[3];
    } else if (board[6] === board[7] && board[6] === board[8]) {
      winner = board[6];
    }

    // check cols
    else if (board[0] === board[3] && board[0] === board[6]) {
      winner = board[0];
    } else if (board[1] === board[4] && board[1] === board[7]) {
      winner = board[1];
    } else if (board[2] === board[5] && board[2] === board[8]) {
      winner = board[2];
    }

    // check diags
    else if (board[0] === board[4] && board[0] === board[8]) {
      winner = board[0];
    } else if (board[2] === board[4] && board[2] === board[6]) {
      winner = board[2];
    } else {
      winner = null;
    }

    return winner;
  };

  private handleNewGame = () => {
    this.setState({
      board: Array(9).fill(Player.None),
      playerTurn: Player.One,
      winner: null
    });
  };

  private renderCell = (i: number) => {
    const { board } = this.state;
    return (
      <div
        className="cell"
        key={i}
        onClick={
          this.state.winner || board[i] ? undefined : this.handleClick(i)
        }
        data-player={board[i]}
      />
    );
  };

  private renderBoard = () => {
    const { board } = this.state;
    return (
      <section className="container">
        <div className="board">{board.map((el, i) => this.renderCell(i))}</div>
        <button onClick={this.handleNewGame}>New Game</button>
      </section>
    );
  };

  public render() {
    const { winner, board } = this.state;
    const outcome =
      !winner && !board.some(c => c === Player.None) ? (
        <h1>Game is a draw</h1>
      ) : winner ? (
        <h1>Player {winner} won!</h1>
      ) : null;

    return (
      <div className="App" data-game-session={this.state.winner ? false : true}>
        <h1 className="App-title">T x 3</h1>
        {outcome}
        {this.renderBoard()}
        <section className="legend">
          <div className="p1">
            <p>Player 1</p>
          </div>
          <div className="p2">
            <p>Player 2</p>
          </div>
        </section>
      </div>
    );
  }
}
