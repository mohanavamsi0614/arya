import axios from 'axios';
import React, { useEffect, useState } from 'react';

const OwnerDashboard = () => {
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [activeView, setActiveView] = useState('list');
  
  const tableCapacity = {
    1: { min: 1, max: 4 },
    2: { min: 1, max: 4 },
    3: { min: 1, max: 6 },
    4: { min: 1, max: 5 },
    5: { min: 1, max: 4 },
    6: { min: 1, max: 4 },
    7: { min: 1, max: 4 },
    8: { min: 1, max: 4 },
    9: { min: 1, max: 2 },
    10: { min: 1, max: 4 },
    11: { min: 1, max: 4 },
    12: { min: 1, max: 4 }
  };

  const isValidCapacity = (tableNumber, guestCount) => {
    const capacity = tableCapacity[tableNumber];
    if (!capacity) return false;
    return guestCount >= capacity.min && guestCount <= capacity.max;
  };

  const [reservations, setReservations] = useState([]);

  const todaysReservations = reservations.filter(
    reservation => reservation.reservationDate === selectedDate
  );

  useEffect(() => {
    axios.get(`https://arya-server.onrender.com/api/reservations/${selectedDate}`)
      .then(response => {
        const mapped = response.data.map(r => ({
          id: r._id,
          name: r.name,
          email: r.email,
          mobile: r.phone,
          tableNumber: r.table,
          reservationDate: r.date || r.reservationDate,
          reservationTime: r.startTime,
          endTime: r.endTime,
          status: r.status || 'pending',
          guests: r.guests || '',
          duration: r.duration || 1,
        }));
        setReservations(mapped);
      })
      .catch(error => {
        console.error('Error fetching reservations:', error);
      });
  }, [selectedDate]);

  const totalReservations = todaysReservations.length;
  const pendingReservations = todaysReservations.filter(r => r.status === 'pending').length;
  const occupiedReservations = todaysReservations.filter(r => r.status === 'accepted').length;
  const totalTables = 12;
  const availableTables = totalTables - occupiedReservations;

  const handleStatusChange = async (id, newStatus) => {
    console.log("Changing status for reservation:", id, "to", newStatus);
    await axios.post("https://arya-server.onrender.com/api/reservations/"+id, { status: newStatus });
    setReservations(prevReservations =>
      prevReservations.map(reservation =>
        reservation.id === id
          ? { ...reservation, status: newStatus }
          : reservation
      )
    );
  };

  const calculateEndTime = (startTime, durationHours) => {
    const [hours, minutes] = startTime.split(':').map(Number);
    const startMinutes = hours * 60 + minutes;
    const endMinutes = startMinutes + (durationHours * 60);
    const endHours = Math.floor(endMinutes / 60);
    const endMins = endMinutes % 60;
    return `${endHours}:${endMins.toString().padStart(2, '0')}`;
  };

  const generateTimeSlots = () => {
    const slots = [];
    for (let hour = 12; hour <= 23; hour++) {
      slots.push(`${hour}:00`);
      if (hour < 23) {
        slots.push(`${hour}:30`);
      }
    }
    return slots;
  };

  const isReservationActiveAtTime = (reservation, timeSlot) => {
  if (reservation.status !== 'accepted') return false;

  const timeToMinutes = (timeStr) => {
    const [hours, minutes] = timeStr.split(':').map(Number);
    return hours * 60 + minutes;
  };

  const slotMinutes = timeToMinutes(timeSlot);
  const startMinutes = timeToMinutes(reservation.reservationTime);

  // Prefer backend-provided endTime
  let endMinutes;
  if (reservation.endTime) {
    endMinutes = timeToMinutes(reservation.endTime);
  } else {
    endMinutes = startMinutes + (reservation.duration || 2) * 60;
  }

  return slotMinutes >= startMinutes && slotMinutes < endMinutes;
};


  // Get reservation for specific time and table
  const getReservationAtTime = (time, tableNumber) => {
    return todaysReservations.find(
      reservation => 
        reservation.tableNumber == tableNumber &&
        isReservationActiveAtTime(reservation, time)
    );
  };

  const ReservationList = () => (
    <div className="reservation-list">
      <h3>Today's Reservations - {selectedDate}</h3>
      {todaysReservations.length === 0 ? (
        <div className="no-reservations">
          <p>No reservations for this date</p>
        </div>
      ) : (
        <div className="reservations-table">
          <div className="table-header">
            <div>Time</div>
            <div>Name</div>
            <div>Contact</div>
            <div>Table</div>
            <div>Guests</div>
            <div>Status</div>
            <div>Actions</div>
          </div>
          {todaysReservations
            .sort((a, b) => a.reservationTime.localeCompare(b.reservationTime))
            .map(reservation => {
              const validCapacity = isValidCapacity(reservation.tableNumber, reservation.guests);
              const capacity = tableCapacity[reservation.tableNumber];

              return (
                <div key={reservation._id} className="table-row">
                  <div className="time-cell">
 {reservation.reservationTime} - {reservation.endTime 
    ? reservation.endTime 
    : calculateEndTime(reservation.reservationTime, reservation.duration)}                  </div>
                  <div className="name-cell">
                    <strong>{reservation.name}</strong>
                    <small>{reservation.email}</small>
                  </div>
                  <div className="contact-cell">{reservation.mobile}</div>
                  <div className="table-cell">
                    Table {reservation.tableNumber}
                    <small className="capacity-info">({capacity?.min}-{capacity?.max} persons)</small>
                  </div>
                  <div className={`guests-cell ${!validCapacity ? 'capacity-exceeded' : ''}`}>
                    {reservation.guests}
                    {!validCapacity && <span className="capacity-warning">⚠️</span>}
                  </div>
                  <div className="status-cell">
                    <span className={`status-badge ${reservation.status}`}>
                      {reservation.status === 'pending' && '🟡 Pending'}
                      {reservation.status === 'accepted' && '🔴 Occupied'}
                      {reservation.status === 'cancelled' && '❌ Cancelled'}
                    </span>
                  </div>
                  <div className="actions-cell">
                    {reservation.status === 'pending' && (
                      <>
                        <button 
                          className="accept-btn"
                          onClick={() => handleStatusChange(reservation.id, 'accepted')}
                        >
                          Accept
                        </button>
                        <button 
                          className="cancel-btn"
                          onClick={() => handleStatusChange(reservation.id, 'cancelled')}
                        >
                          Cancel
                        </button>
                      </>
                    )}
                    {reservation.status === 'accepted' && (
                      <button 
                        className="cancel-btn"
                        onClick={() => handleStatusChange(reservation.id, 'cancelled')}
                      >
                        Cancel
                      </button>
                    )}
                    {reservation.status === 'cancelled' && (
                      <span className="cancelled-text">Cancelled</span>
                    )}
                  </div>
                </div>
              );
            })}
        </div>
      )}
    </div>
  );

  const TimelineView = () => {
    const timeSlots = generateTimeSlots();
    
    return (
      <div className="timeline-view">
        <h3>Timeline View - {selectedDate}</h3>
        
        <div className="timeline-container">
          <div className="timeline-header">
            <div className="time-column">Time</div>
            {[...Array(13)].map((_, i) => (
              <div key={i} className="table-column">T{i + 1}</div>
            ))}
          </div>
          
          <div className="timeline-body">
            {timeSlots.map(time => (
              <div key={time} className="timeline-row">
                <div className="time-slot">{time}</div>
                {[...Array(13)].map((_, tableIndex) => {
                  const tableNumber = tableIndex + 1;
                  console.log(tableNumber)
                  const reservation = getReservationAtTime(time, tableNumber);
                  
                  return (
                    <div 
                      key={tableIndex} 
                      className={`table-slot ${reservation ? 'occupied' : 'available'}`}
                    >
                      {reservation && (
                        <div className="reservation-info">
                          <div className="guest-name">{reservation.name}</div>
                          <div className="guest-time"> {reservation.reservationTime} - {reservation.endTime 
    ? reservation.endTime 
    : calculateEndTime(reservation.reservationTime, reservation.duration)}</div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  const CalendarPicker = () => (
    <div className="calendar-picker">
      <label htmlFor="date-picker">Select Date:</label>
      <input
        id="date-picker"
        type="date"
        value={selectedDate}
        onChange={(e) => setSelectedDate(e.target.value)}
        className="date-input"
      />
    </div>
  );

  return (
    <div className="owner-dashboard">
      <style>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        body {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
          color: #EFE7D2;
        }

        .owner-dashboard {
          max-width: 1400px;
          margin: 0 auto;
          padding: 20px;
          min-height: 100vh;
        }

        .dashboard-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          color: #EFE7D2;
          padding: 20px 30px;
          border-radius: 8px;
          margin-bottom: 20px;
          border: 1px solid #404040;
        }

        .dashboard-header h1 {
          font-size: 24px;
          font-weight: 600;
          color: #EFE7D2;
        }

        .calendar-picker {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .calendar-picker label {
          font-weight: 500;
          color: #EFE7D2;
        }

        .date-input {
          padding: 8px 12px;
          border: 1px solid #404040;
          border-radius: 4px;
          font-size: 14px;
          background: #404040;
          color: #EFE7D2;
        }

        .date-input:focus {
          outline: none;
          border-color: #666666;
        }

        .stats-container {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 20px;
          margin-bottom: 20px;
        }

        .stat-card {
          background: #2d2d2d;
          color: #EFE7D2;
          padding: 20px;
          border-radius: 8px;
          text-align: center;
          border: 1px solid #404040;
        }

        .stat-card h3 {
          font-size: 14px;
          margin-bottom: 8px;
          opacity: 0.8;
          color: #EFE7D2;
        }

        .stat-number {
          font-size: 32px;
          font-weight: bold;
          color: #EFE7D2;
        }

        .view-controls {
          display: flex;
          gap: 10px;
          margin-bottom: 20px;
        }

        .view-btn {
          padding: 10px 20px;
          border: 1px solid #404040;
          border-radius: 4px;
          cursor: pointer;
          font-weight: 500;
          background: #404040;
          color: #EFE7D2;
          transition: all 0.3s ease;
        }

        .view-btn.active {
          background: #555555;
          color: #EFE7D2;
          border-color: #666666;
        }

        .view-btn:hover {
          background: #555555;
          border-color: #666666;
        }

        .main-content {
          background: #2d2d2d;
          border-radius: 8px;
          padding: 20px;
          border: 1px solid #404040;
        }

        .reservation-list h3 {
          color: #EFE7D2;
          margin-bottom: 20px;
          font-size: 18px;
        }

        .no-reservations {
          text-align: center;
          padding: 40px;
          color: #EFE7D2;
          opacity: 0.6;
        }

        .reservations-table {
          display: flex;
          flex-direction: column;
          gap: 2px;
        }

        .table-header {
          display: grid;
          grid-template-columns: 140px 200px 150px 100px 80px 100px 160px;
          gap: 10px;
          padding: 15px 10px;
          background: #404040;
          font-weight: 600;
          color: #EFE7D2;
          border-radius: 4px;
        }

        .table-row {
          display: grid;
          grid-template-columns: 140px 200px 150px 100px 80px 100px 160px;
          gap: 10px;
          padding: 15px 10px;
          border-bottom: 1px solid #404040;
          align-items: center;
          background: #353535;
        }

        .table-row:hover {
          background: #404040;
        }

        .name-cell {
          display: flex;
          flex-direction: column;
        }

        .name-cell strong {
          color: #EFE7D2;
          margin-bottom: 2px;
        }

        .name-cell small {
          color: #EFE7D2;
          opacity: 0.6;
          font-size: 12px;
        }

        .time-cell, .contact-cell {
          color: #EFE7D2;
        }

        .table-cell {
          display: flex;
          flex-direction: column;
          color: #EFE7D2;
        }

        .capacity-info {
          color: #EFE7D2;
          opacity: 0.6;
          font-size: 10px;
          margin-top: 2px;
        }

        .guests-cell {
          color: #EFE7D2;
          display: flex;
          align-items: center;
          gap: 5px;
        }

        .guests-cell.capacity-exceeded {
          color: #e74c3c;
          font-weight: bold;
        }

        .capacity-warning {
          font-size: 14px;
          color: #f39c12;
        }

        .status-badge {
          padding: 4px 8px;
          border-radius: 12px;
          font-size: 12px;
          font-weight: 500;
        }

        .status-badge.pending {
          background: #f39c12;
          color: #1a1a1a;
        }

        .status-badge.occupied {
          background: #27ae60;
          color: #1a1a1a;
        }

        .status-badge.cancelled {
          background: #e74c3c;
          color: #EFE7D2;
        }

        .actions-cell {
          display: flex;
          gap: 5px;
        }

        .accept-btn {
          background: #27ae60;
          color: #EFE7D2;
          border: none;
          padding: 6px 12px;
          border-radius: 4px;
          cursor: pointer;
          font-size: 12px;
          transition: background 0.3s ease;
        }

        .accept-btn:hover {
          background: #219a52;
        }

        .cancel-btn {
          background: #e74c3c;
          color: #EFE7D2;
          border: none;
          padding: 6px 12px;
          border-radius: 4px;
          cursor: pointer;
          font-size: 12px;
          transition: background 0.3s ease;
        }

        .cancel-btn:hover {
          background: #c0392b;
        }

        .cancelled-text {
          color: #EFE7D2;
          opacity: 0.5;
          font-style: italic;
          font-size: 12px;
        }

        .timeline-view h3 {
          color: #EFE7D2;
          margin-bottom: 20px;
          font-size: 18px;
        }

        .timeline-container {
          border: 1px solid #404040;
          border-radius: 4px;
          overflow: hidden;
        }

        .timeline-header {
          display: grid;
          grid-template-columns: 60px repeat(13, 1fr);
          background: #404040;
          color: #EFE7D2;
        }

        .time-column, .table-column {
          padding: 10px 5px;
          text-align: center;
          font-weight: 600;
          font-size: 12px;
          border-right: 1px solid #555555;
          color: #EFE7D2;
        }

        .timeline-body {
          max-height: 500px;
          overflow-y: auto;
        }

        .timeline-row {
          display: grid;
          grid-template-columns: 60px repeat(13, 1fr);
          border-bottom: 1px solid #404040;
        }

        .timeline-row:hover {
          background: #353535;
        }

        .time-slot {
          padding: 10px 5px;
          text-align: center;
          background: #353535;
          font-weight: 500;
          font-size: 12px;
          border-right: 1px solid #404040;
          color: #EFE7D2;
        }

        .table-slot {
          padding: 2px;
          border-right: 1px solid #404040;
          min-height: 40px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .table-slot.available {
          background: #2d2d2d;
        }

        .table-slot.occupied {
          background: #27ae60;
          color: #EFE7D2;
        }

        .reservation-info {
          text-align: center;
          font-size: 10px;
          line-height: 1.2;
        }

        .guest-name {
          font-weight: 600;
          margin-bottom: 1px;
          color: #EFE7D2;
        }

        .guest-time {
          opacity: 0.8;
          color: #EFE7D2;
        }

        @media (max-width: 1200px) {
          .owner-dashboard {
            padding: 15px;
          }

          .dashboard-header {
            padding: 15px 20px;
          }

          .dashboard-header h1 {
            font-size: 20px;
          }

          .table-header, .table-row {
            grid-template-columns: 120px 180px 130px 90px 70px 90px 140px;
            gap: 8px;
          }

          .timeline-header, .timeline-row {
            grid-template-columns: 60px repeat(11, 1fr);
          }
        }

        @media (max-width: 968px) {
          .owner-dashboard {
            padding: 12px;
          }

          .stats-container {
            grid-template-columns: repeat(2, 1fr);
            gap: 15px;
          }
          
          .dashboard-header {
            flex-direction: column;
            gap: 15px;
            text-align: center;
            padding: 15px;
          }

          .dashboard-header h1 {
            font-size: 18px;
          }

          .table-header, .table-row {
            grid-template-columns: 100px 160px 120px 80px 60px 80px 120px;
            gap: 6px;
            font-size: 13px;
          }

          .timeline-header, .timeline-row {
            grid-template-columns: 50px repeat(9, 1fr);
          }

          .time-column, .table-column {
            font-size: 11px;
            padding: 8px 4px;
          }

          .timeline-body {
            max-height: 400px;
          }

          .view-btn {
            padding: 8px 16px;
            font-size: 14px;
          }

          .main-content {
            padding: 15px;
          }
        }

        @media (max-width: 768px) {
          .owner-dashboard {
            padding: 8px;
          }

          .stats-container {
            grid-template-columns: repeat(2, 1fr);
            gap: 12px;
          }

          .stat-card {
            padding: 15px;
          }

          .stat-number {
            font-size: 28px;
          }

          .dashboard-header h1 {
            font-size: 16px;
          }
          
          .table-header {
            display: none;
          }

          .table-row {
            display: flex;
            flex-direction: column;
            gap: 8px;
            padding: 15px;
            border-radius: 4px;
            margin-bottom: 10px;
            background: #353535;
          }

          .time-cell, .name-cell, .contact-cell, .table-cell, .guests-cell, .status-cell {
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
            padding: 4px 0;
          }

          .time-cell::before { content: "Time: "; font-weight: 600; color: #EFE7D2; }
          .name-cell::before { content: "Customer: "; font-weight: 600; color: #EFE7D2; }
          .contact-cell::before { content: "Contact: "; font-weight: 600; color: #EFE7D2; }
          .table-cell::before { content: "Table: "; font-weight: 600; color: #EFE7D2; }
          .guests-cell::before { content: "Guests: "; font-weight: 600; color: #EFE7D2; }
          .status-cell::before { content: "Status: "; font-weight: 600; color: #EFE7D2; }

          .name-cell {
            flex-direction: column;
            align-items: flex-start;
          }

          .name-cell strong, .name-cell small {
            margin-left: auto;
          }

          .table-cell {
            flex-direction: column;
            align-items: flex-end;
          }

          .guests-cell {
            justify-content: flex-end;
          }

          .actions-cell {
            justify-content: center;
            margin-top: 10px;
            gap: 10px;
          }
          
          .timeline-header, .timeline-row {
            grid-template-columns: 45px repeat(7, 1fr);
          }

          .time-column, .table-column {
            font-size: 10px;
            padding: 6px 2px;
          }

          .timeline-body {
            max-height: 350px;
          }

          .reservation-info {
            font-size: 9px;
          }
        }

        @media (max-width: 480px) {
          .owner-dashboard {
            padding: 5px;
          }

          .stats-container {
            grid-template-columns: 1fr;
            gap: 8px;
          }

          .stat-card {
            padding: 12px;
          }

          .stat-number {
            font-size: 24px;
          }

          .dashboard-header h1 {
            font-size: 14px;
          }

          .timeline-header, .timeline-row {
            grid-template-columns: 40px repeat(5, 1fr);
          }

          .time-column, .table-column {
            font-size: 8px;
            padding: 4px 1px;
          }

          .reservation-info {
            font-size: 7px;
          }

          .view-controls {
            justify-content: center;
            gap: 8px;
          }

          .view-btn {
            padding: 6px 12px;
            font-size: 12px;
          }

          .main-content {
            padding: 8px;
          }

          .accept-btn, .cancel-btn {
            padding: 8px 12px;
            font-size: 11px;
          }
        }

        .timeline-body::-webkit-scrollbar {
          width: 6px;
        }

        .timeline-body::-webkit-scrollbar-track {
          background: #404040;
        }

        .timeline-body::-webkit-scrollbar-thumb {
          background: #666666;
          border-radius: 3px;
        }

        .timeline-body::-webkit-scrollbar-thumb:hover {
          background: #777777;
        }
      `}</style>

      <header className="dashboard-header">
        <h1>Restaurant Owner Dashboard</h1>
        <CalendarPicker />
      </header>

      <div className="stats-container">
        <div className="stat-card">
          <h3>Total</h3>
          <span className="stat-number">{totalReservations}</span>
        </div>
        <div className="stat-card">
          <h3>Pending</h3>
          <span className="stat-number">{pendingReservations}</span>
        </div>
        <div className="stat-card">
          <h3>Occupied</h3>
          <span className="stat-number">{occupiedReservations}</span>
        </div>
        <div className="stat-card">
          <h3>Available</h3>
          <span className="stat-number">{availableTables}/{totalTables}</span>
        </div>
      </div>

      <div className="view-controls">
        <button 
          className={`view-btn ${activeView === 'list' ? 'active' : ''}`}
          onClick={() => setActiveView('list')}
        >
          List
        </button>
        <button 
          className={`view-btn ${activeView === 'timeline' ? 'active' : ''}`}
          onClick={() => setActiveView('timeline')}
        >
          Timeline
        </button>
      </div>

      <div className="main-content">
        {activeView === 'list' ? <ReservationList /> : <TimelineView />}
      </div>
    </div>
  );
};

export default OwnerDashboard;