// https://github.com/jhlywa/chess.js
declare module "chess.js" {
    class Chess {
        constructor(fen: string);

        ascii(): string;
        board(): Array<Array<{type: string, color: string}>>;
    }

    export default Chess;
  }