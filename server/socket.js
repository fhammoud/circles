module.exports = function (io) {
  console.log("io started");

  var clients = {};
  var rooms = io.sockets.adapter.rooms;

// Socket io
  io.on('connection', function (socket) {

    console.log("socket connection established...");

    // Assign this username to the socket.
    var username = socket.handshake.query.username;
    var room = '';

    /**
     * Handle join room event.
     */
    socket.on('join room', function (roomToJoin) {
      room = roomToJoin;
      socket.join(room);

      if (!rooms[room].users) {
        rooms[room].users = [];
      }

      // Get list of users for new user.
      var users = rooms[room].users;
      socket.emit('get users', users);

      // Add user to list of users
      rooms[room].users.push(username);
      listUsers();

      // Broadcast new user to room.
      socket.to(room).emit('new user', username);
    });

    /**
     * Handle user typing event.
     */
    socket.on('user typing', function () {
      // console.log(username + ' is typing');

      // Broadcast who is typing to rest of users.
      socket.to(room).emit('user typing', username);
    });

    /**
     * Handle new message event.
     */
    socket.on('new message', function (msg) {

      msg.time = new Date();

      console.log(msg);

      // Broadcast message to rest of users.
      socket.to(room).emit('new message', msg);
    });

    /**
     * Handle disconnect event.
     */
    socket.on('disconnect', function () {
      console.log(username + ' disconnected');

      // Broadcast who left to rest of users.
      socket.to(room).emit('user disconnected', username);
      socket.leave(room);

      // Remove user.
      removeUser(username);
    });


    /*
     * Private helper functions
     */

    // Function to return index of user
    function findUser(name) {
      return rooms[room].users.indexOf(name);
    }

    // Function to list users
    function listUsers() {
      var list = 'Users: ';
      var clients = rooms[room].users;
      for (var i = 0; i < clients.length; i++) {
        list += clients[i] + ' ';
      }
      console.log(list);
    }

    // Function to add new user
    function addUser() {
      socket.username = username;
      socket.room = room;
      clients[username] = socket;
      listUsers();
    }

    // Function to remove user
    function removeUser(user) {
      if (rooms[room]) {
        var index = findUser(user);
        rooms[room].users.splice(index, 1);
        listUsers();
      }
    }

    function getUsers() {
      var list = [];
      for (var i = 0; i < clients.length; i++) {
        if (clients[i].room === room)
          list.push(clients[i].username);
      }
      return list;
    }
  });
};
