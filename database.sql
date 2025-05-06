-- 1. Customers
CREATE TABLE Customer (
  customer_id     SERIAL PRIMARY KEY,
  first_name      VARCHAR(50) NOT NULL,
  last_name       VARCHAR(50) NOT NULL,
  email           VARCHAR(100) UNIQUE NOT NULL,
  phone           VARCHAR(20),
  date_of_birth   DATE,
  created_at      TIMESTAMP DEFAULT NOW()
);

-- 2. Memberships
CREATE TABLE Membership (
  membership_id   SERIAL PRIMARY KEY,
  customer_id     INT NOT NULL REFERENCES Customer(customer_id),
  membership_type VARCHAR(30) NOT NULL,  -- e.g. 'Gold', 'Platinum'
  start_date      DATE NOT NULL,
  end_date        DATE,
  status          VARCHAR(20) NOT NULL    -- e.g. 'active', 'expired'
);

-- 3. Lounges
CREATE TABLE Lounge (
  lounge_id       SERIAL PRIMARY KEY,
  name            VARCHAR(100) NOT NULL,
  location        VARCHAR(200) NOT NULL,     -- e.g. 'JFK Terminal 4'
  capacity        INT NOT NULL,
  opening_hours   VARCHAR(50),               -- e.g. '06:00–22:00'
  created_at      TIMESTAMP DEFAULT NOW()
);

-- 4. Amenities (lookup)
CREATE TABLE Amenity (
  amenity_id      SERIAL PRIMARY KEY,
  name            VARCHAR(50) UNIQUE NOT NULL  -- e.g. 'Wi-Fi', 'Buffet'
);

-- Junction table: Lounge ↔ Amenity
CREATE TABLE Lounge_Amenity (
  lounge_id   INT REFERENCES Lounge(lounge_id)  ON DELETE CASCADE,
  amenity_id  INT REFERENCES Amenity(amenity_id) ON DELETE CASCADE,
  PRIMARY KEY (lounge_id, amenity_id)
);

-- 5. Booking
CREATE TABLE Booking (
  booking_id      SERIAL PRIMARY KEY,
  customer_id     INT NOT NULL REFERENCES Customer(customer_id),
  lounge_id       INT NOT NULL REFERENCES Lounge(lounge_id),
  booking_type    VARCHAR(20) NOT NULL,    -- 'pay_per_use' or 'membership'
  booking_date    DATE NOT NULL,
  start_time      TIMESTAMP NOT NULL,
  end_time        TIMESTAMP NOT NULL,
  status          VARCHAR(20) NOT NULL      -- 'booked', 'completed', 'cancelled'
);

-- 6. Payment (for pay-per-use)
CREATE TABLE Payment (
  payment_id      SERIAL PRIMARY KEY,
  booking_id      INT NOT NULL UNIQUE REFERENCES Booking(booking_id),
  amount          DECIMAL(8,2) NOT NULL,
  currency        CHAR(3)      NOT NULL,    -- e.g. 'USD', 'AUD'
  method          VARCHAR(30),              -- e.g. 'credit_card'
  paid_at         TIMESTAMP DEFAULT NOW()
);

-- 7. Cancellation
CREATE TABLE Cancellation (
  cancellation_id SERIAL PRIMARY KEY,
  booking_id      INT NOT NULL UNIQUE REFERENCES Booking(booking_id),
  cancelled_at    TIMESTAMP DEFAULT NOW(),
  reason          TEXT
);

-- 8. Occupancy snapshots
CREATE TABLE Occupancy (
  occupancy_id    SERIAL PRIMARY KEY,
  lounge_id       INT NOT NULL REFERENCES Lounge(lounge_id),
  record_time     TIMESTAMP NOT NULL DEFAULT NOW(),
  occupied_seats  INT NOT NULL
);
