import { useEffect, useState } from 'react';

// 날씨 코드에 따른 아이콘 반환 함수
const getWeatherIcon = (weatherCode) => {
  // WMO Weather interpretation codes (WW)
  // 0: Clear sky, 1-3: Mainly clear/partly cloudy, 45-48: Foggy
  // 51-67: Drizzle/Rain, 71-77: Snow, 80-99: Rain showers/Thunderstorm
  if (weatherCode === 0) return '☀️';
  if (weatherCode >= 1 && weatherCode <= 3) return '⛅';
  if (weatherCode >= 45 && weatherCode <= 48) return '🌫️';
  if (weatherCode >= 51 && weatherCode <= 67) return '🌧️';
  if (weatherCode >= 71 && weatherCode <= 77) return '❄️';
  if (weatherCode >= 80 && weatherCode <= 99) return '⛈️';
  return '☀️';
};

const getWeatherText = (weatherCode) => {
  if (weatherCode === 0) return 'Clear';
  if (weatherCode >= 1 && weatherCode <= 3) return 'Partly Cloudy';
  if (weatherCode >= 45 && weatherCode <= 48) return 'Foggy';
  if (weatherCode >= 51 && weatherCode <= 67) return 'Rain';
  if (weatherCode >= 71 && weatherCode <= 77) return 'Snow';
  if (weatherCode >= 80 && weatherCode <= 99) return 'Rain';
  return 'Clear';
};

