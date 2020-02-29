// https://github.com/jhlywa/chess.js
declare module "chess.js" {
    class Chess {
        constructor(fen: string);

        ascii(): string;
    }

    export default Chess;
  }