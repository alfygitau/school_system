import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateBookingDto } from 'src/dtos/CreateBooking.dto';
import { CreateHostelDto } from 'src/dtos/CreateHostel.dto';
import { CreateMaintenanceDto } from 'src/dtos/CreateMaintenance.dto';
import { CreateRoomDto } from 'src/dtos/CreateRoom.dto';
import { UpdateBookingDto } from 'src/dtos/UpdateBooking.dto';
import { UpdateHostelDto } from 'src/dtos/UpdateHostel.dto';
import { UpdateMaintenanceDto } from 'src/dtos/UpdateMaintenance.dto';
import { UpdateRoomDto } from 'src/dtos/UpdateRoom';
import { Booking } from 'src/entity/Booking';
import { Hostel } from 'src/entity/Hostel';
import { MaintenanceRequest } from 'src/entity/Maintenance';
import { Room } from 'src/entity/Room';
import { LessThanOrEqual, MoreThanOrEqual, Repository } from 'typeorm';

@Injectable()
export class AccomodationService {
  constructor(
    @InjectRepository(Hostel)
    private readonly hostelRepository: Repository<Hostel>,
    @InjectRepository(Room)
    private readonly roomRepository: Repository<Room>,
    @InjectRepository(Booking)
    private readonly bookingRepository: Repository<Booking>,
    @InjectRepository(MaintenanceRequest)
    private maintenanceRepository: Repository<MaintenanceRequest>,
  ) {}

  async create(createHostelDto: CreateHostelDto): Promise<Hostel> {
    const hostel = this.hostelRepository.create({
      ...createHostelDto,
      availableRooms: createHostelDto.totalRooms,
    });

    return this.hostelRepository.save(hostel);
  }

  async findAll(): Promise<Hostel[]> {
    return this.hostelRepository.find({ relations: ['rooms'] });
  }

  async findOne(id: string): Promise<Hostel> {
    const hostel = await this.hostelRepository.findOne({
      where: { id },
      relations: ['rooms'],
    });

    if (!hostel) {
      throw new NotFoundException('Hostel not found');
    }

    return hostel;
  }

  async update(id: string, updateHostelDto: UpdateHostelDto): Promise<Hostel> {
    const hostel = await this.findOne(id);
    if (!hostel) {
      throw new NotFoundException('Hostel not found');
    }

    Object.assign(hostel, updateHostelDto);
    return this.hostelRepository.save(hostel);
  }

  async remove(id: string) {
    const hostel = await this.findOne(id);
    if (!hostel) {
      throw new NotFoundException('Hostel not found');
    }

    await this.hostelRepository.delete(id);
    return { message: 'Hostel deleted successfully' };
  }

  //   room routes
  async createRoom(createRoomDto: CreateRoomDto): Promise<Room> {
    const { hostelId, roomNumber, price, type, isAvailable } = createRoomDto;
    const hostel = await this.hostelRepository.findOne({
      where: { id: hostelId },
    });
    if (!hostel) {
      throw new NotFoundException('Hostel not found');
    }
    const room = this.roomRepository.create({
      roomNumber,
      price,
      type,
      isAvailable,
      hostel,
    });
    return this.roomRepository.save(room);
  }

  async getAllRooms(): Promise<Room[]> {
    return this.roomRepository.find({ relations: ['hostel'] });
  }

  async getRoomById(id: string): Promise<Room> {
    const room = await this.roomRepository.findOne({
      where: { id },
      relations: ['hostel', 'bookings'],
    });
    if (!room) throw new NotFoundException('Room not found');
    return room;
  }

  async updateRoom(id: string, updateRoomDto: UpdateRoomDto): Promise<Room> {
    await this.roomRepository.update(id, updateRoomDto);
    return this.getRoomById(id);
  }

  async deleteRoom(id: string) {
    const result = await this.roomRepository.delete(id);
    if (result.affected === 0) throw new NotFoundException('Room not found');
    return { message: 'Room deleted successfully' };
  }

  // Create a new booking
  async createBooking(dto: CreateBookingDto): Promise<Booking> {
    const { studentId, roomId, startDate, endDate } = dto;

    const room = await this.roomRepository.findOne({
      where: { id: roomId, isAvailable: true },
      relations: ['bookings'],
    });

    if (!room) {
      throw new NotFoundException('Room not found or unavailable');
    }

    // Ensure no active booking overlaps the requested dates
    const existingBooking = await this.bookingRepository.findOne({
      where: {
        room,
        status: 'active',
        startDate: LessThanOrEqual(endDate),
        endDate: MoreThanOrEqual(startDate),
      },
    });

    if (existingBooking) {
      throw new BadRequestException('Room is already booked for this period');
    }

    // Fix: Explicitly set roomId
    const booking = this.bookingRepository.create({
      studentId,
      room,
      startDate,
      endDate,
      status: 'active',
    });

    await this.bookingRepository.save(booking);

    // Update room availability after successful booking
    room.isAvailable = false;
    await this.roomRepository.save(room);

    return booking;
  }

  // Get all bookings
  async findAllBookings(): Promise<Booking[]> {
    return this.bookingRepository.find({ relations: ['room'] });
  }

  // Get booking by ID
  async findOneBooking(id: string): Promise<Booking> {
    const booking = await this.bookingRepository.findOne({
      where: { id },
      relations: ['room'],
    });

    if (!booking) {
      throw new NotFoundException('Booking not found');
    }
    return booking;
  }

  // Update a booking
  async updateBooking(id: string, dto: UpdateBookingDto): Promise<Booking> {
    const booking = await this.findOne(id);

    Object.assign(booking, dto);

    return this.bookingRepository.save(booking);
  }

  // Delete a booking
  async deleteBooking(id: string) {
    const result = await this.bookingRepository.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException('Booking not found');
    }
    return {
      message: 'Booking deleted successfully',
    };
  }

  // 📌 Create a maintenance request
  async createMaintenanceRequest(
    dto: CreateMaintenanceDto,
  ): Promise<MaintenanceRequest> {
    const room = await this.roomRepository.findOne({
      where: { id: dto.roomId },
    });
    if (!room) {
      throw new NotFoundException('Room not found');
    }

    const request = this.maintenanceRepository.create({
      studentId: dto.studentId,
      room,
      issueDescription: dto.issueDescription,
      status: 'pending',
    });

    return this.maintenanceRepository.save(request);
  }

  // 📌 Get all maintenance requests
  async findAllMaintenanceRequests(): Promise<MaintenanceRequest[]> {
    return this.maintenanceRepository.find();
  }

  // 📌 Get a single maintenance request
  async findOneMaintenanceRequest(id: string): Promise<MaintenanceRequest> {
    const request = await this.maintenanceRepository.findOne({ where: { id } });
    if (!request) {
      throw new NotFoundException('Maintenance request not found');
    }
    return request;
  }

  // 📌 Update a maintenance request
  async updateMaintenanceRequest(
    id: string,
    dto: UpdateMaintenanceDto,
  ): Promise<MaintenanceRequest> {
    const request = await this.findOne(id);
    Object.assign(request, dto);
    return this.maintenanceRepository.save(request);
  }

  // 📌 Delete a maintenance request
  async deleteMaintenanceRequest(id: string): Promise<void> {
    const result = await this.maintenanceRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException('Maintenance request not found');
    }
  }
}
