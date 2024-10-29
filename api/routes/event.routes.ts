import { Router } from "express";
import EventService from "@/services/event.services";

const router = Router();
const eventService = new EventService();

// Create a new event entry
router.post("/", async (req, res) => {
  try {
    const event = await eventService.createEvent(req.body);
    res.status(201).json(event);
  } catch (error: any) {
    res.status(500).json({ message: "Failed to create event", error: error.message });
  }
});

// Get all events
router.get("/", async (req, res) => {
  try {
    const eventList = await eventService.getAllEvents();
    res.json(eventList);
  } catch (error: any) {
    res.status(500).json({ message: "Failed to retrieve events", error: error.message });
  }
});

// Get event by ID
router.get("/:id", async (req, res) => {
  try {
    const eventId = req.params.id;
    const event = await eventService.getEventById(eventId);
    if (!event) {
      res.status(404).json({ message: "Event not found" });
    } else {
      res.json(event);
    }
  } catch (error: any) {
    res.status(500).json({ message: "Failed to retrieve event", error: error.message });
  }
});

router.get("/month/:month", async (req, res) => {

});

router.get("/month/:month/:year", async (req, res) => {
  try {
    const month = parseInt(req.params.month, 10);  // Convert the month param to an integer
    const year = parseInt(req.params.year, 10);    // Convert the year param to an integer

    // Fetch events by month and year
    const events = await eventService.getEventsByMonthAndYear(month, year);

    res.json(events);
  } catch (error: any) {
    // Handle any errors during the fetching of events
    res.status(500).json({ message: "Failed to retrieve events by month and year", error: error.message });
  }
});


// Update event by ID
router.put("/:id", async (req, res) => {
  try {
    const eventId = req.params.id;
    const updatedEvent = await eventService.updateEvent(eventId, req.body);
    if (!updatedEvent) {
      res.status(404).json({ message: "Event not found" });
    } else {
      res.json(updatedEvent);
    }
  } catch (error: any) {
    res.status(500).json({ message: "Failed to update event", error: error.message });
  }
});

// Delete event by ID
router.delete("/:id", async (req, res) => {
  try {
    const eventId = req.params.id;
    const success = await eventService.deleteEvent(eventId);
    if (success) {
      res.status(200).json({ message: "Event deleted successfully" });
    } else {
      res.status(404).json({ message: "Event not found" });
    }
  } catch (error: any) {
    res.status(500).json({ message: "Failed to delete event", error: error.message });
  }
});

export default router;
