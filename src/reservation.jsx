// import { AiOutlineHome } from 'react-icons/ai';

// function Reservation() {
//   return (
//     <div style={{ height: '100vh', position: 'relative' }}>
//       {/* Home Icon - Top Left */}
//       <div
//         style={{
//           position: 'absolute',
//           top: '20px',
//           left: '20px',
//           cursor: 'pointer',
//         }}
//         onClick={() => (window.location.href = '/')}
//         title="Go Home"
//       >
//         <AiOutlineHome size={32} />
//       </div>

//       {/* Centered Text */}
//       <div
//         style={{
//           height: '100%',
//           display: 'flex',
//           justifyContent: 'center',
//           alignItems: 'center',
//         }}
//       >
//         <h1>
//           To book a table, please contact aryarestaurant6@gmail.com or call +44
//           7955 965365
//         </h1>
//       </div>
//     </div>
//   );
// }

// export default Reservation;

import React, { useState, useMemo } from 'react';
import { Calendar, Clock } from 'lucide-react';

const Reservation = () => {
  const [formData, setFormData] = useState({
    date: '',
    startTime: '',
    endTime: ''
  });

  const workingHours = {
    1: [], // Monday
    2: null, // Tuesday: Closed
    3: [], // Wednesday
    4: [], // Thursday
    5: [], // Friday
    6: [], // Saturday
    0: [] // Sunday
  };

  const generateTimeSlots = (startHour, startMin, endHour, endMin) => {
    const slots = [];
    let currentHour = startHour;
    let currentMin = startMin;

    while (currentHour < endHour || (currentHour === endHour && currentMin <= endMin)) {
      const timeString = `${currentHour.toString().padStart(2, '0')}:${currentMin.toString().padStart(2, '0')}`;
      slots.push(timeString);
      
      currentMin += 30;
      if (currentMin >= 60) {
        currentMin = 0;
        currentHour++;
      }
      
      if (currentHour === endHour && currentMin > endMin) {
        break;
      }
    }
    return slots;
  };

  workingHours[1] = generateTimeSlots(17, 0, 22, 0);
  workingHours[3] = generateTimeSlots(17, 0, 22, 0);
  workingHours[4] = generateTimeSlots(17, 0, 22, 0);
  workingHours[5] = generateTimeSlots(17, 0, 22, 0);
  workingHours[6] = [
    ...generateTimeSlots(12, 0, 14, 30),
    ...generateTimeSlots(17, 0, 22, 10)
  ];
  workingHours[0] = [
    ...generateTimeSlots(12, 0, 14, 30),
    ...generateTimeSlots(17, 0, 20, 30)
  ];

  const availableTimes = useMemo(() => {
    if (!formData.date) return [];
    const selectedDate = new Date(formData.date);
    const dayOfWeek = selectedDate.getDay();
    return workingHours[dayOfWeek] || [];
  }, [formData.date]);

  const availableEndTimes = useMemo(() => {
    if (!formData.startTime || !availableTimes.length) return [];
    
    const startIndex = availableTimes.indexOf(formData.startTime);
    if (startIndex === -1) return [];
    
    return availableTimes.slice(startIndex + 1);
  }, [formData.startTime, availableTimes]);

  const getDayName = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    return days[date.getDay()];
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => {
      const newData = { ...prev, [field]: value };
      
      if (field === 'date') {
        newData.startTime = '';
        newData.endTime = '';
      }
      
      if (field === 'startTime') {
        newData.endTime = '';
      }
      
      return newData;
    });
  };

  const isTuesday = (dateString) => {
    if (!dateString) return false;
    const date = new Date(dateString);
    return date.getDay() === 2;
  };

  const getMinDate = () => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  };

  const handleSubmit = () => {
    if (formData.date && formData.startTime && formData.endTime) {
      alert(`Reservation confirmed for ${formData.date} from ${formatTime(formData.startTime)} to ${formatTime(formData.endTime)}`);
    }
  };

  const formatTime = (time) => {
    const [hour, minute] = time.split(':');
    const hourInt = parseInt(hour);
    const ampm = hourInt >= 12 ? 'pm' : 'am';
    const displayHour = hourInt > 12 ? hourInt - 12 : hourInt === 0 ? 12 : hourInt;
    return `${displayHour}:${minute}${ampm}`;
  };

  return (
    <div className="screen">
      <div className="container">
        <div className="header">
          <h1 className="title">
            Reserve Your Table
          </h1>
          <p className="subtitle">
            Select your preferred date and time for dining with us
          </p>
        </div>

        <div className="wrapper">
          {formData.date && (
            <div className="dateinfo">
              <h3 className="dayname">
                {getDayName(formData.date)} - {new Date(formData.date).toLocaleDateString('en-US', { 
                  weekday: 'long', 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </h3>
              <p className="dayhours">
                {isTuesday(formData.date) ? 
                  "Sorry, we're closed on Tuesdays" : 
                  "Reservation available for selected date"
                }
              </p>
            </div>
          )}

          <div className="card">
            <div className="form">
              <div className="field">
                <label className="label">
                  <Calendar className="icon" />
                  Select Date
                </label>
                <div className="inputwrapper">
                  <input
                    type="date"
                    className="input"
                    value={formData.date}
                    min={getMinDate()}
                    onChange={(e) => {
                      if (!isTuesday(e.target.value)) {
                        handleInputChange('date', e.target.value);
                      } else {
                        alert('Sorry, we are closed on Tuesdays. Please select another date.');
                      }
                    }}
                  />
                </div>
                {formData.date && isTuesday(formData.date) && (
                  <p className="error">We are closed on Tuesdays</p>
                )}
              </div>

              {formData.date && !isTuesday(formData.date) && availableTimes.length > 0 && (
                <div className="timegrid">
                  <div className="timefield">
                    <label className="label">
                      <Clock className="icongreen" />
                      Start Time
                    </label>
                    <select
                      className="select"
                      value={formData.startTime}
                      onChange={(e) => handleInputChange('startTime', e.target.value)}
                    >
                      <option value="" className="option">Choose start time</option>
                      {availableTimes.map(time => (
                        <option key={time} value={time} className="option">
                          {formatTime(time)}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="timefield">
                    <label className="label">
                      <Clock className="iconpurple" />
                      End Time
                    </label>
                    <select
                      className="select"
                      value={formData.endTime}
                      onChange={(e) => handleInputChange('endTime', e.target.value)}
                      disabled={!formData.startTime}
                    >
                      <option value="" className="option">Choose end time</option>
                      {availableEndTimes.map(time => (
                        <option key={time} value={time} className="option">
                          {formatTime(time)}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              )}

              {formData.date && formData.startTime && formData.endTime && (
                <button
                  onClick={handleSubmit}
                  className="button"
                >
                  Confirm Reservation
                </button>
              )}

              {formData.date && formData.startTime && formData.endTime && (
                <div className="summary">
                  <h3 className="summarytitle">Reservation Summary</h3>
                  <div className="summarydetails">
                    <p><strong>Date:</strong> {new Date(formData.date).toLocaleDateString('en-US', { 
                      weekday: 'long', 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric' 
                    })}</p>
                    <p><strong>Time:</strong> {formatTime(formData.startTime)} - {formatTime(formData.endTime)}</p>
                    <p><strong>Duration:</strong> {((parseInt(formData.endTime.split(':')[0]) * 60 + parseInt(formData.endTime.split(':')[1])) - (parseInt(formData.startTime.split(':')[0]) * 60 + parseInt(formData.startTime.split(':')[1]))) / 60} hours</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .screen {
          min-height: 100vh;
          background: #000000;
          color: #EFE7D2;
          padding: 2rem 1rem;
        }
        
        .container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 1rem;
        }
        
        .header {
          text-align: center;
          margin-bottom: 3rem;
        }
        
        .title {
          font-size: 3rem;
          font-weight: bold;
          color: #EFE7D2;
          margin-bottom: 1rem;
        }
        
        .subtitle {
          color: #EFE7D2;
          font-size: 1.25rem;
          opacity: 0.8;
          max-width: 600px;
          margin: 0 auto;
        }
        
        .wrapper {
          max-width: 800px;
          margin: 0 auto;
          display: flex;
          flex-direction: column;
          gap: 2rem;
        }
        
        .dateinfo {
          background: rgba(239, 231, 210, 0.1);
          border-radius: 1rem;
          padding: 1.5rem;
          border: 1px solid rgba(239, 231, 210, 0.2);
        }
        
        .dayname {
          font-size: 1.25rem;
          font-weight: bold;
          color: #EFE7D2;
          margin-bottom: 0.75rem;
        }
        
        .dayhours {
          color: #EFE7D2;
          opacity: 0.8;
        }
        
        .card {
          background: rgba(239, 231, 210, 0.05);
          border-radius: 1.5rem;
          padding: 2rem;
          border: 1px solid rgba(239, 231, 210, 0.1);
        }
        
        .form {
          display: flex;
          flex-direction: column;
          gap: 2rem;
        }
        
        .field {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }
        
        .label {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          font-size: 1.25rem;
          font-weight: 600;
          color: #EFE7D2;
        }
        
        .icon {
          width: 1.5rem;
          height: 1.5rem;
          color: #EFE7D2;
        }
        
        .icongreen {
          width: 1.5rem;
          height: 1.5rem;
          color: #10b981;
        }
        
        .iconpurple {
          width: 1.5rem;
          height: 1.5rem;
          color: #8b5cf6;
        }
        
        .inputwrapper {
          position: relative;
        }
        
        .input {
          width: 100%;
          padding: 1rem 1.5rem;
          font-size: 1.125rem;
          background: rgba(239, 231, 210, 0.1);
          border: 1px solid rgba(239, 231, 210, 0.3);
          border-radius: 1rem;
          color: #EFE7D2;
          outline: none;
          transition: all 0.3s ease;
        }
        
        .input:focus {
          border-color: #EFE7D2;
          background: rgba(239, 231, 210, 0.15);
        }
        
        .select {
          width: 100%;
          padding: 1rem 1.5rem;
          font-size: 1.125rem;
          background: rgba(239, 231, 210, 0.1);
          border: 1px solid rgba(239, 231, 210, 0.3);
          border-radius: 1rem;
          color: #EFE7D2;
          outline: none;
          cursor: pointer;
          transition: all 0.3s ease;
        }
        
        .select:focus {
          border-color: #EFE7D2;
          background: rgba(239, 231, 210, 0.15);
        }
        
        .select:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }
        
        .option {
          background: #000000;
          color: #EFE7D2;
          padding: 0.5rem;
        }
        
        .timegrid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1.5rem;
        }
        
        .timefield {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }
        
        .button {
          width: 100%;
          background: linear-gradient(135deg, #EFE7D2, #d4c5a0);
          color: #000000;
          font-weight: bold;
          padding: 1rem 2rem;
          font-size: 1.125rem;
          border-radius: 1rem;
          border: none;
          cursor: pointer;
          transition: all 0.3s ease;
          transform: scale(1);
        }
        
        .button:hover {
          transform: scale(1.02);
          background: linear-gradient(135deg, #d4c5a0, #EFE7D2);
        }
        
        .summary {
          background: rgba(16, 185, 129, 0.1);
          border: 1px solid rgba(16, 185, 129, 0.2);
          border-radius: 1rem;
          padding: 1.5rem;
        }
        
        .summarytitle {
          font-size: 1.125rem;
          font-weight: bold;
          color: #10b981;
          margin-bottom: 0.75rem;
        }
        
        .summarydetails {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
          color: #EFE7D2;
        }
        
        .error {
          color: #ef4444;
          font-size: 0.875rem;
          font-weight: 500;
        }
        
        input[type="date"]::-webkit-calendar-picker-indicator {
          filter: invert(0.9);
          cursor: pointer;
        }
        
        @media (max-width: 768px) {
          .screen {
            padding: 1rem;
          }
          
          .title {
            font-size: 2rem;
          }
          
          .subtitle {
            font-size: 1rem;
          }
          
          .card {
            padding: 1.5rem;
          }
          
          .timegrid {
            grid-template-columns: 1fr;
            gap: 1rem;
          }
        }
        
        @media (max-width: 480px) {
          .container {
            padding: 0 0.5rem;
          }
          
          .title {
            font-size: 1.75rem;
          }
          
          .card {
            padding: 1rem;
          }
        }
      `}</style>
    </div>
  );
};

export default Reservation;