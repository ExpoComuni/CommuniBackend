import { Repository } from "typeorm";
import { Event } from "../entity/MongoDB/Event";
import MongoDataSource from "../config/MongoDataSource";

class EventService {
  private eventRepository: Repository<Event>;

  constructor() {
    this.eventRepository = MongoDataSource.getRepository(Event);
  }

  // Create a new event entry
  public async createEvent(eventData: Partial<Event>): Promise<Event> {
    const event = this.eventRepository.create(eventData);
    return await this.eventRepository.save(event);
  }

  public async getEventsByMonthAndYear(month: number, year: number): Promise<Event[]> {
    const events = await this.eventRepository.find();
  
    return events.filter(event => {
      const eventDate = new Date(event.eventdate);
      const eventMonth = eventDate.getUTCMonth() + 1; // getUTCMonth gives months from 0-11, so add 1
      const eventYear = eventDate.getUTCFullYear();
      
      // Match both month and year
      return eventMonth === month && eventYear === year;
    });
  }
  

  // Get all event entries
  public async getAllEvents(): Promise<Event[]> {
    return await this.eventRepository.find();
  }

  // Get event by ID
  public async getEventById(id: string): Promise<Event | null> {
    return await this.eventRepository.findOneBy(id as any);
  }

  // Update event by ID
  public async updateEvent(eventId: string, updateData: Partial<Event>): Promise<Event | null> {
    const event = await this.getEventById(eventId);
    if (!event) throw new Error("Event not found");
    const updatedEvent = Object.assign(event, updateData);
    return await this.eventRepository.save(updatedEvent);
  }

  // Delete event by ID
  public async deleteEvent(eventId: string): Promise<boolean> {
    const deleteResult = await this.eventRepository.delete(eventId);
    return deleteResult.affected !== 0;
  }
}

export default EventService;
