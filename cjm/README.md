# Customer Journey Mapper

A full-stack application for mapping and managing customer journeys, built with .NET 6 and React.

## Prerequisites

- [.NET 6 SDK](https://dotnet.microsoft.com/download)
- [Node.js](https://nodejs.org/) (v14 or later)
- [SQL Server](https://www.microsoft.com/en-us/sql-server/sql-server-downloads)

## Project Structure

```
CustomerJourneyMapper/
├── CustomerJourneyMapper.API/    # Backend (.NET 6)
│   ├── Controllers/             # API Controllers
│   ├── Models/                  # Domain Models
│   ├── Data/                    # Database Context and Migrations
│   └── Program.cs              # Application Entry Point
├── client/                      # Frontend (React)
│   ├── src/
│   │   ├── components/         # Reusable Components
│   │   ├── pages/             # Page Components
│   │   └── services/          # API Services
└── CustomerJourneyMapper.sln    # Solution File
```

## Getting Started

### Backend Setup

1. Navigate to the API project:
```bash
cd CustomerJourneyMapper.API
```

2. Restore dependencies:
```bash
dotnet restore
```

3. Update the database:
```bash
dotnet ef database update
```

4. Run the application:
```bash
dotnet run
```

The API will be available at https://localhost:5001

### Frontend Setup

1. Navigate to the client directory:
```bash
cd client
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

The application will be available at http://localhost:3000

## Features

- Create, read, update, and delete customer journeys
- Add stages to journeys
- Add touchpoints to stages
- Track pain points and opportunities
- Modern, responsive UI with Material-UI
- RESTful API with proper error handling
- SQL Server database with Entity Framework Core

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request 