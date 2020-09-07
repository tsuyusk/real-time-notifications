declare namespace Express {
  export interface Request {
    io: import('socket.io').Server;
    connectedUsers: {
      [key: string]: any;
    };
  }
}
