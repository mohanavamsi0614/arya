import React, { useState, useMemo } from 'react';
import { Calendar, Clock, Users } from 'lucide-react';
import './reservation.css';
import axios from 'axios';

const Reservation = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    table: '',
    date: '',
    startTime: '',
    endTime: ''
  });
  const [loading, setLoading] = useState(false);
  const [responseMsg, setResponseMsg] = useState(null);

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
      setLoading(true);
      setResponseMsg(null);
      formData.userId=localStorage.getItem("user");
      axios.post('https://arya-server.onrender.com/api/reservation', formData)
        .then(response => {
          setLoading(false);
          setResponseMsg({
            type: 'success',
            text: `Reservation confirmed for ${formData.date} from ${formatTime(formData.startTime)} to ${formatTime(formData.endTime)}.`
          });
        })
        .catch(error => {
          setLoading(false);
          setResponseMsg({
            type: 'error',
            text: 'Error making reservation. Please try again.'
          });
        });
    }
  };
  const formatTime = (time) => {
    const [hour, minute] = time.split(':');
    const hourInt = parseInt(hour);
    const ampm = hourInt >= 12 ? 'pm' : 'am';
    const displayHour = hourInt > 12 ? hourInt - 12 : hourInt === 0 ? 12 : hourInt;
    return `${displayHour}:${minute}${ampm}`;
  };

  const tables = [
    { id: 1, label: "Table 1 (2-4 guests)" },
    { id: 2, label: "Table 2 (2-4 guests)" },
    { id: 3, label: "Table 3 (4-6 guests)" },
    { id: 4, label: "Table 4 (4-5 guests)" },
    { id: 5, label: "Table 5 (2-4 guests)" },
    { id: 6, label: "Table 6 (2-4 guests)" },
    { id: 7, label: "Table 7 (2-4 guests)" },
    { id: 8, label: "Table 8 (4 guests)" },
    { id: 9, label: "Table 9 (2 guests)" },
    { id: 10, label: "Table 10 (4 guests)" },
    { id: 11, label: "Table 11 (4 guests)" },
    { id: 12, label: "Table 12 (4 guests)" }
  ];

  return (
    <div className="screen">
      <div className="container">
        <div className="reservation-header">
            <div className="reservation-decor">
              <span className="diamond-line left">
                <span className="diamond-shape" />
                <span className="line-shape" />
              </span>
              <h1 className="reservation-title">RESERVATION</h1>
              <span className="diamond-line left">
                <span className="diamond-shape" />
                <span className="line-shape" />
              </span>
            </div>
            <p className="reservation-text">
              Select your preferred date and time for dining with us
            </p>
          </div>
        <div className="wrapper">
          {/* Modern loading spinner */}
          {loading && (
            <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', margin: '24px 0'}}>
              <div style={{
                width: '48px',
                height: '48px',
                border: '6px solid #eee',
                borderTop: '6px solid #2e7d32',
                borderRadius: '50%',
                animation: 'spin 1s linear infinite',
                marginBottom: '12px'
              }} />
              <span style={{fontWeight: '500', color: '#2e7d32'}}>Submitting reservation...</span>
              <style>{`
                @keyframes spin {
                  0% { transform: rotate(0deg); }
                  100% { transform: rotate(360deg); }
                }
              `}</style>
            </div>
          )}
          {/* Modern response message */}
          {responseMsg && (
            <div style={{
              margin: '24px 0',
              padding: '18px 24px',
              borderRadius: '10px',
              background: responseMsg.type === 'success' ? 'linear-gradient(90deg,#e6ffe6,#f6fff6)' : 'linear-gradient(90deg,#ffe6e6,#fff6f6)',
              color: responseMsg.type === 'success' ? '#2e7d32' : '#c62828',
              textAlign: 'center',
              fontWeight: '500',
              boxShadow: '0 2px 12px rgba(0,0,0,0.08)',
              border: responseMsg.type === 'success' ? '1px solid #b2dfdb' : '1px solid #ffcdd2'
            }}>
              {responseMsg.text}
            </div>
          )}
          <div className="card">
            <div className="form">
              <div className="field">
              <input 
                placeholder="Your Name" 
                className="form-input" 
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
              />
              <input 
                placeholder="Phone Number" 
                type="tel" 
                className="form-input"
                value={formData.phone}
                onChange={(e) => handleInputChange('phone', e.target.value)}
              />
              <input 
                placeholder="Email" 
                type="email" 
                className="form-input"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
              />
              {/* <div className="form-row">
                <input
                  type="number"
                  placeholder="Table No: 1-13"
                  min={1}
                  max={13}
                  className="form-input"
                />
              </div>
              <label className="label">
                <Users className="icon" />
                  Guests
              </label>
              <input
                  type="number"
                  placeholder="Guests 1-13"
                  min={1}
                  max={13}
                  className="form-input"
                /> */}

                <label className="label">
                  <Users className="icon" />
                  Table and Guests
                </label>
                <select
                  className="select"
                  value={formData.table}
                  onChange={(e) => handleInputChange('table', e.target.value)}
                >
                  <option value="" className="option">Choose your table</option>
                  {tables.map(table => (
                    <option key={table.id} value={table.id} className="option">
                      {table.label}
                    </option>
                  ))}
                </select>
                 {/* Note for large groups */}
    <p className="note">
      Note: For groups larger than 6 guests, we kindly request that you contact our staff directly. Our team will be happy to assist you in arranging a comfortable and seamless dining experience.
    </p>
              <label className="label">
                <Calendar className="icon" />
                Select Date
              </label>
              <div className="inputwrapper">
                <input
                  type="date"
                  className="form-input"
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
                      <Clock className="icon" />
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
                      <Clock className="icon" />
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

              {formData.date && formData.startTime && formData.endTime && !loading && (
                <button
                  className="form-button"
                  onClick={handleSubmit}
                  onMouseOver={(e) => (e.target.style.opacity = "0.9")}
                  onMouseOut={(e) => (e.target.style.opacity = "1")}
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
    </div>
  );
};

export default Reservation;