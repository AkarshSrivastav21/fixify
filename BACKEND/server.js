
// Maintained by Akarsh Srivastavconst http = require("http");
const { Server } = require("socket.io");
const app = require("./app");
const utilityModel = require("./models/utility.model"); // provider schema
const bookingModel = require("./models/bookings.model"); // booking schema

// ✅ Create HTTP server
const server = http.createServer(app);

// ✅ Socket.io setup
const io = new Server(server, {
  cors: { origin: "*" },
});


// 👀 Keep track of connected users and providers
const connectedProviders = {};
const connectedUsers = {};

io.on("connection", (socket) => {
  // console.log("⚡ New socket connected:", socket.id);

  // ✅ Provider register karega
  socket.on("registerProvider", async (providerId) => {
    connectedProviders[providerId] = socket.id;

    await utilityModel.findByIdAndUpdate(providerId, {
      socketId: socket.id,
      status: "active",
    });

    // console.log(`✅ Provider ${providerId} registered with socket ${socket.id}`);
  });
  const connectedProviders = {}; // providerId → socketId

io.on("connection", (socket) => {
  // console.log("⚡ Provider connected:", socket.id);

  // registerProvider listener
  const registerHandler = (providerId) => {
    console.log(`Provider ${providerId} registered`);
    socket.providerId = providerId; // store providerId if needed
  };

  socket.on("registerProvider", registerHandler);

  // Clean up disconnect listener
  const disconnectHandler = () => {
    console.log("⚡ Provider disconnected:", socket.id);
  };
  socket.on("disconnect", disconnectHandler);

  // OPTIONAL: cleanup if needed
  socket.once("disconnect", () => {
    socket.off("registerProvider", registerHandler);
    socket.off("disconnect", disconnectHandler);
  });
});



  // ✅ User register karega
  socket.on("registerUser", async (userId) => {
    connectedUsers[userId] = socket.id;

    // Agar user ka schema me socketId hai to update karna
    // (optional – depends on your user schema)
    // await userModel.findByIdAndUpdate(userId, { socketId: socket.id });

    console.log(`👤 User ${userId} registered with socket ${socket.id}`);
  });

  // ✅ Disconnect handling
  socket.on("disconnect", async () => {
    // Provider disconnect check
    const providerId = Object.keys(connectedProviders).find(
      (key) => connectedProviders[key] === socket.id
    );
    if (providerId) {
      delete connectedProviders[providerId];
      await utilityModel.findByIdAndUpdate(providerId, {
        status: "inactive",
        socketId: null,
      });
      // console.log(`❌ Provider ${providerId} disconnected`);
    }

    // User disconnect check
    const userId = Object.keys(connectedUsers).find(
      (key) => connectedUsers[key] === socket.id
    );
    if (userId) {
      delete connectedUsers[userId];
      // console.log(`❌ User ${userId} disconnected`);
    }
  });
});


// ------------------- Booking Route -------------------
app.post("/book-service", async (req, res) => {
  try {
    const { userId, category, details } = req.body;

    // 👀 Find provider with same profession
    const provider = await utilityModel.findOne({
      profession: category,
      status: "active",
    });

    if (!provider) {
      return res.status(404).json({ message: "No active provider available" });
    }

    // ✅ Save booking
    const booking = new bookingModel({
      userId,
      providerId: provider._id,
      category,
      details,
      status: "pending",
    });
    await booking.save();

    // ✅ Notify provider if online
    if (connectedProviders[provider._id]) {
      io.to(connectedProviders[provider._id]).emit("newBooking", booking);
      console.log("📨 Booking sent to provider:", provider.fullname.firstname);
    }

    res.status(201).json({ message: "Booking created", booking });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});


// ------------------- Accept / Reject Booking -------------------
app.post("/booking/:id/action", async (req, res) => {
  try {
    const { id } = req.params;
    const { action } = req.body; // "accept" ya "reject"

    const booking = await bookingModel.findById(id).populate("userId providerId");
    if (!booking) return res.status(404).json({ message: "Booking not found" });

    if (action === "accept") {
      booking.status = "confirmed";
    } else if (action === "reject") {
      booking.status = "rejected";
    } else if (action === "complete") {
      booking.status = "completed";
    } else {
      return res.status(400).json({ message: "Invalid action" });
    }

    await booking.save();

    // ✅ Notify User (if connected)
    if (connectedUsers[booking.userId._id]) {
      io.to(connectedUsers[booking.userId._id]).emit("bookingUpdate", {
        bookingId: booking._id,
        status: booking.status,
      });
      console.log(`📢 User notified: Booking ${booking._id} ${booking.status}`);
    }

    res.json({ message: `Booking ${booking.status}`, booking });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// ------------------- Get Provider Bookings -------------------
app.get("/provider/:id/bookings", async (req, res) => {
  try {
    const { id } = req.params;

    const bookings = await bookingModel.find({ providerId: id })
      .populate("userId", "fullname email")  // optional user details
      .sort({ createdAt: -1 });

    res.json({ bookings });
  } catch (err) {
    // console.error("❌ Error fetching provider bookings:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// ✅ Start server
const port = process.env.PORT || 4000;
server.listen(port, () => {
  console.log(`🚀 Server running at ${port}`);
});