const CITY_DISTRICTS = {
  '서울': [
    { name: '종로구', latitude: 37.5735, longitude: 126.9788 },
    { name: '중구', latitude: 37.5640, longitude: 126.9970 },
    { name: '용산구', latitude: 37.5326, longitude: 126.9905 },
    { name: '성동구', latitude: 37.5633, longitude: 127.0366 },
    { name: '광진구', latitude: 37.5384, longitude: 127.0826 },
    { name: '동대문구', latitude: 37.5744, longitude: 127.0396 },
    { name: '중랑구', latitude: 37.6063, longitude: 127.0926 },
    { name: '성북구', latitude: 37.5894, longitude: 127.0167 },
    { name: '강북구', latitude: 37.6398, longitude: 127.0256 },
    { name: '도봉구', latitude: 37.6688, longitude: 127.0471 },
    { name: '노원구', latitude: 37.6542, longitude: 127.0568 },
    { name: '은평구', latitude: 37.6027, longitude: 126.9291 },
    { name: '서대문구', latitude: 37.5791, longitude: 126.9368 },
    { name: '마포구', latitude: 37.5663, longitude: 126.9019 },
    { name: '양천구', latitude: 37.5170, longitude: 126.8664 },
    { name: '강서구', latitude: 37.5509, longitude: 126.8495 },
    { name: '구로구', latitude: 37.4954, longitude: 126.8874 },
    { name: '금천구', latitude: 37.4519, longitude: 126.8959 },
    { name: '영등포구', latitude: 37.5264, longitude: 126.8962 },
    { name: '동작구', latitude: 37.5124, longitude: 126.9393 },
    { name: '관악구', latitude: 37.4784, longitude: 126.9516 },
    { name: '서초구', latitude: 37.4837, longitude: 127.0324 },
    { name: '강남구', latitude: 37.5172, longitude: 127.0473 },
    { name: '송파구', latitude: 37.5145, longitude: 127.1058 },
    { name: '강동구', latitude: 37.5301, longitude: 127.1238 },
  ],
  '부산': [
    { name: '중구', latitude: 35.1064, longitude: 129.0324 },
    { name: '서구', latitude: 35.0979, longitude: 129.0244 },
    { name: '동구', latitude: 35.1290, longitude: 129.0454 },
    { name: '영도구', latitude: 35.0912, longitude: 129.0676 },
    { name: '부산진구', latitude: 35.1629, longitude: 129.0532 },
    { name: '동래구', latitude: 35.2045, longitude: 129.0780 },
    { name: '남구', latitude: 35.1366, longitude: 129.0843 },
    { name: '북구', latitude: 35.1972, longitude: 129.0104 },
    { name: '해운대구', latitude: 35.1630, longitude: 129.1635 },
    { name: '사하구', latitude: 35.1047, longitude: 128.9749 },
    { name: '금정구', latitude: 35.2427, longitude: 129.0925 },
    { name: '강서구', latitude: 35.2124, longitude: 128.9801 },
    { name: '연제구', latitude: 35.1763, longitude: 129.0799 },
    { name: '수영구', latitude: 35.1454, longitude: 129.1130 },
    { name: '사상구', latitude: 35.1527, longitude: 128.9911 },
    { name: '기장군', latitude: 35.2444, longitude: 129.2228 },
  ],
  '대구': [
    { name: '중구', latitude: 35.8692, longitude: 128.5954 },
    { name: '동구', latitude: 35.8865, longitude: 128.6359 },
    { name: '서구', latitude: 35.8719, longitude: 128.5591 },
    { name: '남구', latitude: 35.8460, longitude: 128.5974 },
    { name: '북구', latitude: 35.8857, longitude: 128.5828 },
    { name: '수성구', latitude: 35.8581, longitude: 128.6306 },
    { name: '달서구', latitude: 35.8298, longitude: 128.5327 },
    { name: '달성군', latitude: 35.7747, longitude: 128.4306 },
  ],
  '인천': [
    { name: '중구', latitude: 37.4738, longitude: 126.6218 },
    { name: '동구', latitude: 37.4837, longitude: 126.6396 },
    { name: '미추홀구', latitude: 37.4637, longitude: 126.6500 },
    { name: '연수구', latitude: 37.4101, longitude: 126.6788 },
    { name: '남동구', latitude: 37.4479, longitude: 126.7316 },
    { name: '부평구', latitude: 37.5070, longitude: 126.7219 },
    { name: '계양구', latitude: 37.5342, longitude: 126.7370 },
    { name: '서구', latitude: 37.5437, longitude: 126.6756 },
    { name: '강화군', latitude: 37.7467, longitude: 126.4877 },
    { name: '옹진군', latitude: 37.4462, longitude: 126.6392 },
  ],
  '광주': [
    { name: '동구', latitude: 35.1460, longitude: 126.9235 },
    { name: '서구', latitude: 35.1520, longitude: 126.8880 },
    { name: '남구', latitude: 35.1336, longitude: 126.9013 },
    { name: '북구', latitude: 35.1747, longitude: 126.9109 },
    { name: '광산구', latitude: 35.1398, longitude: 126.7936 },
  ],
  '대전': [
    { name: '동구', latitude: 36.3249, longitude: 127.4346 },
    { name: '중구', latitude: 36.3256, longitude: 127.4215 },
    { name: '서구', latitude: 36.3556, longitude: 127.3845 },
    { name: '유성구', latitude: 36.3626, longitude: 127.3567 },
    { name: '대덕구', latitude: 36.3467, longitude: 127.4150 },
  ],
  '울산': [
    { name: '중구', latitude: 35.5704, longitude: 129.3327 },
    { name: '남구', latitude: 35.5432, longitude: 129.3296 },
    { name: '동구', latitude: 35.5047, longitude: 129.4167 },
    { name: '북구', latitude: 35.5827, longitude: 129.3613 },
    { name: '울주군', latitude: 35.5743, longitude: 129.2428 },
  ],
  '수원': [
    { name: '영통구', latitude: 37.2595, longitude: 127.0466 },
    { name: '팔달구', latitude: 37.2659, longitude: 127.0002 },
    { name: '장안구', latitude: 37.3036, longitude: 127.0101 },
    { name: '권선구', latitude: 37.2574, longitude: 126.9719 },
  ],
  '성남': [
    { name: '수정구', latitude: 37.4500, longitude: 127.1456 },
    { name: '중원구', latitude: 37.4300, longitude: 127.1370 },
    { name: '분당구', latitude: 37.3827, longitude: 127.1189 },
  ],
  '고양': [
    { name: '덕양구', latitude: 37.6347, longitude: 126.8328 },
    { name: '일산동구', latitude: 37.6584, longitude: 126.7762 },
    { name: '일산서구', latitude: 37.6779, longitude: 126.7450 },
  ],
};

const CITIES = Object.keys(CITY_DISTRICTS);

export default function Weather() {
  const [weather, setWeather] = useState(null);
  const [dailyForecast, setDailyForecast] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedCity, setSelectedCity] = useState(CITIES[0]);
  const [selectedDistrict, setSelectedDistrict] = useState(CITY_DISTRICTS[CITIES[0]][0]);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    setLoading(true);
    fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${selectedDistrict.latitude}&longitude=${selectedDistrict.longitude}&current_weather=true&daily=temperature_2m_max,temperature_2m_min,weather_code,sunrise,sunset&timezone=Asia%2FSeoul&forecast_days=5`
    )
      .then(res => res.json())
      .then(data => {
        setWeather(data.current_weather);
        setDailyForecast(data.daily);
        setLoading(false);
      })
      .catch(error => {
        console.error('날씨 정보를 가져오는 중 오류 발생:', error);
        setLoading(false);
      });
  }, [selectedDistrict]);

  const handleCityChange = (e) => {
    const cityName = e.target.value;
    setSelectedCity(cityName);
    // 도시 변경 시 첫 번째 구를 자동 선택
    const firstDistrict = CITY_DISTRICTS[cityName][0];
    setSelectedDistrict(firstDistrict);
  };

  const handleDistrictChange = (e) => {
    const districtName = e.target.value;
    const district = CITY_DISTRICTS[selectedCity].find(d => d.name === districtName);
    if (district) {
      setSelectedDistrict(district);
    }
  };

  const formatTime = (date) => {
    return date.toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit' });
  };

  const formatDate = (date) => {
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return `${days[date.getDay()]}, ${months[date.getMonth()]} ${date.getDate()}`;
  };

  const formatDay = (dateString) => {
    const date = new Date(dateString);
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    return days[date.getDay()];
  };

  if (loading || !weather || !dailyForecast) {
    return (
      <div style={{ 
        minHeight: '100vh', 
        background: 'linear-gradient(to bottom, #0a1929 0%, #1a1a2e 30%, #16213e 60%, #0f1419 100%)',
        color: '#fff', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        fontFamily: 'Arial, sans-serif'
      }}>
        <p>날씨 정보를 불러오는 중...</p>
      </div>
    );
  }

  const weatherIcon = getWeatherIcon(weather.weathercode);
  const weatherText = getWeatherText(weather.weathercode);
  const maxTemp = Math.round(dailyForecast.temperature_2m_max[0]);
  const minTemp = Math.round(dailyForecast.temperature_2m_min[0]);
  
  // 일출/일몰 시간 포맷팅
  const formatSunTime = (timeString) => {
    if (!timeString) return '--:--';
    const date = new Date(timeString);
    return date.toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit', hour12: false });
  };
  
  const sunrise = dailyForecast.sunrise ? formatSunTime(dailyForecast.sunrise[0]) : '05:03';
  const sunset = dailyForecast.sunset ? formatSunTime(dailyForecast.sunset[0]) : '19:20';

  return (
    <div className="weather-container" style={{
      minHeight: '100vh',
      background: 'linear-gradient(to bottom, #0a1929 0%, #1a1a2e 30%, #16213e 60%, #0f1419 100%)',
      color: '#fff',
      fontFamily: 'Arial, sans-serif',
      position: 'relative',
      padding: '40px 20px',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between'
    }}>
      {/* 상단: 첫 번째 이미지 스타일 레이아웃 */}
      <div className="weather-header" style={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '40px 60px',
        position: 'relative',
        zIndex: 1,
        minHeight: '50vh',
        gap: '20px'
      }}>
        {/* 왼쪽: 큰 날씨 아이콘 */}
        <div className="weather-icon-container" style={{ 
          display: 'flex', 
          flexDirection: 'column', 
          alignItems: 'center', 
          justifyContent: 'center',
          flex: '1',
          paddingRight: '40px',
          minWidth: '0'
        }}>
          <div className="weather-icon" style={{ 
            fontSize: '200px', 
            marginBottom: '20px',
            filter: 'drop-shadow(0 0 30px rgba(255, 200, 0, 0.5))',
            lineHeight: '1'
          }}>
            {weatherIcon}
          </div>
        </div>

        {/* 오른쪽: 날짜, 시간, 지역 정보 */}
        <div className="weather-info" style={{ 
          textAlign: 'left',
          flex: '1',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          minWidth: '0'
        }}>
          <div className="weather-date" style={{ fontSize: '24px', color: '#fff', marginBottom: '20px', fontWeight: '300' }}>
            {formatDate(currentTime)}
          </div>
          <div className="weather-time" style={{ fontSize: '96px', fontWeight: 'bold', marginBottom: '30px', lineHeight: '1', wordBreak: 'break-word' }}>
            {formatTime(currentTime)}
          </div>
          <div className="weather-location" style={{ fontSize: '32px', color: '#fff', fontWeight: '300', wordBreak: 'break-word' }}>
            {selectedCity} {selectedDistrict.name}
          </div>
          <div className="weather-temp" style={{ fontSize: '28px', color: '#fff', marginTop: '40px', fontWeight: '300' }}>
            {Math.round(weather.temperature)}°
          </div>
        </div>
      </div>

      {/* 중간: 날씨 상세 정보 */}
      <div className="weather-details" style={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '40px',
        padding: '20px 40px',
        position: 'relative',
        zIndex: 1,
        flexWrap: 'wrap'
      }}>
        <div style={{ fontSize: '20px', color: '#fff', whiteSpace: 'nowrap' }}>
          {weatherText}
        </div>
        <div style={{ display: 'flex', gap: '20px', fontSize: '18px', flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '5px', whiteSpace: 'nowrap' }}>
            <span style={{ color: '#ff4444' }}>최고</span>
            <span>{maxTemp}°</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '5px', whiteSpace: 'nowrap' }}>
            <span style={{ color: '#4444ff' }}>최저</span>
            <span>{minTemp}°</span>
          </div>
        </div>
        <div style={{ display: 'flex', gap: '20px', fontSize: '16px', color: '#aaa', flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '5px', whiteSpace: 'nowrap' }}>
            <span>일출</span>
            <span>{sunrise}</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '5px', whiteSpace: 'nowrap' }}>
            <span>일몰</span>
            <span>{sunset}</span>
          </div>
        </div>
      </div>

      {/* 하단: 5일 예보 */}
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        gap: '30px',
        padding: '20px 40px',
        marginBottom: '20px',
        position: 'relative',
        zIndex: 1,
        flexWrap: 'wrap'
      }}>
        {dailyForecast.time.slice(0, 5).map((date, index) => (
          <div key={date} style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '10px',
            padding: '15px',
            borderRadius: '10px',
            backgroundColor: 'rgba(255, 255, 255, 0.05)',
            minWidth: '100px'
          }}>
            <div style={{ fontSize: '16px', color: '#aaa' }}>
              {formatDay(date)}
            </div>
            <div style={{ fontSize: '40px' }}>
              {getWeatherIcon(dailyForecast.weather_code[index])}
            </div>
            <div style={{ fontSize: '18px', fontWeight: 'bold' }}>
              {Math.round(dailyForecast.temperature_2m_max[index])}°
            </div>
            <div style={{ fontSize: '16px', color: '#aaa' }}>
              {Math.round(dailyForecast.temperature_2m_min[index])}°
            </div>
          </div>
        ))}
      </div>

      {/* 하단: 지역/구 선택 (가로로 나란히) */}
      <div className="weather-selectors" style={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        gap: '20px',
        padding: '20px 40px',
        position: 'relative',
        zIndex: 1,
        flexWrap: 'wrap'
      }}>
        <select
          id="city-select"
          value={selectedCity}
          onChange={handleCityChange}
          style={{
            padding: '12px 16px',
            fontSize: '16px',
            borderRadius: '8px',
            border: '1px solid rgba(255, 255, 255, 0.3)',
            backgroundColor: 'rgba(255, 255, 255, 0.1)',
            color: '#fff',
            cursor: 'pointer',
            minWidth: '150px',
            outline: 'none'
          }}
        >
          {CITIES.map(city => (
            <option key={city} value={city} style={{ backgroundColor: '#333', color: '#fff' }}>
              {city}
            </option>
          ))}
        </select>
        <select
          id="district-select"
          value={selectedDistrict.name}
          onChange={handleDistrictChange}
          style={{
            padding: '12px 16px',
            fontSize: '16px',
            borderRadius: '8px',
            border: '1px solid rgba(255, 255, 255, 0.3)',
            backgroundColor: 'rgba(255, 255, 255, 0.1)',
            color: '#fff',
            cursor: 'pointer',
            minWidth: '150px',
            outline: 'none'
          }}
        >
          {CITY_DISTRICTS[selectedCity].map(district => (
            <option key={district.name} value={district.name} style={{ backgroundColor: '#333', color: '#fff' }}>
              {district.name}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
